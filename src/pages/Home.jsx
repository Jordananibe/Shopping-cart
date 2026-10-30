
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const featuredProducts = products.slice(0, 4);
  const currentProduct = featuredProducts[activeIndex];

  // Fetch products from FakeStore API
  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const response = await fetch(
          'https://fakestoreapi.com/products',
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Could not load featured products.');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err.name === 'AbortError') return;

        setError(err.message || 'Something went wrong.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  // Automatically rotate slides
  useEffect(() => {
    if (isPaused || featuredProducts.length < 2) return;

    const intervalId = setInterval(() => {
      setActiveIndex((currentIndex) =>
        (currentIndex + 1) % featuredProducts.length
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isPaused, featuredProducts.length]);

  // Manual navigation
  function showNextSlide() {
    setIsPaused(true);
    setActiveIndex((currentIndex) =>
      (currentIndex + 1) % featuredProducts.length
    );
  }

  function showPreviousSlide() {
    setIsPaused(true);
    setActiveIndex((currentIndex) =>
      (currentIndex - 1 + featuredProducts.length) %
      featuredProducts.length
    );
  }

  function showSlide(index) {
    setIsPaused(true);
    setActiveIndex(index);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
      <section className="grid items-center gap-10 md:grid-cols-2 md:gap-14">

        {/* Hero text */}
        <div className="animate-slide-up max-w-xl">
          <p className="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-400">
            <span
              className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"
              aria-hidden="true"
            />
            New arrivals
          </p>

         <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl dark:text-white">
            Everyday essentials,
            <span className="block text-blue-600 dark:text-blue-400">
              chosen well.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-neutral-600 sm:text-lg dark:text-neutral-400">
            Browse the collection and discover products worth adding to your everyday life.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Shop now
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Product slideshow */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
          className="animate-slide-up"
          style={{ animationDelay: '120ms' }}
        >
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">

            {/* Loading state */}
            {loading && (
              <div className="flex aspect-[4/3] items-center justify-center text-sm text-neutral-500">
                Loading featured products...
              </div>
            )}

            {/* Error state */}
            {!loading && error && (
              <div className="flex aspect-[4/3] items-center justify-center p-6 text-center text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && featuredProducts.length === 0 && (
              <div className="flex aspect-[4/3] items-center justify-center text-sm text-neutral-500">
                No featured products available.
              </div>
            )}

            {/* Current product */}
            {!loading && !error && currentProduct && (
              <>
                <div className="relative flex aspect-[4/3] items-center justify-center bg-white p-8 dark:bg-neutral-950 sm:p-12">
                  <img
                    key={currentProduct.id}
                    src={currentProduct.image}
                    alt={currentProduct.title}
                    className="h-full w-full object-contain"
                  />

                  {/* Previous button */}
                  <button
                    type="button"
                    onClick={showPreviousSlide}
                    aria-label="Previous product"
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-800 shadow-sm transition hover:bg-white dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-white dark:hover:bg-neutral-800"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Next button */}
                  <button
                    type="button"
                    onClick={showNextSlide}
                    aria-label="Next product"
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-800 shadow-sm transition hover:bg-white dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-white dark:hover:bg-neutral-800"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Product information */}
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <div className="min-w-0">
                    <p className="text-xs font-medium capitalize text-blue-600 dark:text-blue-400">
                      {currentProduct.category}
                    </p>

                    <h2 className="mt-1 line-clamp-1 text-sm font-semibold text-neutral-900 dark:text-white">
                      {currentProduct.title}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      ${currentProduct.price.toFixed(2)}
                    </p>
                  </div>

                  <Link
                    to="/shop"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                  >
                    Explore
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Slide indicators */}
          {!loading && !error && featuredProducts.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {featuredProducts.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => showSlide(index)}
                  aria-label={`Show product ${index + 1}`}
                  aria-current={activeIndex === index ? 'true' : undefined}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? 'w-7 bg-blue-600 dark:bg-blue-400'
                      : 'w-2 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-500'
                  }`}
                />
              ))}
            </div>
          )}

          <p className="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-500">
            {!loading && featuredProducts.length > 0
              ? `${activeIndex + 1} / ${featuredProducts.length} featured products`
              : ''}
          </p>
        </div>
      </section>
    </div>
  );
}
