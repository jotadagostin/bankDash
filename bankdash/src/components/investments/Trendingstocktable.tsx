import { trendingStocks } from "@/data/mock-data";

export function TrendingStockTable() {
  return (
    <div>
      <h2 className="text-[22px] font-semibold text-heading mb-4">
        Trending Stock
      </h2>

      <div className="bg-surface rounded-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-105">
            <thead>
              <tr className="text-left text-xs text-text-secondary">
                <th className="font-medium px-6 py-4">SL NO</th>
                <th className="font-medium px-6 py-4">Name</th>
                <th className="font-medium px-6 py-4">Price</th>
                <th className="font-medium px-6 py-4">Return</th>
              </tr>
            </thead>
            <tbody>
              {trendingStocks.map((stock) => {
                const isPositive = stock.returnPercent >= 0;

                return (
                  <tr
                    key={stock.id}
                    className="border-t border-black/5 text-sm"
                  >
                    <td className="px-6 py-4 text-text-secondary">
                      {stock.slNo}
                    </td>
                    <td className="px-4 py-4 font-medium text-text-primary">
                      {stock.name}
                    </td>
                    <td className="px-4 py-4 text-text-secondary">
                      {stock.price}
                    </td>
                    <td
                      className={`px-4 py-4 font-semibold ${
                        isPositive ? "text-deposit" : "text-withdraw"
                      }`}
                    >
                      {" "}
                      {isPositive ? "+" : ""}
                      {stock.returnPercent}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
