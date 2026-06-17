import { getTopics } from "../services/topicService.js";

export const getAllTopics =
  async (req, res) => {
    try {

      const topics =
        await getTopics();

      return res.json({
        success: true,
        data: topics,
      });

    } catch (error) {

      return res.status(500)
        .json({
          success: false,
          message:
            error.message,
        });
    }
  };