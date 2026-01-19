import React, { useState } from 'react';
import { Upload, FileCheck, ShieldCheck, X, Loader2 } from 'lucide-react';

interface FileState {
    file: File;
    name: string;
    preview: string;
}

const SimpleClaimPage = () => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<FileState | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // Mock function to handle the "Try Demo" click
    const loadDemoFile = () => {
        // In a real app, fetch a blob or just set a state to simulate a file
        // We use a mock File object cast for the demo to satisfy types if needed, or just partial data
        setFile({
            file: new File([], 'sample.png'), // Mock file
            name: 'sample_evidence_v1.png',
            // type: 'image/png',
            preview: 'https://via.placeholder.com/400x300/1a1a1a/ffffff?text=Sample+Evidence'
        });
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files[0]);
        }
    };

    const handleFiles = (selectedFile: File) => {
        // Create a fake preview for the file
        const fileWithPreview = {
            file: selectedFile,
            name: selectedFile.name,
            preview: URL.createObjectURL(selectedFile)
        };
        setFile(fileWithPreview);
    };

    const handleSubmit = () => {
        setIsProcessing(true);
        // Simulate the cryptographic hashing / API call
        setTimeout(() => {
            setIsProcessing(false);
            setIsComplete(true);
        }, 2500);
    };

    const resetState = () => {
        setFile(null);
        setIsProcessing(false);
        setIsComplete(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 relative">
            {/* 1. Subtle Background Grid (Matches your existing style) */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                    backgroundSize: '32px 32px'
                }}
            >
            </div>

            {/* 2. Simplified Header - No Navigation, Just Identity */}
            <header className="w-full p-6 flex justify-between items-center z-10 relative">
                <div className="flex items-center gap-2">
                    {/* Placeholder for Stability Logo */}
                    <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white transform rotate-45"></div>
                    </div>
                    <span className="font-bold tracking-tight text-lg">STABILITY</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Signed in as</p>
                        <p className="text-sm font-medium">juliun@stability.io</p>
                    </div>
                    <div className="h-10 w-10 bg-black text-white rounded-full flex items-center justify-center font-bold">J</div>
                </div>
            </header>

            {/* 3. The "Zen" Center Stage */}
            <main className="flex-1 flex flex-col items-center justify-center p-4 z-10 w-full max-w-2xl mx-auto">
                {/* State A: SUCCESS (The Receipt) */}
                {isComplete ? (
                    <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Claim Secured</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Your content has been fingerprinted and anchored on-chain. It is now immutable.
                        </p>

                        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left border border-gray-100 font-mono text-xs text-gray-600 break-all">
                            <p className="mb-1 text-gray-400 uppercase">Transaction Hash</p>
                            0x8c2b...199f2e78d4271...4a01
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={resetState}
                                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors"
                            >
                                Sign Another
                            </button>
                            <button className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors shadow-lg">
                                View on Dashboard
                            </button>
                        </div>
                    </div>
                ) : (
                    /* State B: INPUT & PROCESSING */
                    <div className="w-full">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold tracking-tight mb-3">Secure Your Evidence</h1>
                            <p className="text-gray-500 text-lg">Generate an immutable fingerprint for your content.</p>
                        </div>

                        <div
                            className={`
                relative group cursor-pointer
                bg-white rounded-2xl shadow-sm border-2 
                ${dragActive ? 'border-orange-500 bg-orange-50/50 scale-[1.02]' : 'border-dashed border-gray-300'}
                ${file ? 'border-solid border-gray-200' : 'hover:border-gray-400'}
                transition-all duration-300 ease-out h-96 flex flex-col items-center justify-center p-8
              `}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('file-upload')?.click()}
                        >
                            {/* Logic: If File Exists, Show Preview. If not, Show Drop Zone */}
                            {file ? (
                                <div className="w-full h-full flex flex-col items-center justify-center">
                                    {/* Close Button to Remove File */}
                                    {!isProcessing && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                            className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}

                                    {/* Image Preview */}
                                    <div className="relative w-full flex-1 mb-6 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
                                        {file.preview ? (
                                            <img src={file.preview} alt="Preview" className="h-full object-contain p-4 opacity-90" />
                                        ) : (
                                            <div className="text-gray-400 flex flex-col items-center">
                                                <FileCheck className="w-12 h-12 mb-2" />
                                                <span>{file.name}</span>
                                            </div>
                                        )}

                                        {/* Processing Overlay */}
                                        {isProcessing && (
                                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                                                <Loader2 className="w-10 h-10 animate-spin text-orange-600 mb-3" />
                                                <p className="font-semibold text-gray-900">Generating Fingerprint...</p>
                                                <p className="text-sm text-gray-500">Calculating SHA-256 hash</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Button */}
                                    {!isProcessing && (
                                        <div className="w-full flex flex-col gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleSubmit(); }}
                                                className="w-full py-4 bg-black hover:bg-gray-800 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                            >
                                                <ShieldCheck className="w-5 h-5" />
                                                Sign & Secure Evidence
                                            </button>
                                            <p className="text-xs text-center text-gray-400">
                                                Project: <span className="text-gray-600 font-medium">Personal Workspace</span> (Auto-selected)
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* Empty State (No File) */
                                <>
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Upload className="w-8 h-8 text-gray-400 group-hover:text-gray-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Drag and drop file here</h3>
                                    <p className="text-gray-500 mb-8 max-w-xs text-center">
                                        Supports JPG, PNG, PDF. We only store the cryptographic hash, not the file itself.
                                    </p>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => e.target.files && e.target.files[0] && handleFiles(e.target.files[0])}
                                    />
                                    <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                                        Select File
                                    </button>

                                    {/* The "Safe Mode" Link */}
                                    <div className="absolute bottom-8 text-sm">
                                        <span className="text-gray-400">Not ready to use your own file? </span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); loadDemoFile(); }}
                                            className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                                        >
                                            Try with a demo image
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SimpleClaimPage;