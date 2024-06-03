import express from "express";
import { CommunityModel } from "../models/Community";

const leadershipRouter = express.Router();

/**
 * @route GET /leadership
 */
leadershipRouter.get("/", async (req, res) => {
  try {
    const leaderships = await CommunityModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "community",
          as: "members",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$members", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          name: 1,
          logo: 1,
          totalExperiencePoints: { $sum: "$experiencePoints.points" },
          numOfUsers: { $size: "$members" },
        },
      },
      { $sort: { totalExperiencePoints: -1 } },
    ]);

    res.send(leaderships);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

export { leadershipRouter };
