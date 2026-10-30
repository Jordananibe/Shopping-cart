// src/components/ProductCard.jsx
import { Star } from "lucide-react";

export default function ProductCard({ product, onAddToCart, index = 0 }) {
  return (
    <article
      style={{ animationDelay: `${Math.min(index, 7) * 60}ms` }}
      className="animate-slide-up group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition duration-300 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-900/5 motion-safe:hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:shadow-black/40"
    >
      <div className="aspect-square shrink-0 bg-neutral-50 p-4 sm:p-5 dark:bg-neutral-950">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col border-t border-neutral-100 p-3 sm:p-4 dark:border-neutral-800">
        <p className="text-xs capitalize text-neutral-500 dark:text-neutral-400">
          {product.category}
        </p>

        <h2 className="mt-1 line-clamp-2 min-h-10 text-sm font-medium leading-5 text-neutral-900 dark:text-neutral-100">
          {product.title}
        </h2>

        <p className="mt-2 flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
          <Star
            size={12}
            className="fill-amber-400 text-amber-400"
            aria-hidden="true"
          />
          {product.rating?.rate}
          <span className="text-neutral-400 dark:text-neutral-500">
            ({product.rating?.count})
          </span>
        </p>

        <div className="mt-auto flex flex-col items-stretch gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base font-semibold tabular-nums text-neutral-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-[0.98] sm:w-auto sm:text-xs"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
