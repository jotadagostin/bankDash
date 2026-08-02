export function AddCardForm() {
  return (
    <div>
      <h2 className="text-[22px] font-semibold text-heading mb-4">
        Add New Card
      </h2>

      <div className="bg-surface rounded-card p-6 shadow-card">
        <p className="text-sm text-text-secondary leading-relaxed mb-6">
          Credit Card generally means a plastic card issued by Scheduled
          Commercial Banks assigned to a Cardholder, with a credit limit, that
          can be used to purchase goods and services on credit or obtain cash
          advances.
        </p>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs text-text-secondary mb-1.5 block">
              Card Type
            </label>
            <input
              type="text"
              placeholder="Classic"
              className="w-full px-4 py-2.5 rounded-input bg-background text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="text-xs text-text-secondary mb-1.5 block">
              Name on Card
            </label>
            <input
              type="text"
              placeholder="My Cards"
              className="w-full px-4 py-2.5 rounded-input bg-background text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="text-xs text-text-secondary mb-1.5 block">
              Card Number
            </label>
            <input
              type="text"
              placeholder="**** **** **** ****"
              className="w-full px-4 py-2.5 rounded-input bg-background text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="text-xs text-text-secondary mb-1.5 block">
              Expiration Date
            </label>
            <input
              type="text"
              placeholder="25 January 2025"
              className="w-full px-4 py-2.5 rounded-input bg-background text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </form>

        <button
          type="button"
          className="bg-primary text-white text-sm font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Add Card
        </button>
      </div>
    </div>
  );
}
