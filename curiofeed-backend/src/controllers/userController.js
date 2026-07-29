import { updatePreferencesSchema } from "../validators/userValidator.js";
import { updateUserPreferences,} from "../services/userService.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const updatePreferences = asyncHandler( async (req, res) => {

  const {topicIds} = req.validated.body;

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

}   
)
