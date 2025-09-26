import { useState } from "react";

export default function Calculator() {
  const [points, setPoints] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCalc = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points: parseInt(points) })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error occurred");
      } else {
        setResult(data);
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Trust Airdrop Calculator</h1>
      <form onSubmit={handleCalc} className="space-y-4">
        <input
          type="number"
          placeholder="Enter your points"
          className="border p-2 rounded w-full"
          value={points}
          onChange={e => setPoints(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Calculate
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <p><b>Points:</b> {result.points}</p>
          <p><b>Converted Tokens:</b> {result.converted}</p>
          <p><b>TGE Unlock:</b> {result.vesting.tge}</p>
          <p><b>Monthly Unlock:</b> {result.vesting.monthly}</p>
          <p><b>Duration:</b> {result.vesting.duration} months</p>
        </div>
      )}
    </div>
  );
}