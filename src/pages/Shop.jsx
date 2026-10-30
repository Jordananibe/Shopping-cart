// src/pages/Shop.jsx
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="aspect-square bg-neutral-100 dark:bg-neutral-800" />
      <div className="space-y-3 border-t border-neutral-100 p-4 dark:border-neutral-800">
        <div className="h-3 w-1/3 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-2/3 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="flex items-center justify-between pt-3">
          <div className="h-5 w-16 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-8 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}

export default function Shop({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Something went wrong while fetching products.');
        setLoading(false);
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
          Shop all products
        </h1>
        {!loading && !error && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {products.length} items
          </p>
        )}
      </header>

      {error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
        >
          Error: {error}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  index={index}
                />
              ))}
        </div>
      )}
    </div>
  );
}
