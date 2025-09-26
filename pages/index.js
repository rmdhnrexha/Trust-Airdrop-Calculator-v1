import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">Welcome to Portal Intuition</h1>
      <p className="mt-4">Calculate your $TRUST airdrop allocation.</p>
      <Link href="/calculator">
        <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded">
          Go to Calculator
        </button>
      </Link>
    </div>
  );
}