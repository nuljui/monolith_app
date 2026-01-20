
import { useState, useRef, useEffect } from 'react';
import { Page, ProjectTab, ProfileTab, License, AITraining, Visibility } from '../types';
import { TopBar } from '../components/layout/TopBar';
import { LayoutGrid, List, Eye, EyeOff } from 'lucide-react';
import yourWorkImg from '../assets/landing/yourmonolith.png';

interface ProjectPageProps {
    onNavigate: (page: Page, tab?: ProfileTab | ProjectTab, artifactId?: number) => void;
    activeTab?: ProjectTab;
}

const ProjectPage = ({ onNavigate, activeTab = 'collection' }: ProjectPageProps) => {
    const [currentTab, setCurrentTab] = useState<ProjectTab>(activeTab);
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

    // Settings State
    const [license, setLicense] = useState<License>('MIT');
    const [aiTraining, setAiTraining] = useState<AITraining>('Allowed');
    const [visibility, setVisibility] = useState<Visibility>('Public');
    const [description, setDescription] = useState('Explorations in form and function.');

    // View Mode
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        const activeElement = tabsRef.current[currentTab];
        if (activeElement) {
            setUnderlineStyle({
                left: activeElement.offsetLeft,
                width: activeElement.offsetWidth
            });
        }
    }, [currentTab]);

    const artifacts = [
        { id: 1, title: 'Concept A', image: yourWorkImg, timestamp: '2h ago', author: 'JB', visibility: 'Public', type: 'Image' },
        { id: 2, title: 'Prototype V1', image: 'https://images.unsplash.com/photo-1558655146-d09347e0c766?q=80&w=2576&auto=format&fit=crop', timestamp: '1d ago', author: 'Alex', visibility: 'Private', type: 'Image' },
        { id: 3, title: 'Assets', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', timestamp: '3d ago', author: 'JB', visibility: 'Public', type: 'Image' },
    ];

    const members = [
        { id: 1, name: 'JB', email: 'juliun@monolith.xyz', role: 'Admin' },
        { id: 2, name: 'Alex Smith', email: 'alex@monolith.xyz', role: 'Collaborator' },
        { id: 3, name: 'Sarah Jones', email: 'sarah@design.studio', role: 'Collaborator' },
    ];

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-stone-50 text-ink font-sans pt-24">
            <TopBar onNavigate={onNavigate} />

            {/* HEADER */}
            <div className="w-full max-w-4xl px-8 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Project Icon */}
                    <div className="w-32 h-32 md:w-32 md:h-32 rounded-2xl bg-white shadow-lg border border-stone-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-4xl font-bold text-ink/20">AD</span>
                    </div>

                    <div className="text-center md:text-left pt-2 space-y-4 flex-1">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink mb-1">Alpha Design</h1>
                            <div className="flex items-center gap-2 justify-center md:justify-start text-faded text-lg">
                                <span>Part of</span>
                                <span className="font-semibold text-ink">Personal Workspace</span>
                            </div>
                        </div>

                        {/* Defaults Display */}
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-ink/60">
                            <span className="px-3 py-1 bg-white border border-stone-200 rounded-full">{license}</span>
                            <span className={`px-3 py-1 bg-white border border-stone-200 rounded-full ${aiTraining === 'Allowed' ? 'text-green-600' : 'text-secondary'}`}>AI: {aiTraining}</span>
                            <span className="px-3 py-1 bg-white border border-stone-200 rounded-full">{visibility}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABS */}
            <div className="w-full max-w-6xl px-6 mb-8 border-b border-ink/5">
                <div className="relative flex gap-8">
                    {(['collection', 'members', 'settings'] as ProjectTab[]).map((tab) => (
                        <button
                            key={tab}
                            ref={(el) => (tabsRef.current[tab] = el)}
                            onClick={() => setCurrentTab(tab)}
                            className={`
                                pb-4 capitalize font-medium text-sm tracking-wide transition-colors
                                ${currentTab === tab ? 'text-ink' : 'text-faded hover:text-ink/70'}
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                    <span
                        className="absolute bottom-0 h-[2px] bg-accent rounded-t-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                        style={{
                            left: `${underlineStyle.left}px`,
                            width: `${underlineStyle.width}px`
                        }}
                    />

                    {/* VIEW TOGGLE (Only for collection) */}
                    {currentTab === 'collection' && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'text-ink' : 'text-faded hover:text-ink'}`}
                                title="Grid View"
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'text-ink' : 'text-faded hover:text-ink'}`}
                                title="List View"
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* CONTENT */}
            <div className="w-full max-w-6xl px-6 pb-24 min-h-[400px]">

                {/* COLLECTION */}
                {currentTab === 'collection' && (
                    <div className="animate-in fade-in duration-500">

                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sc:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {artifacts.map((art) => (
                                    <div
                                        key={art.id}
                                        onClick={() => onNavigate('artifact', undefined, art.id)}
                                        className="group relative aspect-[4/5] bg-white p-3 shadow-md hover:shadow-xl transition-all duration-500 ease-out cursor-pointer hover:-translate-y-1"
                                    >
                                        <div className="w-full h-full border border-stone-100 overflow-hidden relative">
                                            <img
                                                src={art.image}
                                                alt={art.title}
                                                className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                            <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-semibold shadow-sm tracking-wide">
                                                {art.title}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {/* List Header */}
                                <div className="grid grid-cols-12 px-6 py-3 border-b border-ink/10 text-xs font-semibold text-faded uppercase tracking-wider">
                                    <div className="col-span-1"></div> {/* Thumbnail */}
                                    <div className="col-span-5">File Name</div>
                                    <div className="col-span-2">Visibility</div>
                                    <div className="col-span-2">Timestamp</div>
                                    <div className="col-span-2">Created By</div>
                                </div>
                                {artifacts.map((art) => (
                                    <div
                                        key={art.id}
                                        onClick={() => onNavigate('artifact', undefined, art.id)}
                                        className="grid grid-cols-12 px-6 py-3 bg-white rounded-lg shadow-sm border border-stone-100 items-center hover:shadow-md transition-shadow cursor-pointer group"
                                    >
                                        <div className="col-span-1">
                                            <div className="w-10 h-10 border border-stone-200 rounded overflow-hidden bg-stone-100">
                                                <img src={art.image} className="w-full h-full object-cover" alt="" />
                                            </div>
                                        </div>
                                        <div className="col-span-5 font-medium text-ink group-hover:text-accent transition-colors">{art.title}</div>
                                        <div className="col-span-2 text-xs text-ink/70 flex items-center gap-2">
                                            {art.visibility === 'Public' ? <Eye className="w-3 h-3 text-ink/50" /> : <EyeOff className="w-3 h-3 text-ink/50" />}
                                            {art.visibility}
                                        </div>
                                        <div className="col-span-2 text-xs text-ink/70">{art.timestamp}</div>
                                        <div className="col-span-2 text-xs font-medium text-ink">{art.author}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* MEMBERS */}
                {currentTab === 'members' && (
                    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto flex flex-col gap-4">
                        <div className="grid grid-cols-12 px-6 py-3 border-b border-ink/10 text-xs font-semibold text-faded uppercase tracking-wider text-center">
                            <div className="col-span-4 text-left">Name</div>
                            <div className="col-span-5 text-left">Email</div>
                            <div className="col-span-3 text-right">Role</div>
                        </div>
                        {members.map((member) => (
                            <div key={member.id} className="grid grid-cols-12 px-6 py-4 bg-white rounded-lg shadow-sm border border-stone-100 items-center hover:shadow-md transition-shadow">
                                <div className="col-span-4 font-medium text-ink">{member.name}</div>
                                <div className="col-span-5 text-sm text-ink/70">{member.email}</div>
                                <div className="col-span-3 text-right">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold ${member.role === 'Admin' ? 'bg-ink/10 text-ink' : 'bg-stone-100 text-stone-500'}`}>
                                        {member.role}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* SETTINGS */}
                {currentTab === 'settings' && (
                    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto flex flex-col gap-8">

                        {/* Project Info */}
                        <div className="bg-white rounded-xl border border-stone-100 shadow-sm p-8 space-y-6">
                            <div className="pb-4 border-b border-stone-100">
                                <h3 className="text-xl font-bold text-ink mb-1">Project Details</h3>
                                <p className="text-sm text-faded">General information about this project.</p>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-faded uppercase tracking-wider mb-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
                                />
                            </div>
                        </div>

                        {/* Defaults */}
                        <div className="bg-white rounded-xl border border-stone-100 shadow-sm p-8 space-y-8">
                            <div className="pb-4 border-b border-stone-100">
                                <h3 className="text-xl font-bold text-ink mb-1">Project Defaults</h3>
                                <p className="text-sm text-faded">These settings will apply to all new artifacts created in this project.</p>
                            </div>

                            <div className="space-y-6">
                                {/* License */}
                                <div>
                                    <label className="block text-xs font-semibold text-faded uppercase tracking-wider mb-2">Default License</label>
                                    <select
                                        value={license}
                                        onChange={(e) => setLicense(e.target.value as License)}
                                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                    >
                                        <option value="MIT">MIT</option>
                                        <option value="Creative Commons">Creative Commons</option>
                                        <option value="Unlicensed">Unlicensed</option>
                                        <option value="None Specified">None Specified</option>
                                    </select>
                                </div>

                                {/* AI Training */}
                                <div>
                                    <label className="block text-xs font-semibold text-faded uppercase tracking-wider mb-2">AI Training</label>
                                    <div className="flex gap-4">
                                        {(['Allowed', 'Not Allowed'] as AITraining[]).map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setAiTraining(option)}
                                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium border transition-all ${aiTraining === option ? 'bg-ink text-white border-ink' : 'bg-white border-stone-200 text-ink hover:bg-stone-50'}`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Visibility */}
                                <div>
                                    <label className="block text-xs font-semibold text-faded uppercase tracking-wider mb-2">Visibility</label>
                                    <div className="flex gap-4">
                                        {(['Public', 'Private'] as Visibility[]).map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setVisibility(option)}
                                                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium border transition-all ${visibility === option ? 'bg-ink text-white border-ink' : 'bg-white border-stone-200 text-ink hover:bg-stone-50'}`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default ProjectPage;
