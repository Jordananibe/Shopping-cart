import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import logo from '../assets/logo.svg';

const footerLinkClass =
  'text-sm text-neutral-500 transition-colors hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/70">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
          {/* Store identity */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-neutral-900 dark:text-white"
            >
              <img
                src={logo}
                alt="veyra logo"
                className="h-10 w-auto object-contain sm:h-12"
              />
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500 dark:text-neutral-400">
              Discover products for everyday living, all in one place.
            </p>
          </div>

          {/* Navigation */}
          <div className="sm:justify-self-end">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Explore
            </h2>

            <nav aria-label="Footer navigation" className="mt-4 flex flex-col items-start gap-3">
              <Link to="/" className={footerLinkClass}>
                Home
              </Link>

              <Link to="/shop" className={footerLinkClass}>
                Shop all products
              </Link>

              <Link to="/cart" className={footerLinkClass}>
                Your cart
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} ShoppingApp. All rights reserved.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-xs font-medium text-neutral-600 transition-colors hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400"
          >
            Browse products
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}