export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { points } = req.body;
  if (!points || isNaN(points) || points <= 0) {
    return res.status(400).json({ error: "Invalid points value" });
  }

  // Conversion: 1:1000 (dibagi)
  const converted = Math.floor(points / 1000);

  // Vesting: 50% TGE, sisanya 24 bulan
  const total = converted;
  const tge = Math.floor(total * 0.5);
  const duration = 24;
  const monthly = Math.floor((total - tge) / duration);

  res.status(200).json({
    points,
    converted,
    vesting: {
      tge,
      monthly,
      duration,
    },
  });
}
