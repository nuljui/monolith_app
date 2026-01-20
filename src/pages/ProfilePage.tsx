
import { useState, useRef, useEffect } from 'react';
import { Page, ProfileTab } from '../types';
import { TopBar } from '../components/layout/TopBar';
import yourWorkImg from '../assets/landing/yourmonolith.png';
import yourMarkImg from '../assets/landing/yourartifact.png';

interface ProfilePageProps {
    onNavigate: (page: Page, tab?: ProfileTab, artifactId?: number) => void;
    activeTab?: ProfileTab;
}

const ProfilePage = ({ onNavigate, activeTab = 'collection' }: ProfilePageProps) => {
    // Sliding Underline Logic
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

    useEffect(() => {
        const activeElement = tabsRef.current[activeTab];
        if (activeElement) {
            setUnderlineStyle({
                left: activeElement.offsetLeft,
                width: activeElement.offsetWidth
            });
        }
    }, [activeTab]);

    // Mock Data
    const artifacts = [
        { id: 1, title: 'Mountain Vista', image: yourWorkImg },
        { id: 2, title: 'Abstract #1', image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2576&auto=format&fit=crop' },
        { id: 3, title: 'Neon Nights', image: 'https://images.unsplash.com/photo-1495615080073-6b09c7a70a8e?q=80&w=2670&auto=format&fit=crop' },
        { id: 4, title: 'Geometry', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop' },
    ];

    const projects = [
        { id: 1, name: 'Alpha Design', workspace: 'Personal', desc: 'Explorations in form', count: 12 },
        { id: 2, name: 'Client X', workspace: 'Studio', desc: 'Brand assets for Q1', count: 48 },
        { id: 3, name: 'Monolith UI', workspace: 'Monolith', desc: 'Interface concepts', count: 8 },
    ];

    const handleTabChange = (tab: ProfileTab) => {
        onNavigate('profile', tab);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-stone-50 text-ink font-sans pt-24">

            <TopBar onNavigate={onNavigate} />

            {/* PROFILE HEADER */}
            <div className="w-full max-w-4xl px-8 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* AVATAR */}
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-accent bg-white p-2 shadow-lg flex-shrink-0">
                        <div className="w-full h-full rounded-full overflow-hidden bg-stone-100 flex items-center justify-center">
                            <img src={yourMarkImg} alt="Profile" className="w-1/2 h-1/2 object-contain opacity-80" style={{ filter: 'var(--filter-accent)' }} />
                        </div>
                    </div>

                    {/* INFO */}
                    <div className="text-center md:text-left pt-2 space-y-3">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-ink">JB</h1>
                            <p className="text-faded text-lg">juliun@monolith.xyz</p>
                        </div>

                        {/* Links */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 text-sm text-accent underline underline-offset-4">
                            <a href="#" className="hover:text-accent/80 transition-colors">link_1.com</a>
                            <a href="#" className="hover:text-accent/80 transition-colors">link_2.com</a>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
                            <div className="px-3 py-1 bg-white border border-stone-200 rounded-full shadow-sm text-xs font-medium text-ink/70">
                                4 Artifacts
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABS */}
            <div className="w-full max-w-6xl px-6 mb-8 border-b border-ink/5">
                <div className="relative flex gap-8">
                    {(['collection', 'projects', 'billing'] as ProfileTab[]).map((tab) => (
                        <button
                            key={tab}
                            ref={(el) => (tabsRef.current[tab] = el)}
                            onClick={() => handleTabChange(tab)}
                            className={`
                                pb-4 capitalize font-medium text-sm tracking-wide transition-colors
                                ${activeTab === tab ? 'text-ink' : 'text-faded hover:text-ink/70'}
                            `}
                        >
                            {tab}
                        </button>
                    ))}

                    {/* Sliding Underline */}
                    <span
                        className="absolute bottom-0 h-[2px] bg-accent rounded-t-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                        style={{
                            left: `${underlineStyle.left}px`,
                            width: `${underlineStyle.width}px`
                        }}
                    />
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="w-full max-w-6xl px-6 pb-24 min-h-[400px]">

                {/* 1. COLLECTION VIEW */}
                {activeTab === 'collection' && (
                    <div className="grid grid-cols-1 sc:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-in fade-in duration-500">
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
                                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-500" />
                                </div>
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-semibold shadow-sm tracking-wide">
                                        {art.title}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => onNavigate('create')}
                            className="group relative aspect-[4/5] flex flex-col items-center justify-center gap-4 border-2 border-dashed border-ink/10 hover:border-accent/40 rounded-[2px] hover:bg-white/50 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-full bg-stone-100 group-hover:bg-accent/10 flex items-center justify-center text-ink/30 group-hover:text-accent transition-colors">
                                <span className="text-2xl font-light">+</span>
                            </div>
                            <span className="text-sm font-medium text-ink/40 group-hover:text-accent tracking-wide transition-colors">Create New</span>
                        </button>
                    </div>
                )}

                {/* 2. PROJECTS VIEW */}
                {activeTab === 'projects' && (
                    <div className="flex flex-col gap-4 animate-in fade-in duration-500">
                        <div className="grid grid-cols-12 px-6 py-3 border-b border-ink/10 text-xs font-semibold text-faded uppercase tracking-wider">
                            <div className="col-span-3">Project Name</div>
                            <div className="col-span-3">Workspace</div>
                            <div className="col-span-4">Description</div>
                            <div className="col-span-2 text-right"># Artifacts</div>
                        </div>
                        {projects.map((project) => (
                            <div key={project.id} className="grid grid-cols-12 px-6 py-4 bg-white rounded-lg shadow-sm border border-stone-100 items-center hover:shadow-md transition-shadow">
                                <div className="col-span-3 font-medium text-ink">{project.name}</div>
                                <div className="col-span-3 text-sm text-ink/70">{project.workspace}</div>
                                <div className="col-span-4 text-sm text-faded truncate pr-4">{project.desc}</div>
                                <div className="col-span-2 text-right font-mono text-ink/60">{project.count}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 3. BILLING VIEW */}
                {activeTab === 'billing' && (
                    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg border border-stone-100 overflow-hidden">
                            <div className="p-8 border-b border-stone-100">
                                <h3 className="text-xl font-bold text-ink mb-1">Subscription Details</h3>
                                <p className="text-faded text-sm">Manage your plan and billing information.</p>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-xs font-semibold text-faded uppercase tracking-wider mb-2">Current Plan</label>
                                        <div className="text-2xl font-bold text-ink">Free</div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-faded uppercase tracking-wider mb-2">Renews On</label>
                                        <div className="text-2xl font-medium text-ink">Feb 1, 2025</div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                                <button className="px-6 py-2 bg-white border border-stone-200 rounded-lg text-ink font-medium text-sm hover:bg-stone-50 transition-colors shadow-sm">
                                    Manage Subscription
                                </button>
                                <button className="px-6 py-2 bg-accent text-white rounded-lg font-medium text-sm hover:bg-accent/90 transition-colors shadow-md shadow-accent/20">
                                    Upgrade your plan
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProfilePage;
