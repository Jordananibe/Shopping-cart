// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.svg";

const navLinkClass =
  "rounded-md px-2 py-2 text-sm font-medium text-neutral-600 transition-colors duration-200 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-3 dark:text-neutral-400 dark:hover:text-white";

export default function Navbar({ cartCount }) {
  return (
    <nav className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="veyra logo"
            className="h-10 w-auto object-contain sm:h-12"
          />
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          <li>
            <Link to="/" className={navLinkClass}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/shop" className={navLinkClass}>
              Shop
            </Link>
          </li>

          <li>
            <Link
              to="/cart"
              aria-label={`Cart, ${cartCount} items`}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium text-neutral-700 transition-colors duration-200 hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:gap-2 sm:px-3 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              <ShoppingBag size={18} strokeWidth={1.8} aria-hidden="true" />
              <span className="hidden sm:inline">Cart</span>
              <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 py-0.5 text-xs font-semibold text-white">
                {cartCount}
              </span>
            </Link>
          </li>

          <li className="ml-1 sm:ml-2">
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
