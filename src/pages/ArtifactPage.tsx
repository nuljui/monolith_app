
import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Page, ProfileTab } from '../types';
import { TopBar } from '../components/layout/TopBar';
import yourWorkImg from '../assets/landing/yourmonolith.png';

interface ArtifactPageProps {
    onNavigate: (page: Page, tab?: ProfileTab) => void;
    artifactId: number | null;
}

const ArtifactPage = ({ onNavigate, artifactId }: ArtifactPageProps) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // Mock Data Lookup
    // In a real app, we'd fetch based on artifactId.
    const artifact = {
        id: artifactId || 1,
        title: 'Mountain Vista',
        image: yourWorkImg,
        author: 'JB',
        authorHandle: 'juliun@monolith.xyz',
        license: 'Attribution-NonCommercial 4.0',
        aiTraining: 'Not Allowed',
        visibility: 'Public',
        timestamp: 'Jan 15, 2024 • 10:42 AM',
        project: 'Alpha Design',

        // Technical Details
        creationReceipt: '0x7f9...a2b4',
        fileType: 'image/png',
        visualId: 'phash: 9f8a...2b1c',
        relatedRecords: 'c2pa://monolith.xyz/r/12345',
        preview: 'https://monolith.xyz/p/12345'
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-stone-50 text-ink font-sans pt-24 pb-24">

            <TopBar onNavigate={onNavigate} />

            {/* BACK NAV */}
            <div className="w-full max-w-6xl px-6 mb-8">
                <button
                    onClick={() => onNavigate('profile', 'collection')}
                    className="flex items-center gap-2 text-faded hover:text-ink transition-colors text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Collection
                </button>
            </div>

            <div className="w-full max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                {/* LEFT: IMAGE */}
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="w-full aspect-[4/5] bg-white p-4 shadow-lg rounded-[2px] border border-stone-100 relative group">
                        <div className="w-full h-full border border-stone-100 overflow-hidden bg-stone-50 flex items-center justify-center relative">
                            {/* Mesh Gradient Background for effect */}
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />

                            <img
                                src={artifact.image}
                                alt={artifact.title}
                                className="w-full h-full object-contain relative z-10"
                            />
                        </div>
                    </div>


                </div>

                {/* RIGHT: DETAILS */}
                <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">

                    {/* HEADLINE */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-2">{artifact.title}</h1>
                        <div className="flex items-center gap-3 text-lg">
                            <span className="text-faded">by</span>
                            <button
                                onClick={() => onNavigate('profile')}
                                className="font-medium text-ink hover:text-accent transition-colors flex items-center gap-1"
                            >
                                <div className="w-6 h-6 rounded-full bg-ink text-white flex items-center justify-center text-[8px] font-bold">JB</div>
                                {artifact.author}
                            </button>
                        </div>
                    </div>

                    <div className="h-[1px] w-full bg-ink/5" />

                    {/* BASIC METADATA GRID */}
                    <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                        <div>
                            <label className="block text-xs font-semibold text-faded uppercase tracking-wider mb-1">Project</label>
                            <div className="font-medium text-ink">{artifact.project}</div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-faded uppercase tracking-wider mb-1">License</label>
                            <div className="font-medium text-ink">{artifact.license}</div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-faded uppercase tracking-wider mb-1">AI Training</label>
                            <div className={`font-medium ${artifact.aiTraining === 'Allowed' ? 'text-green-600' : 'text-secondary'}`}>
                                {artifact.aiTraining}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-faded uppercase tracking-wider mb-1">Visibility</label>
                            <div className="font-medium text-ink">{artifact.visibility}</div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-faded uppercase tracking-wider mb-1">Artifact ID</label>
                            <div className="font-mono text-sm text-ink/70">#{artifact.id.toString().padStart(4, '0')}</div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-faded uppercase tracking-wider mb-1">Timestamp</label>
                            <div className="text-sm text-ink/70">{artifact.timestamp}</div>
                        </div>
                    </div>

                    <div className="h-[1px] w-full bg-ink/5" />

                    {/* EXPANDABLE DETAILS */}
                    <div className="border border-ink/10 rounded-lg overflow-hidden bg-white/50">
                        <button
                            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                            className="w-full flex items-center justify-between p-4 hover:bg-white transition-colors"
                        >
                            <span className="font-semibold text-sm">More Details</span>
                            {isDetailsOpen ? <ChevronUp className="w-4 h-4 text-faded" /> : <ChevronDown className="w-4 h-4 text-faded" />}
                        </button>

                        {isDetailsOpen && (
                            <div className="p-4 border-t border-ink/5 bg-white space-y-4 animate-in slide-in-from-top-2 duration-200">

                                <div>
                                    <label className="block text-[10px] font-semibold text-faded uppercase tracking-wider mb-1">Creation Receipt</label>
                                    <div className="flex items-center gap-2 font-mono text-xs text-accent bg-accent/5 p-2 rounded-md truncate">
                                        {artifact.creationReceipt}
                                        <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-semibold text-faded uppercase tracking-wider mb-1">Visual ID</label>
                                        <div className="font-mono text-xs text-ink/70 break-all">{artifact.visualId}</div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-faded uppercase tracking-wider mb-1">File Type</label>
                                        <div className="font-mono text-xs text-ink/70">{artifact.fileType}</div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-semibold text-faded uppercase tracking-wider mb-1">Related Records</label>
                                    <div className="font-mono text-xs text-ink/50 break-all">{artifact.relatedRecords}</div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ArtifactPage;
