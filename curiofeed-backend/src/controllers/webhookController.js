import { Webhook } from "svix";
import {
  syncUser,
  deleteUser,
} from "../services/userSyncService.js";

export const clerkWebhookHandler =
  async (req, res) => {
    try {
      const webhookSecret =
        process.env.CLERK_WEBHOOK_SECRET;

      if (!webhookSecret) {
        throw new Error(
          "Missing Clerk webhook secret"
        );
      }

      const headers = req.headers;

      const svixId = headers["svix-id"];
      const svixTimestamp =
        headers["svix-timestamp"];
      const svixSignature =
        headers["svix-signature"];

      if (
        !svixId ||
        !svixTimestamp ||
        !svixSignature
      ) {
        return res.status(400).json({
          message:
            "Missing webhook headers",
        });
      }

      const wh = new Webhook(
        webhookSecret
      );

      const payload = req.body.toString();

      const evt = wh.verify(
        payload,
        {
          "svix-id": svixId,
          "svix-timestamp":
            svixTimestamp,
          "svix-signature":
            svixSignature,
        }
      );

      const eventType = evt.type;
      const userData = evt.data;

      switch (eventType) {
        case "user.created":
          await syncUser(userData);
          break;

        case "user.updated":
          await syncUser(userData);
          break;

        case "user.deleted":
          await deleteUser(
            userData.id
          );
          break;

        default:
          console.log(
            `Unhandled event: ${eventType}`
          );
      }

      return res.status(200).json({
        success: true,
      });

    } catch (error) {
      console.error(
        "Webhook Error:",
        error
      );

      return res.status(400).json({
        success: false,
        message:
          "Webhook verification failed",
      });
    }
  };