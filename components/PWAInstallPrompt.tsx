'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [showIOSGuide, setShowIOSGuide] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
            return;
        }

        // Check if dismissed recently (don't show for 3 days)
        const dismissedAt = localStorage.getItem('pwa-install-dismissed');
        if (dismissedAt) {
            const threeDays = 3 * 24 * 60 * 60 * 1000;
            if (Date.now() - parseInt(dismissedAt) < threeDays) {
                return;
            }
        }

        // Detect iOS
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        setIsIOS(isIOSDevice);

        if (isIOSDevice && isSafari) {
            // Show iOS install guide after a delay
            const timer = setTimeout(() => setShowPrompt(true), 3000);
            return () => clearTimeout(timer);
        }

        // Android / Chrome - listen for beforeinstallprompt
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setTimeout(() => setShowPrompt(true), 2000);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Listen for successful install
        window.addEventListener('appinstalled', () => {
            setIsInstalled(true);
            setShowPrompt(false);
            setDeferredPrompt(null);
        });

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstall = async () => {
        if (deferredPrompt) {
            await deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            if (choiceResult.outcome === 'accepted') {
                setShowPrompt(false);
            }
            setDeferredPrompt(null);
        }
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        setShowIOSGuide(false);
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    };

    if (isInstalled || !showPrompt) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] animate-fade-in"
                onClick={handleDismiss}
            />

            {/* Install Prompt Card */}
            <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 animate-slide-up">
                <div className="max-w-md mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
                    {/* Header with icon */}
                    <div className="flex items-center gap-4 p-5 pb-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg ring-2 ring-blue-500/20 flex-shrink-0">
                            <img
                                src="/icons/icon-192x192.png"
                                alt="Attendify"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg">Install Attendify</h3>
                            <p className="text-slate-400 text-sm">
                                Install aplikasi untuk akses lebih cepat
                            </p>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="text-slate-500 hover:text-slate-300 transition-colors p-1"
                            aria-label="Tutup"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-5 pb-2">
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Akses offline
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Loading cepat
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Fullscreen
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-5 pt-3">
                        {isIOS ? (
                            <>
                                {!showIOSGuide ? (
                                    <button
                                        onClick={() => setShowIOSGuide(true)}
                                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                                    >
                                        Cara Install di iPhone/iPad
                                    </button>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="bg-slate-700/50 rounded-xl p-4 space-y-2.5">
                                            <div className="flex items-start gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span>
                                                <p className="text-slate-300 text-sm">
                                                    Tap tombol <strong className="text-white">Share</strong>{' '}
                                                    <svg className="inline w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                    </svg>{' '}
                                                    di bawah browser
                                                </p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span>
                                                <p className="text-slate-300 text-sm">
                                                    Scroll ke bawah dan pilih <strong className="text-white">&quot;Add to Home Screen&quot;</strong>
                                                </p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span>
                                                <p className="text-slate-300 text-sm">
                                                    Tap <strong className="text-white">&quot;Add&quot;</strong> untuk install
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleDismiss}
                                            className="w-full py-2.5 text-slate-400 text-sm hover:text-slate-300 transition-colors"
                                        >
                                            Mengerti, tutup
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDismiss}
                                    className="flex-1 py-3 px-4 text-slate-400 hover:text-slate-200 font-medium rounded-xl transition-all duration-200 hover:bg-slate-700/50"
                                >
                                    Nanti saja
                                </button>
                                <button
                                    onClick={handleInstall}
                                    className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                                >
                                    Install
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
        </>
    );
}
