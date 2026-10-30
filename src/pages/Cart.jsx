// src/pages/Cart.jsx
import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

const pageClass = 'mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12';
const headingClass =
  'text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white';
const stepButtonClass =
  'flex h-8 w-8 items-center justify-center text-neutral-600 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white';

export default function Cart({
  cartItems,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  // Handle empty cart state
  if (cartItems.length === 0) {
    return (
      <div className={pageClass}>
        <h1 className={headingClass}>Your shopping cart</h1>

        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-neutral-300 px-6 py-20 text-center dark:border-neutral-700">
          <ShoppingBag
            size={32}
            className="text-neutral-400 dark:text-neutral-500"
            aria-hidden="true"
          />
          <p className="mt-4 text-lg font-medium text-neutral-900 dark:text-white">
            Your cart is empty
          </p>
          <p className="mt-1 max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
            Add something from the shop and it will show up here.
          </p>
          <Link
            to="/shop"
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  // Calculate total price across all items
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className={pageClass}>
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <h1 className={headingClass}>Your shopping cart</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
        <ul className="divide-y divide-neutral-200 overflow-hidden rounded-2xl border border-neutral-200 bg-white lg:col-span-2 dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
          {cartItems.map((item, index) => {
            const itemSubtotal = item.price * item.quantity;

            return (
              <li
                key={item.id}
                style={{ animationDelay: `${Math.min(index, 7) * 60}ms` }}
                className="animate-slide-up flex gap-4 p-4 sm:gap-6 sm:p-6"
              >
                <div className="h-20 w-20 shrink-0 rounded-xl bg-white p-2 ring-1 ring-neutral-200 sm:h-24 sm:w-24 dark:ring-neutral-700">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="line-clamp-2 text-sm font-medium leading-5 text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    ${item.price.toFixed(2)} each
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-3">
                    {/* Quantity Controls */}
                    <div className="inline-flex items-center overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                      <button
                        type="button"
                        onClick={() => onDecrease(item.id)}
                        aria-label={`Decrease quantity of ${item.title}`}
                        className={stepButtonClass}
                      >
                        <Minus size={14} aria-hidden="true" />
                      </button>

                      <span
                        aria-live="polite"
                        className="w-8 text-center text-sm tabular-nums text-neutral-900 dark:text-white"
                      >
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => onIncrease(item.id)}
                        aria-label={`Increase quantity of ${item.title}`}
                        className={stepButtonClass}
                      >
                        <Plus size={14} aria-hidden="true" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors duration-200 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-neutral-400 dark:hover:text-red-400"
                    >
                      <Trash2 size={14} aria-hidden="true" />
                      Remove
                    </button>
                  </div>
                </div>

                <p className="shrink-0 text-sm font-semibold tabular-nums text-neutral-900 sm:text-base dark:text-white">
                  ${itemSubtotal.toFixed(2)}
                </p>
              </li>
            );
          })}
        </ul>

        <aside className="rounded-2xl border border-neutral-200 bg-white p-6 lg:sticky lg:top-24 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Order summary
          </h2>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
              <dt>Items</dt>
              <dd className="tabular-nums">{itemCount}</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <dt className="font-medium text-neutral-900 dark:text-white">Total</dt>
              <dd className="text-2xl font-semibold tabular-nums text-neutral-900 dark:text-white">
                ${totalPrice.toFixed(2)}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition duration-200 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-[0.99]"
          >
            Proceed to checkout
          </button>

          <Link
            to="/shop"
            className="mt-4 block text-center text-sm text-neutral-500 transition-colors duration-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
