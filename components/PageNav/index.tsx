interface PageNavProps {
  onProjectsClick: () => void;
}

export function PageNav({ onProjectsClick }: PageNavProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed left-4 top-4 z-40 flex items-center gap-2 sm:left-8 sm:top-7 sm:gap-3"
    >
      <button
        className="rounded-full border border-white/8 bg-white/[0.075] px-4 py-2 text-sm font-medium text-white outline-none backdrop-blur-[18px] transition-colors duration-300 ease-expo-out hover:border-white/20 hover:bg-white/12 focus-visible:border-white/45 sm:px-5"
        onClick={onProjectsClick}
        type="button"
      >
        Projects
      </button>
      <button
        aria-disabled="true"
        className="cursor-default rounded-full border border-white/8 bg-white/[0.075] px-4 py-2 text-sm font-medium text-white/85 outline-none backdrop-blur-[18px] sm:px-5"
        type="button"
      >
        Information
      </button>
    </nav>
  );
}
