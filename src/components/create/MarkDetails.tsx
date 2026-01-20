import { useState } from 'react';
import { ChevronRight, ChevronDown, Edit2, Eye, EyeOff } from 'lucide-react';
import { License, AITraining, Visibility } from '../../types';

interface MarkDetailsProps {
    isOpen: boolean;
    onToggleOpen: () => void;
    isEditing: boolean;
    onToggleEdit: (e: React.MouseEvent) => void;
    onMarkClick?: () => void;

    // Data Props
    license: License;
    onLicenseChange: (l: License) => void;
    aiTraining: AITraining;
    onAITrainingChange: (a: AITraining) => void;
    visibility: Visibility;
    onVisibilityChange: (v: Visibility) => void;
}

export const MarkDetails = ({
    isOpen,
    onToggleOpen,
    isEditing,
    onToggleEdit,
    license,
    onLicenseChange,
    aiTraining,
    onAITrainingChange,
    visibility,
    onVisibilityChange,
    onMarkClick
}: MarkDetailsProps) => {
    const [isLicenseDropdownOpen, setIsLicenseDropdownOpen] = useState(false);

    return (
        <div className={`transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isEditing ? 'scale-110' : ''}`}>
            {/* The Box */}
            <div className={`w-full bg-white rounded-xl border shadow-sm overflow-visible transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isEditing ? 'border-secondary shadow-md ring-4 ring-secondary/10' : 'border-accent'}`}>

                {/* Header */}
                <div
                    onClick={onToggleOpen}
                    className={`flex items-center justify-between p-3 cursor-pointer hover:bg-stone-50 transition-colors rounded-t-xl ${!isOpen ? 'rounded-b-xl' : ''}`}
                >
                    {/* Left: Avatar + Label */}
                    <div className="flex items-center gap-3">
                        <div
                            onClick={(e) => {
                                if (onMarkClick) {
                                    e.stopPropagation();
                                    onMarkClick();
                                }
                            }}
                            className={`w-8 h-8 rounded-full bg-ink text-canvas flex items-center justify-center text-xs font-bold ${onMarkClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
                        >
                            JB
                        </div>
                        <span className="text-sm font-medium text-ink">Your mark</span>
                    </div>

                    {/* Right: Expand Icon */}
                    <div className="text-accent opacity-60">
                        {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </div>
                </div>

                {/* EXPANDED DETAILS */}
                <div className={`
                    transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-visible bg-stone-50/50
                    ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}
                `}>
                    <div className="relative border-t border-accent/20 p-4 flex flex-col gap-3 text-[11px] font-medium tracking-wide text-ink/70">

                        {/* Author */}
                        <div className="flex justify-between w-full items-center">
                            <span className="opacity-50 uppercase tracking-widest">Author</span>
                            <span>jb@monolith.xyz</span>
                        </div>

                        {/* License */}
                        <div className="flex justify-between w-full items-center relative z-20">
                            <span className="opacity-50 uppercase tracking-widest">License</span>
                            {isEditing ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsLicenseDropdownOpen(!isLicenseDropdownOpen)}
                                        className="flex items-center gap-1.5 text-secondary hover:text-secondary/80 transition-colors"
                                    >
                                        <span>{license}</span>
                                        <ChevronDown className={`w-3 h-3 transition-transform ${isLicenseDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isLicenseDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-stone-100 overflow-hidden py-1 flex flex-col animate-in fade-in zoom-in-95 duration-200">
                                            {(['MIT', 'Creative Commons', 'Unlicensed', 'None Specified'] as License[]).map((lic) => (
                                                <button
                                                    key={lic}
                                                    onClick={() => { onLicenseChange(lic); setIsLicenseDropdownOpen(false); }}
                                                    className={`text-right px-4 py-2 text-[11px] hover:bg-stone-50 transition-colors ${license === lic ? 'text-secondary font-bold' : 'text-ink'}`}
                                                >
                                                    {lic}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <span>{license}</span>
                            )}
                        </div>

                        {/* AI Training */}
                        <div className="flex justify-between w-full items-center">
                            <span className="opacity-50 uppercase tracking-widest">AI Training</span>
                            <span
                                onClick={() => isEditing && onAITrainingChange(aiTraining === 'Allowed' ? 'Not Allowed' : 'Allowed')}
                                className={`
                                    font-bold transition-colors
                                    ${isEditing ? 'cursor-pointer text-secondary hover:text-secondary/80' : (aiTraining === 'Allowed' ? 'text-accent' : 'text-red-500/60')}
                                `}
                            >
                                {aiTraining}
                            </span>
                        </div>

                        {/* Visibility */}
                        <div className="flex justify-between w-full items-center">
                            <span className="opacity-50 uppercase tracking-widest">Visibility</span>
                            <div
                                onClick={() => isEditing && onVisibilityChange(visibility === 'Public' ? 'Private' : 'Public')}
                                className={`
                                    flex items-center gap-1.5 transition-colors
                                    ${isEditing ? 'cursor-pointer text-secondary hover:text-secondary/80' : 'text-ink'}
                                `}
                            >
                                <span>{visibility}</span>
                                {visibility === 'Public' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Edit Toggle - Outside bottom right */}
            {isOpen && (
                <button
                    onClick={onToggleEdit}
                    className={`
                        absolute bottom-0 -right-6 p-1.5 rounded-full transition-all duration-300 animate-in fade-in zoom-in z-50
                        ${isEditing ? 'bg-secondary/10 text-secondary' : 'text-ink/30 hover:text-ink hover:bg-ink/5'}
                    `}
                >
                    <Edit2 className="w-3 h-3" />
                </button>
            )}
        </div>
    );
};
