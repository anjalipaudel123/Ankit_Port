import { useEffect, useState } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
    const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

    useEffect(() => {
        // Phase 1: Enter animation plays (CSS handles this)
        const holdTimer = setTimeout(() => setPhase('hold'), 600);
        const exitTimer = setTimeout(() => setPhase('exit'), 1800);
        const completeTimer = setTimeout(() => onComplete(), 2400);

        return () => {
            clearTimeout(holdTimer);
            clearTimeout(exitTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#0a0a0f] transition-all duration-600 ${phase === 'exit' ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                }`}
            style={{ transitionDuration: '600ms' }}
        >
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.3) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Animated gradient orb */}
            <div className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[120px] animate-loader-orb bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />

            {/* Content */}
            <div className="relative flex flex-col items-center">
                {/* Logo mark */}
                <div className="mb-6 animate-loader-mark">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <span className="text-white font-bold text-xl font-serif">A</span>
                    </div>
                </div>

                {/* Name */}
                <div className="overflow-hidden mb-3">
                    <h1 className="text-3xl md:text-4xl font-serif text-white tracking-tight animate-loader-name">
                        Ankit Paudel
                    </h1>
                </div>

                {/* Subtitle with stagger */}
                <div className="overflow-hidden mb-8">
                    <p className="text-sm text-gray-500 tracking-[0.3em] uppercase animate-loader-subtitle">
                        Portfolio
                    </p>
                </div>

                {/* Loading bar */}
                <div className="w-48 h-[2px] bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-loader-bar" />
                </div>
            </div>

            <style>{`
        @keyframes loader-orb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes loader-mark {
          0% { opacity: 0; transform: translateY(20px) scale(0.8); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes loader-name {
          0% { opacity: 0; transform: translateY(100%); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes loader-subtitle {
          0% { opacity: 0; transform: translateY(100%); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes loader-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }

        .animate-loader-orb {
          animation: loader-orb 3s ease-in-out infinite;
        }

        .animate-loader-mark {
          animation: loader-mark 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }

        .animate-loader-name {
          animation: loader-name 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
        }

        .animate-loader-subtitle {
          animation: loader-name 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
        }

        .animate-loader-bar {
          animation: loader-bar 1.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
        }
      `}</style>
        </div>
    );
};

export default LoadingScreen;
