import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  // 1. Check if dark mode was previously saved or use system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // 2. Every time 'isDark' changes, update the <html> class and localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="cursor-pointer p-2 rounded-lg bg-neutral2 text-text-gray border border-neutral transition-all active:scale-95"
    >
      {isDark ? (
        <span title="Switch to Light Mode">☀️ Light</span>
      ) : (
        <span title="Switch to Dark Mode">🌙 Dark</span>
      )}
    </button>
  );
}