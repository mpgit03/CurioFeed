import { updatePreferencesSchema } from "../validators/userValidator.js";

import { updateUserPreferences,} from "../services/userService.js";

export const updatePreferences =
async (req, res) => {
   console.log("CONTROLLER ENTERED");
try {


  const validatedData =
    updatePreferencesSchema
      .parse(req.body);

  const clerkId = req.userId;

  await updateUserPreferences(
    clerkId,
    validatedData.topicIds
  );

  return res.status(200)
    .json({
      success: true,
      message:
        "Preferences updated successfully",
    });

} catch (error) {

  return res.status(400)
    .json({
      success: false,
      message:
        error.message,
    });
}
}   
