// src/components/ThemeToggle.jsx
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // localStorage unavailable, fall through to system preference
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  function handleToggle() {
    const next = isDark ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // ignore: theme still changes for this session
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition-colors duration-200 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
    >
      <span className="relative h-[18px] w-[18px]">
        <Sun
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full transition duration-300 motion-reduce:transition-none ${
            isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
          }`}
        />
        <Moon
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full transition duration-300 motion-reduce:transition-none ${
            isDark ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
          }`}
        />
      </span>
    </button>
  );
}
