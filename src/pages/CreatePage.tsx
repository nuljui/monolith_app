import { useState } from 'react';
import { Plus, ChevronRight, ChevronDown } from 'lucide-react';
import { Page, ArtifactState } from '../types';
import { TopBar } from '../components/layout/TopBar';

interface CreatePageProps {
    onNavigate: (page: Page) => void;
}

const CreatePage = ({ onNavigate }: CreatePageProps) => {
    // State Machine:
    // 1. Empty -> "Create your Monolith."
    // 2. Presence -> "Your Work" + "Your Mark" visible (Translucent)
    // 3. Existence -> "Artifact" (Solid, Real)

    const [artifact, setArtifact] = useState<ArtifactState | null>(null);
    const [isCreated, setIsCreated] = useState(false);
    const [isHovering, setIsHovering] = useState(false); // Used for empty state hover
    const [isDetailsOpen, setIsDetailsOpen] = useState(false); // New state for mark details
    const [isImageVisible, setIsImageVisible] = useState(false); // Smooth entry for image
    const [isCreating, setIsCreating] = useState(false); // Transition state for creation animation

    // --- Actions ---
    const handleFiles = (file: File) => {
        setArtifact({
            file,
            name: file.name,
            preview: URL.createObjectURL(file)
        });
        setIsImageVisible(false); // Reset visibility for animation
        setIsCreated(false);
    };

    const handleCreate = () => {
        // "Create" action - Sequence:
        // 1. Trigger transition state (fades out controls, moves box up)
        setIsCreating(true);

        // 2. Wait for animation to near completion before switching logic state
        setTimeout(() => {
            setIsCreated(true);
            setIsCreating(false);
        }, 100);
    };

    const reset = () => {
        setArtifact(null);
        setIsCreated(false);
        setIsImageVisible(false);
        setIsCreating(false);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-stone-50 text-ink font-sans pt-24">

            <TopBar onNavigate={onNavigate} />

            {/* HEADLINE */}
            {!artifact && (
                <div className="text-center mb-16 animate-in fade-in duration-700">
                    <h1 className="text-4xl font-semibold tracking-tight text-ink mb-2">
                        Create your Monolith.
                    </h1>
                    <p className="text-faded text-lg">
                        Build your permanent body of work.
                    </p>
                </div>
            )}

            {/* MAIN INTERACTION AREA */}
            <div className="relative w-full max-w-lg perspective-[1000px]">

                {artifact ? (
                    <div className="flex flex-col items-center gap-6">

                        {/* THE WORK / ARTIFACT CONTAINER */}
                        <div className="relative w-full aspect-[4/5] flex items-center justify-center">

                            {/* The Artifact Image/Card */}
                            <div
                                className={`
                                    relative w-full h-full bg-white rounded-[2px] overflow-hidden
                                    transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
                                    flex items-center justify-center
                                    ${isCreated || isCreating
                                        ? 'shadow-artifact opacity-100 scale-100 border border-accent translate-y-0' // EXISTENCE (Real)
                                        : 'shadow-none opacity-80 scale-[0.98] grayscale-[0.2] translate-y-6' // PRESENCE (Not fully there)
                                    }
                                `}
                            >
                                {artifact.preview && artifact.file.type.startsWith('image') ? (
                                    <img
                                        src={artifact.preview}
                                        alt="Your Work"
                                        onLoad={() => setIsImageVisible(true)}
                                        className={`
                                            w-full h-full object-cover 
                                            transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                                            ${isImageVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-105 translate-y-4'}
                                            ${isCreated || isCreating ? 'contrast-100' : 'contrast-[0.9]'}
                                        `}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-ink/40">
                                        <span className="font-medium text-sm border border-ink/10 px-3 py-1 rounded-full">{artifact.name}</span>
                                    </div>
                                )}
                            </div>

                            {/* MARK GLYPH (Outside, Bottom Right) */}
                            {(isCreated || isCreating) && (
                                <div
                                    className="absolute -bottom-1 -right-12 w-8 h-8 rounded-full border border-accent flex items-center justify-center animate-in fade-in zoom-in duration-700 bg-transparent"
                                >
                                    <span className="font-bold text-[10px] text-ink">JB</span>
                                </div>
                            )}

                        </div>

                        {/* CONTROLS */}
                        <div className="w-full flex flex-col items-center justify-center">
                            {isCreated ? (
                                <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                                    <span className="text-3xl font-light tracking-wide text-ink">Created</span>
                                    <button onClick={reset} className="block mt-6 text-xs text-faded hover:text-ink transition-colors uppercase tracking-widest">
                                        Create Another
                                    </button>
                                </div>
                            ) : (
                                /* BEFORE CREATION: "Your mark" + Action */
                                <div className={`flex flex-col items-center w-full gap-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isCreating ? '-translate-y-24 opacity-0' : 'translate-y-6 opacity-100'}`}>

                                    {/* Action */}
                                    <button
                                        onClick={handleCreate}
                                        className={`text-ink hover:text-ink/60 font-medium text-lg tracking-tight transition-all duration-300 ${isCreating ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
                                    >
                                        Create
                                    </button>

                                    {/* "Your mark" representation - Expandable */}
                                    <div className="w-full max-w-[320px] bg-white rounded-xl border border-accent shadow-sm overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">

                                        <div
                                            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                                            className="flex items-center justify-between p-3 cursor-pointer hover:bg-stone-50 transition-colors"
                                        >
                                            {/* Left: Avatar + Label */}
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-ink text-canvas flex items-center justify-center text-xs font-bold">
                                                    JB
                                                </div>
                                                <span className="text-sm font-medium text-ink">Your mark</span>
                                            </div>

                                            {/* Right: Expand Icon */}
                                            <div className="text-accent opacity-60">
                                                {isDetailsOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                            </div>
                                        </div>

                                        {/* EXPANDED DETAILS */}
                                        {/* Using max-h transition for smoother slide */}
                                        <div className={`
                                            transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden
                                            ${isDetailsOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}
                                        `}>
                                            <div className="border-t border-accent/20 p-4 bg-stone-50/50 flex flex-col gap-2 text-[11px] font-medium tracking-wide text-ink/70">
                                                <div className="flex justify-between w-full">
                                                    <span className="opacity-50 uppercase tracking-widest">Author</span>
                                                    <span>jb@monolith.xyz</span>
                                                </div>
                                                <div className="flex justify-between w-full">
                                                    <span className="opacity-50 uppercase tracking-widest">License</span>
                                                    <span>MIT</span>
                                                </div>
                                                <div className="flex justify-between w-full">
                                                    <span className="opacity-50 uppercase tracking-widest">AI Training</span>
                                                    <span className="text-accent font-bold">Not Allowed</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                ) : (
                    /* EMPTY STATE */
                    <label
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className={`
                            group cursor-pointer w-full aspect-[4/5] 
                            flex flex-col items-center justify-center gap-4 transition-all duration-500
                            bg-canvas/15 shadow-inner hover:shadow-lg rounded-[2px]
                            ${isHovering
                                ? 'scale-[1.01]'
                                : 'scale-100'
                            }
                        `}
                    >
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => e.target.files?.[0] && handleFiles(e.target.files[0])}
                        />
                        <div className={`
                            w-16 h-16 rounded-full border-2 border-ink/10 flex items-center justify-center text-ink/30
                            transition-all duration-300 group-hover:border-ink/30 group-hover:text-ink group-hover:scale-110
                        `}>
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="font-medium text-ink/40 tracking-tight group-hover:text-ink/60 transition-colors">Place work here</span>
                    </label>
                )}

            </div>

            {/* FOOTER / CONTEXT */}
            <div className="fixed bottom-8 w-full text-center pointer-events-none">
                {!isCreated && artifact && (
                    <p className="text-faded text-sm animate-pulse">Waiting for your mark.</p>
                )}
            </div>

        </div>
    );
};

export default CreatePage;
