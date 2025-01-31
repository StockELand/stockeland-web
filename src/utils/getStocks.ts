export async function getStocks() {
  const res = await fetch("http://localhost:3000/api/mock");
  if (!res.ok) throw new Error("Failed to fetch stock data");
  return res.json();
}
