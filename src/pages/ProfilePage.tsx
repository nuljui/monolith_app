
import { useState, useRef, useEffect } from 'react';
import { Page, ProfileTab } from '../types';
import { TopBar } from '../components/layout/TopBar';
import { Laptop, Monitor, Smartphone, Download, Activity, LayoutGrid, List, Eye, EyeOff } from 'lucide-react';
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

    // View Mode
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
        { id: 3, title: 'Neon Nights', image: 'https://img.businessoffashion.com/resizer/v2/DH3XB4WIGVAUJERNBIOLVHSPOI.jpg?auth=530b3d9987b7a2127cb3eb895e287575d43a23d22087676ec8abdf9a079b02f8&width=1440' },
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
                    {(['collection', 'projects', 'upgrade', 'devices'] as ProfileTab[]).map((tab) => (
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
                    {/* VIEW TOGGLE (Only for collection) */}
                    {activeTab === 'collection' && (
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

            {/* CONTENT AREA */}
            <div className="w-full max-w-6xl px-6 pb-24 min-h-[400px]">

                {/* 1. COLLECTION VIEW */}
                {activeTab === 'collection' && (
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
                        ) : (
                            <div className="flex flex-col gap-2">
                                {/* List Header */}
                                <div className="grid grid-cols-12 px-6 py-3 border-b border-ink/10 text-xs font-semibold text-faded uppercase tracking-wider">
                                    <div className="col-span-1"></div> {/* Thumbnail */}
                                    <div className="col-span-6">File Name</div>
                                    <div className="col-span-2">Visibility</div>
                                    <div className="col-span-3">Timestamp</div>
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
                                        <div className="col-span-6 font-medium text-ink group-hover:text-accent transition-colors">{art.title}</div>
                                        <div className="col-span-2 text-xs text-ink/70 flex items-center gap-2">
                                            <Eye className="w-3 h-3 text-ink/50" />
                                            Public
                                        </div>
                                        <div className="col-span-3 text-xs text-ink/70">Jan 15, 2024</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* 2. PROJECTS VIEW */}
                {activeTab === 'projects' && (
                    <div className="flex flex-col gap-4 animate-in fade-in duration-500">
                        <div className="grid grid-cols-12 px-6 py-3 border-b border-ink/10 text-xs font-semibold text-faded uppercase tracking-wider text-center">
                            <div className="col-span-3 text-left">Project Name</div>
                            <div className="col-span-3 text-left">Workspace</div>
                            <div className="col-span-3">Members</div>
                            <div className="col-span-3">Artifacts</div>
                        </div>
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                onClick={() => onNavigate('project')}
                                className="grid grid-cols-12 px-6 py-4 bg-white rounded-lg shadow-sm border border-stone-100 items-center hover:shadow-md transition-shadow cursor-pointer group text-center"
                            >
                                <div className="col-span-3 font-medium text-ink group-hover:text-accent transition-colors text-left">{project.name}</div>
                                <div className="col-span-3 text-sm text-ink/70 text-left">{project.workspace}</div>
                                <div className="col-span-3 text-sm text-ink/70 flex items-center justify-center gap-1">
                                    <span className="font-mono">{Math.floor(Math.random() * 10) + 1}</span>
                                </div>
                                <div className="col-span-3 font-mono text-ink/60">{project.count}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 3. UPGRADE VIEW (Formerly Billing) */}
                {activeTab === 'upgrade' && (
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

                {/* 4. DEVICES VIEW */}
                {activeTab === 'devices' && (
                    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto space-y-12">

                        {/* DOWNLOAD SECTION */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 bg-ink text-white rounded-xl shadow-xl flex flex-col justify-between h-full relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <div>
                                    <div className="mb-4 w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                                        <Monitor className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Monolith for macOS</h3>
                                    <p className="text-white/60 text-sm">Experience the full power of Monolith on your Mac. Native performance, offline capability.</p>
                                </div>
                                <button className="mt-8 w-full py-3 bg-white text-ink rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors">
                                    <Download className="w-4 h-4" />
                                    Download for Mac
                                </button>
                            </div>

                            <div className="p-8 bg-white border border-stone-200 rounded-xl shadow-sm flex flex-col justify-between h-full">
                                <div>
                                    <div className="mb-4 w-12 h-12 rounded-lg bg-stone-100 flex items-center justify-center">
                                        <Monitor className="w-6 h-6 text-ink" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-ink">Monolith for Windows</h3>
                                    <p className="text-faded text-sm">Download the Windows early preview. Optimized for Windows 11.</p>
                                </div>
                                <button className="mt-8 w-full py-3 bg-stone-50 border border-stone-200 text-ink rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-stone-100 transition-colors">
                                    <Download className="w-4 h-4" />
                                    Download for Windows
                                </button>
                            </div>
                        </div>

                        {/* ACTIVITY SECTION */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Activity className="w-5 h-5 text-accent" />
                                <h3 className="text-lg font-bold text-ink">Recent Activity</h3>
                            </div>

                            <div className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-stone-50 border-b border-stone-100 text-xs font-semibold text-faded uppercase tracking-wider">
                                            <th className="px-6 py-4">Device</th>
                                            <th className="px-6 py-4">Last Login</th>
                                            <th className="px-6 py-4">Recent Artifact</th>
                                            <th className="px-6 py-4 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-100">
                                        <tr className="group hover:bg-stone-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Laptop className="w-4 h-4 text-ink/40" />
                                                    <span className="font-medium text-ink">MacBook Pro M2</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-ink/70">Just now</td>
                                            <td className="px-6 py-4 text-sm text-ink/70">
                                                Mountain Vista <span className="font-mono text-xs text-faded ml-1">#0001</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                                                    Active
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="group hover:bg-stone-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Smartphone className="w-4 h-4 text-ink/40" />
                                                    <span className="font-medium text-ink">iPhone 14 Pro</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-ink/70">2 hours ago</td>
                                            <td className="px-6 py-4 text-sm text-ink/70">
                                                Neon Nights <span className="font-mono text-xs text-faded ml-1">#0003</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">
                                                    Idle
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default ProfilePage;
