import { loanRecords } from "@/data/mock-data";

function formatMoney(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

export function ActiveLoansTable() {
  const totalLoanMoney = loanRecords.reduce((sum, l) => sum + l.loanMoney, 0);
  const totalLeftToRepay = loanRecords.reduce(
    (sum, l) => sum + l.leftToRepay,
    0,
  );
  return (
    <div>
      <h2 className="text-[22px] font-semibold text-heading mb-4">
        Active Loans Overview
      </h2>

      <div className="bg-surface rounded-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="w-full min-w-180">
              <tr className="text-left text-xs text-text-secondary">
                <th className="font-medium px-6 py-4">SL No</th>
                <th className="font-medium px-4 py-4">Loan Money</th>
                <th className="font-medium px-4 py-4">Left to repay</th>
                <th className="font-medium px-4 py-4">Duration</th>
                <th className="font-medium px-4 py-4">Interest rate</th>
                <th className="font-medium px-4 py-4">Installment</th>
                <th className="font-medium px-4 py-4">Repay</th>
              </tr>
            </thead>
            <tbody>
              {loanRecords.map((loan, index) => (
                <tr key={loan.id} className="border-t border-black/5 text-sm">
                  <td className="px-6 py-4 text-text-secondary">{loan.slNo}</td>
                  <td className="px-4 py-4 font-medium text-text-primary">
                    {formatMoney(loan.loanMoney)}
                  </td>
                  <td className="px-4 py-4 text-text-secondary">
                    {formatMoney(loan.leftToRepay)}
                  </td>
                  <td className="px-4 py-4 text-text-secondary">
                    {loan.duration}
                  </td>
                  <td className="px-4 py-4 text-text-secondary">
                    {loan.interestRate}
                  </td>
                  <td className="px-4 py-4 text-text-secondary">
                    {loan.installment}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      className={`text-xs font-medium border cursor-pointer rounded-full px-4 py-1.5 transition-colors ${
                        index === 0
                          ? "text-primary border-primary hover:bg-primary-light"
                          : "text-text-secondary border-text-muted/40 hover:bg-primary-light hover:text-primary hover:border-primary"
                      }`}
                    >
                      Repay
                    </button>
                  </td>
                </tr>
              ))}

              {/* total line */}

              <tr className="border-t border-black/5 text-sm font-semibold text-withdraw">
                <td className="px-6 py-4">Total</td>
                <td className="px-4 py-4">{formatMoney(totalLoanMoney)}</td>
                <td className="px-4 py-4">{formatMoney(totalLeftToRepay)}</td>
                <td className="px-4 py-4" />
                <td className="px-4 py-4" />
                <td className="px-4 py-4">$50,000 / month</td>
                <td className="px-4 py-4" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
