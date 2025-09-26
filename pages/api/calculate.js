import { CONFIG } from "../../config";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { points } = req.body;
  if (!points || points <= 0) {
    return res.status(400).json({ error: "Invalid points" });
  }

  const tokens = points / CONFIG.conversionRate;
  const tgeAmount = tokens * CONFIG.vesting.tge;
  const monthlyUnlock = (tokens - tgeAmount) / CONFIG.vesting.months;

  res.status(200).json({
    points,
    converted: tokens,
    vesting: {
      tge: tgeAmount,
      monthly: monthlyUnlock,
      duration: CONFIG.vesting.months
    }
  });
}