import { asyncHandler } from "../middleware/asyncHandler.js";
import { getTopics } from "../services/topicService.js";

export const getAllTopics = asyncHandler( async (req, res) => {

      const topics =
        await getTopics();

      return res.json({
        success: true,
        data: topics,
      });
    }

);
  