import { useState } from "react";

export default function Calculator() {
  const [points, setPoints] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCalc = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points: Number(points) }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      {/* Header with logo */}
      <div className="absolute top-6 left-6 flex items-center space-x-2">
        <img src="/logo-intuition.png" alt="Intuition Logo" className="h-10" />
        <span className="text-xl font-bold">Intuition</span>
      </div>

      {/* Calculator Card */}
      <div className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl shadow-2xl w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Trust Airdrop Calculator</h1>
        <p className="text-gray-400 mb-6">
          Masukkan jumlah poin kamu untuk konversi ke $TRUST token
        </p>

        <form onSubmit={handleCalc} className="space-y-4">
          <input
            type="number"
            placeholder="Contoh: 4000000"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold shadow-lg"
          >
            Hitung 🚀
          </button>
        </form>

        {error && <p className="text-red-400 mt-4">{error}</p>}

        {result && (
          <div className="mt-6 p-4 rounded-lg bg-gray-800 border border-gray-700 text-left">
            <p><b>Points:</b> {result.points.toLocaleString()}</p>
            <p><b>Converted Tokens:</b> {result.converted.toLocaleString()}</p>
            <p><b>TGE Unlock:</b> {result.vesting.tge.toLocaleString()}</p>
            <p><b>Monthly Unlock:</b> {result.vesting.monthly.toLocaleString()}</p>
            <p><b>Duration:</b> {result.vesting.duration} months</p>
          </div>
        )}
      </div>
    </div>
  );
}
