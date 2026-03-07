import type { FilterBarProps } from './types';

export function FilterBar({ categories, activeCategory, onSelect, photoCount }: FilterBarProps) {
    return (
        <div className="flex flex-col items-center gap-5 gallery-fade-in-up" style={{ animationDelay: '0.8s' }}>
            {/* F1-style tab strip */}
            <div className="flex items-stretch border border-gray-200 dark:border-white/15 overflow-hidden">
                {categories.map((cat, i) => {
                    const active = activeCategory === cat.value;
                    return (
                        <button
                            key={cat.value}
                            onClick={() => onSelect(cat.value)}
                            className={`gallery-filter-btn-f1 ${active ? 'active' : ''
                                } ${i !== 0 ? 'border-l border-gray-200 dark:border-white/15' : ''}`}
                        >
                            {active && (
                                <span className="block w-full h-[2px] bg-[#e10600] absolute top-0 left-0" />
                            )}
                            <span className="relative">{cat.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* F1 counter */}
            <div className="flex items-center gap-3">
                <div className="w-4 h-px bg-[#e10600]" />
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400 dark:text-white/40">
                    <span className="text-gray-900 dark:text-white font-black text-sm">
                        {String(photoCount).padStart(2, '0')}
                    </span>
                    <span className="mx-1 text-gray-300 dark:text-white/20">/</span>
                    <span>Frames</span>
                </p>
                <div className="w-4 h-px bg-[#e10600]" />
            </div>
        </div>
    );
}
