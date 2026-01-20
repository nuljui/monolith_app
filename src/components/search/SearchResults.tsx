import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Page } from '../../types';
import { ArrowRight, Plus } from 'lucide-react';

export interface SearchResultData {
    exactMatch?: {
        id: string; // SHA256
        name: string;
    };
    similar: {
        id: string; // pHash
        similarity: number; // 0-100
    }[];
}

interface SearchResultsProps {
    isOpen: boolean;
    onClose: () => void;
    results: SearchResultData;
    onNavigate: (page: Page) => void;
}

export const SearchResults = ({ isOpen, onClose, results, onNavigate }: SearchResultsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 top-0 left-0 z-[9999] flex items-center justify-center p-4">
            {/* BLUR BACKDROP */}
            <div className="absolute inset-0 bg-stone-50/80 backdrop-blur-md transition-all duration-500" />

            {/* CONTENT CONTAINER */}
            <div
                ref={containerRef}
                className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-300"
            >

                {/* 1. TOP SECTION: Exact Match or Create */}
                <div className="p-8 border-b border-stone-100 flex flex-col items-center justify-center min-h-[200px] text-center gap-6">
                    {results.exactMatch ? (
                        <>
                            <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-4 duration-500">
                                <span className="text-sm font-semibold text-accent uppercase tracking-widest">Exact Match Found</span>
                                <h2 className="text-3xl font-serif text-ink">{results.exactMatch.name}</h2>
                            </div>

                            <button
                                onClick={() => onNavigate('artifact')}
                                className="group flex items-center gap-2 px-4 py-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-md transition-all"
                            >
                                <span className="font-mono text-xs text-faded group-hover:text-ink truncate max-w-[200px]">
                                    {results.exactMatch.id}
                                </span>
                                <ArrowRight className="w-3 h-3 text-accent group-hover:translate-x-1 transition-transform" />
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-4 duration-500">
                                <span className="text-sm font-medium text-ink/40 uppercase tracking-widest">No Exact Match Found</span>
                            </div>

                            <button
                                onClick={() => onNavigate('create')}
                                className="flex items-center gap-3 px-6 py-3 bg-ink text-white rounded-lg hover:bg-ink/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                <Plus className="w-4 h-4" />
                                <span className="font-medium">Create your Artifact</span>
                            </button>
                        </>
                    )}
                </div>

                {/* 2. BOTTOM SECTION: Similar Results */}
                <div className="bg-stone-50/50 p-8">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-sm font-medium text-ink/60">
                            {results.similar.length} Similar artifacts found
                        </span>
                    </div>

                    <div className="space-y-3">
                        {results.similar.slice(0, 3).map((item, index) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-4 bg-white border border-stone-100 rounded-lg hover:border-accent/30 hover:shadow-md transition-all cursor-pointer group"
                                onClick={() => onNavigate('artifact')} // Assuming navigates to generic artifact for now
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-stone-100 rounded flex items-center justify-center text-[10px] font-mono text-ink/30 group-hover:text-accent group-hover:bg-accent/5 transition-colors">
                                        IMG
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-mono text-ink/70 group-hover:text-ink transition-colors">Visual ID: {item.id.substring(0, 8)}...</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="h-1.5 w-24 bg-stone-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-accent transition-all duration-1000"
                                            style={{ width: `${item.similarity}%` }}
                                        />
                                    </div>
                                    <span className="text-sm font-bold text-ink">{item.similarity}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>,
        document.body
    );
};
