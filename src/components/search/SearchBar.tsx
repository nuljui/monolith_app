
import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Search, Image as ImageIcon, Upload, X } from 'lucide-react';

export const SearchBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle clicks outside to collapse
    const handleBlur = (e: React.FocusEvent) => {
        // Simple timeout to allow clicks on children to register
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
            setIsExpanded(false);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
        if (!isExpanded) setIsExpanded(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.currentTarget.contains(e.relatedTarget as Node)) return;
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageFile(file);
        }
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleImageFile(file);
        }
    };

    const handleImageFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const clearImage = () => {
        setSelectedImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div
            ref={containerRef}
            className={`
                relative w-full transition-all duration-300 ease-out z-50
                ${isExpanded ? 'max-w-xl' : 'max-w-md'}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFocus={() => setIsExpanded(true)}
            onBlur={handleBlur}
            tabIndex={-1} // Allow div to capture focus for blur handling
        >
            {/* MAIN INPUT AREA */}
            <div className={`
                relative w-full bg-white rounded-lg border transition-all duration-300
                ${isExpanded ? 'shadow-xl border-accent/30 ring-4 ring-accent/5 rounded-b-none' : 'shadow-none border-ink/5'}
                ${isDragging ? 'border-accent border-dashed bg-accent/5' : ''}
                z-20
            `}>
                <div className="flex items-center px-4 py-3 gap-3">
                    <Search className={`w-5 h-5 ${isExpanded ? 'text-accent' : 'text-ink/30'}`} />

                    {/* Selected Image Preview (Thumbnail) */}
                    {selectedImage && (
                        <div className="relative group shrink-0">
                            <div className="w-8 h-8 rounded overflow-hidden border border-stone-200">
                                <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                            </div>
                            <button
                                onClick={clearImage}
                                className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-md border border-stone-100 hover:text-red-500"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    )}

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search artifacts..."
                        className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink/30 focus:outline-none"
                    />

                    {/* Quick Action: Image Icon */}
                    {!isExpanded && !selectedImage && (
                        <ImageIcon className="w-4 h-4 text-ink/20" />
                    )}
                </div>
            </div>

            {/* EXPANDED AREA: VISUAL SEARCH (ABSOLUTE DROPDOWN) */}
            <div className={`
                absolute top-full left-0 w-full bg-white border-x border-b border-accent/30 rounded-b-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out z-10
                ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 border-none'}
            `}>
                <div className="p-4 pt-2 mt-0 mx-4 border-t border-dashed border-ink/10">
                    <div className="flex flex-col items-center justify-center text-center gap-2">

                        {isDragging ? (
                            <div className="text-accent font-medium animate-pulse">
                                Drop image to search
                            </div>
                        ) : (
                            <>
                                <p className="text-xs text-faded">
                                    Drag & drop an image or
                                </p>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 px-4 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-full text-xs font-medium text-ink transition-colors"
                                >
                                    <Upload className="w-3 h-3" />
                                    Select Image
                                </button>
                            </>
                        )}

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                </div>
            </div>

            {/* Drag Overlay Helper (Covers entire component when dragging) */}
            {isDragging && (
                <div className="absolute inset-0 z-30 bg-accent/5 backdrop-blur-[1px] flex items-center justify-center pointer-events-none rounded-lg border-2 border-accent border-dashed animate-pulse" />
            )}

            {/* Backdrop for click-outside */}
            {isExpanded && (
                <div
                    className="fixed inset-0 z-[-1]"
                    onClick={() => setIsExpanded(false)}
                />
            )}
        </div>
    );
};
