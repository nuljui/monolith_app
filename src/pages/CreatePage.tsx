import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Page, ArtifactState, License, AITraining, Visibility } from '../types';
import { TopBar } from '../components/layout/TopBar';
import { MarkDetails } from '../components/create/MarkDetails';

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

    // Mark Details State
    const [isEditingDetails, setIsEditingDetails] = useState(false);
    const [markLicense, setMarkLicense] = useState<License>('MIT');
    const [markAITraining, setMarkAITraining] = useState<AITraining>('Not Allowed');
    const [markVisibility, setMarkVisibility] = useState<Visibility>('Private');

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
        setIsEditingDetails(false); // Ensure edit mode is closed

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
        setIsEditingDetails(false);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-stone-50 text-ink font-sans pt-24 relative">

            {/* FOCUS BACKDROP */}
            <div
                className={`fixed inset-0 bg-stone-50/50 backdrop-blur-sm transition-all duration-500 z-40 ${isEditingDetails ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsEditingDetails(false)}
            />

            <div className="z-30 w-full flex flex-col items-center">
                <TopBar onNavigate={onNavigate} />
            </div>

            {/* HEADLINE */}
            {!artifact && (
                <div className="text-center mb-16 animate-in fade-in duration-700 z-30">
                    <h1 className="text-4xl font-semibold tracking-tight text-ink mb-2">
                        Create your Monolith.
                    </h1>
                    <p className="text-faded text-lg">
                        Build your permanent body of work.
                    </p>
                </div>
            )}

            {/* MAIN INTERACTION AREA */}
            <div className="relative w-full max-w-lg">

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
                        <div className="w-full flex flex-col items-center justify-center gap-4">
                            {isCreated ? (
                                <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                                    <span className="text-3xl font-light tracking-wide text-ink">Created</span>
                                    <button onClick={reset} className="block mt-6 text-xs text-faded hover:text-ink transition-colors uppercase tracking-widest">
                                        Create Another
                                    </button>
                                </div>
                            ) : (
                                /* BEFORE CREATION: "Your mark" + Action */
                                <>
                                    {/* "Your mark" representation - Expandable Wrapper */}
                                    <div className={`
                                        relative w-full max-w-[320px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                                        ${isCreating ? '-translate-y-24 opacity-0' : 'translate-y-6 opacity-100'}
                                        ${isEditingDetails ? 'z-50' : 'z-auto'}
                                    `}>
                                        <MarkDetails
                                            isOpen={isDetailsOpen}
                                            onToggleOpen={() => setIsDetailsOpen(!isDetailsOpen)}
                                            isEditing={isEditingDetails}
                                            onToggleEdit={(e) => { e.stopPropagation(); setIsEditingDetails(!isEditingDetails); }}
                                            license={markLicense}
                                            onLicenseChange={setMarkLicense}
                                            aiTraining={markAITraining}
                                            onAITrainingChange={setMarkAITraining}
                                            visibility={markVisibility}
                                            onVisibilityChange={setMarkVisibility}
                                        />
                                    </div>

                                    {/* Action Button Wrapper */}
                                    <div className={`order-last transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isCreating ? '-translate-y-24 opacity-0' : 'translate-y-6 opacity-100'}`}>
                                        <button
                                            onClick={handleCreate}
                                            className={`mt-6 text-ink hover:text-ink/60 font-medium text-lg tracking-tight transition-all duration-300 ${isCreating ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
                                        >
                                            Create
                                        </button>
                                    </div>
                                </>
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
