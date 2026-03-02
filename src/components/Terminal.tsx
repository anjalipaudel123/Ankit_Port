import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Terminal as TerminalIcon, Minus, Square } from 'lucide-react';

interface TerminalLine {
    type: 'input' | 'output' | 'error' | 'system' | 'ascii';
    content: string;
}

const WELCOME_ART = `
  ╔══════════════════════════════════════════╗
  ║     █████╗ ███╗   ██╗██╗  ██╗██╗████████║
  ║    ██╔══██╗████╗  ██║██║ ██╔╝██║╚══██╔══║
  ║    ███████║██╔██╗ ██║█████╔╝ ██║   ██║  ║
  ║    ██╔══██║██║╚██╗██║██╔═██╗ ██║   ██║  ║
  ║    ██║  ██║██║ ╚████║██║  ██╗██║   ██║  ║
  ║    ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝   ╚═╝  ║
  ╚══════════════════════════════════════════╝
`;

const commands: Record<string, () => string[]> = {
    help: () => [
        '',
        '  Available commands:',
        '',
        '  about       → Who am I',
        '  skills      → Technical expertise',
        '  experience  → Work history',
        '  projects    → Featured projects',
        '  contact     → Get in touch',
        '  education   → Academic background',
        '  creative    → Beyond code',
        '  resume      → Download my resume',
        '  socials     → GitHub & LinkedIn',
        '  clear       → Clear terminal',
        '  exit        → Close terminal',
        '',
        '  Tip: Try "sudo hire ankit" 😉',
        '',
    ],
    about: () => [
        '',
        '  ┌─ About Me ─────────────────────────────────┐',
        '  │                                             │',
        '  │  Ankit Paudel                               │',
        '  │  IAM Intern · ML Engineer · Backend Dev     │',
        '  │  📍 Kathmandu, Nepal                        │',
        '  │                                             │',
        '  │  Currently interning at Paramount Computer  │',
        '  │  Systems — a regional cybersecurity leader   │',
        '  │  in the Middle East. I also build ML        │',
        '  │  pipelines and scalable backend systems.    │',
        '  │                                             │',
        '  │  When I\'m not coding, I\'m behind a camera  │',
        '  │  or color grading in DaVinci Resolve.       │',
        '  │                                             │',
        '  └─────────────────────────────────────────────┘',
        '',
    ],
    skills: () => [
        '',
        '  ── Technical Skills ──────────────────────────',
        '',
        '  ML/DL        PyTorch · GANs · VAEs · Transformers · NLP',
        '  Backend      Django · DRF · REST APIs · PostgreSQL',
        '  IAM          Active Directory · Windows Server · Kerberos',
        '  DevOps       Docker · Linux · Git',
        '  Creative     DaVinci Resolve · Photography',
        '',
        '  Python       ████████████████████░░  90%',
        '  PyTorch      ████████████████████░░  90%',
        '  Django       █████████████████░░░░░  85%',
        '  IAM/AD       ███████████████░░░░░░░  75%',
        '',
    ],
    experience: () => [
        '',
        '  ── Experience ─────────────────────────────────',
        '',
        '  🛡️  Paramount Computer Systems',
        '     Identity & Access Management (IAM) Intern',
        '     Feb 2026 – Present',
        '     Active Directory · Windows Server · Access Control',
        '',
        '  🤖  ML Engineering                2023 – Present',
        '     End-to-end ML pipelines, GANs, VAEs',
        '',
        '  🔬  Academic Research             2023 – Present',
        '     Deep learning research from scratch',
        '',
        '  ⚙️  Backend Development           2023 – Present',
        '     Django · DRF · Database design',
        '',
    ],
    projects: () => [
        '',
        '  ── Featured Projects ─────────────────────────',
        '',
        '  01  E-Learning Platform',
        '      AI-powered personalized learning',
        '      Django · DRF · PyTorch · PostgreSQL',
        '',
        '  02  Sketch-to-Image GAN',
        '      Generative AI for artists',
        '      PyTorch · GANs · Computer Vision',
        '',
        '  03  GradCAM Analysis',
        '      Making AI explainable',
        '      PyTorch · CNNs · XAI · Research',
        '',
        '  04  E-Commerce Platform',
        '      Scalable online marketplace',
        '      Django · REST APIs · Stripe · Redis',
        '',
    ],
    contact: () => [
        '',
        '  ── Contact ────────────────────────────────────',
        '',
        '  📧  ankit.p@paramountassure.com',
        '  🔗  linkedin.com/in/ankit-paudel',
        '  🐙  github.com/ankitpaudel07',
        '  📍  Kathmandu, Nepal',
        '',
        '  $ echo "Let\'s work together!" | mail ankit',
        '',
    ],
    education: () => [
        '',
        '  ── Education ──────────────────────────────────',
        '',
        '  🎓  BSc Computer Science & IT',
        '     Samriddhi College, Kathmandu',
        '     Expected 2026 (In Progress)',
        '',
        '  📜  Django Certification',
        '     Sipalaya Infotech',
        '     2024 – 2025 (Completed)',
        '',
    ],
    creative: () => [
        '',
        '  ── Beyond Code ────────────────────────────────',
        '',
        '  📷  Photography',
        '     Casual photographer capturing moments,',
        '     moods, and stories through the lens.',
        '',
        '  🎬  Video Editing',
        '     Color grading, cutting, and crafting',
        '     visual stories in DaVinci Resolve.',
        '',
        '  Tools: DaVinci Resolve · Color Grading',
        '         Street Photography · Landscape',
        '',
    ],
    resume: () => [
        '',
        '  Downloading resume...',
        '  ████████████████████████████ 100%',
        '',
        '  ✅ Opening Ankit_Paudel_Resume.pdf',
        '',
    ],
    socials: () => [
        '',
        '  ── Social Links ──────────────────────────────',
        '',
        '  GitHub    → github.com/ankitpaudel07',
        '  LinkedIn  → linkedin.com/in/ankit-paudel',
        '',
    ],
    whoami: () => ['', '  ankit@portfolio ~ $  You are a visitor. Welcome! 👋', ''],
    pwd: () => ['', '  /home/ankit/portfolio', ''],
    ls: () => [
        '',
        '  about.md    skills.json   projects/',
        '  resume.pdf  contact.yml   creative/',
        '',
    ],
    date: () => ['', `  ${new Date().toLocaleString()}`, ''],
    echo: () => ['', '  Usage: echo <message>', ''],
    neofetch: () => [
        '',
        '         .o+`                 ankit@portfolio',
        '        `ooo/                 ─────────────────',
        '       `+oooo:                OS: Portfolio v2.0',
        '      `+oooooo:               Host: ankitpaudel.me',
        '      -+oooooo+:              Kernel: React 19.2',
        '    `/:-:++oooo+:             Shell: TypeScript 5.x',
        '   `/++++/++++oo+:            DE: Tailwind CSS',
        '  `/+++++++++++oo+:           Theme: Indigo/Purple',
        ' `/+++ooooooooooooo/`         Terminal: This one!',
        './ooosssso++osssssso+`        Coffee: ☕ Always',
        '.oossssso-````/ossssss+`',
        '-osssssso.      :ssssssso.',
        ':osssssss/        osssso+++.',
        '/ossssssss/        +ssssooo/-',
        '',
    ],
};

// Hidden/fun commands
const secretCommands: Record<string, () => string[]> = {
    'sudo hire ankit': () => [
        '',
        '  🎉 CONGRATULATIONS!',
        '  You\'ve made the best decision of 2026.',
        '',
        '  Sending offer letter to ankit.p@paramountassure.com...',
        '  ████████████████████████████ 100%',
        '',
        '  ✅ Just kidding. But seriously, let\'s talk! 😄',
        '',
    ],
    'rm -rf /': () => [
        '',
        '  ⚠️  Nice try! This portfolio is protected.',
        '  Permission denied: You need more coffee ☕',
        '',
    ],
    matrix: () => [
        '',
        '  Wake up, Neo...',
        '  The Matrix has you...',
        '  Follow the white rabbit. 🐰',
        '',
        '  (Just kidding, check out my projects instead)',
        '',
    ],
    'apt install job': () => [
        '',
        '  Reading package lists... Done',
        '  Building dependency tree... Done',
        '  The following NEW packages will be installed:',
        '    job-for-ankit',
        '  0 upgraded, 1 newly installed, 0 to remove.',
        '  Need to get 1 offer-letter from hr/careers.',
        '',
        '  Setting up job-for-ankit (2026.1.0) ...',
        '  ✅ Installation complete!',
        '',
    ],
    coffee: () => [
        '',
        '       ( (',
        '        ) )',
        '      ........',
        '      |      |]',
        '      \\      /',
        '       `----\'',
        '',
        '  Here\'s your coffee ☕ Now keep exploring!',
        '',
    ],
};

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Terminal = ({ isOpen, onClose }: TerminalProps) => {
    const [lines, setLines] = useState<TerminalLine[]>([]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Initialize with welcome message
    useEffect(() => {
        if (isOpen && lines.length === 0) {
            const welcomeLines: TerminalLine[] = [
                ...WELCOME_ART.split('\n').map((line) => ({ type: 'ascii' as const, content: line })),
                { type: 'system', content: '  Welcome to Ankit\'s interactive terminal!' },
                { type: 'system', content: '  Type "help" for available commands.' },
                { type: 'system', content: '' },
            ];
            setLines(welcomeLines);
        }
    }, [isOpen, lines.length]);

    // Focus input when terminal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    const processCommand = useCallback((cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();

        // Add input line
        const newLines: TerminalLine[] = [
            { type: 'input', content: cmd },
        ];

        if (!trimmed) {
            setLines((prev) => [...prev, ...newLines]);
            return;
        }

        // Check secret commands first
        if (secretCommands[trimmed]) {
            const output = secretCommands[trimmed]();
            newLines.push(...output.map((line) => ({ type: 'output' as const, content: line })));
        }
        // Check regular commands
        else if (commands[trimmed]) {
            const output = commands[trimmed]();
            newLines.push(...output.map((line) => ({ type: 'output' as const, content: line })));

            // Side effects
            if (trimmed === 'resume') {
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = '/ankitt_resume.pdf';
                    link.download = 'Ankit_Paudel_Resume.pdf';
                    link.click();
                }, 800);
            }
        }
        // Handle echo with args
        else if (trimmed.startsWith('echo ')) {
            newLines.push({ type: 'output', content: `  ${cmd.slice(5)}` });
        }
        // Clear
        else if (trimmed === 'clear') {
            setLines([]);
            return;
        }
        // Exit
        else if (trimmed === 'exit' || trimmed === 'quit' || trimmed === 'q') {
            onClose();
            return;
        }
        // Unknown command
        else {
            newLines.push(
                { type: 'error', content: `  Command not found: ${trimmed}` },
                { type: 'system', content: '  Type "help" for available commands.' },
            );
        }

        setLines((prev) => [...prev, ...newLines]);
        setCommandHistory((prev) => [cmd, ...prev]);
        setHistoryIndex(-1);
    }, [onClose]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            processCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            setLines([]);
        }
    };

    // Open/close animation
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Terminal Window */}
            <div
                className={`fixed z-[100000] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl transition-all duration-300 ${isOpen
                    ? 'opacity-100 scale-100 translate-y-[-50%]'
                    : 'opacity-0 scale-95 translate-y-[-45%] pointer-events-none'
                    }`}
            >
                <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-gray-700/50">
                    {/* Title Bar */}
                    <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onClose}
                                className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors group flex items-center justify-center"
                            >
                                <X className="w-2 h-2 text-[#99201c] opacity-0 group-hover:opacity-100" />
                            </button>
                            <button className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#ff9500] transition-colors group flex items-center justify-center">
                                <Minus className="w-2 h-2 text-[#9c6e03] opacity-0 group-hover:opacity-100" />
                            </button>
                            <button className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28cd41] transition-colors group flex items-center justify-center">
                                <Square className="w-1.5 h-1.5 text-[#176b2a] opacity-0 group-hover:opacity-100" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <TerminalIcon className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">ankit@portfolio — zsh</span>
                        </div>
                        <div className="w-14" /> {/* Spacer for centering */}
                    </div>

                    {/* Terminal Body */}
                    <div
                        ref={scrollRef}
                        className="bg-[#1a1a1a] p-4 h-[60vh] max-h-[500px] overflow-y-auto font-mono text-sm leading-relaxed custom-scrollbar"
                        onClick={() => inputRef.current?.focus()}
                    >
                        {/* Lines */}
                        {lines.map((line, i) => (
                            <div key={i} className="min-h-[1.4em]">
                                {line.type === 'input' ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-400 font-semibold">ankit@portfolio</span>
                                        <span className="text-gray-500">:</span>
                                        <span className="text-blue-400 font-semibold">~</span>
                                        <span className="text-gray-500">$</span>
                                        <span className="text-gray-200 ml-1">{line.content}</span>
                                    </div>
                                ) : line.type === 'error' ? (
                                    <span className="text-red-400">{line.content}</span>
                                ) : line.type === 'ascii' ? (
                                    <span className="text-indigo-400/80">{line.content}</span>
                                ) : line.type === 'system' ? (
                                    <span className="text-gray-500">{line.content}</span>
                                ) : (
                                    <span className="text-gray-300">{line.content}</span>
                                )}
                            </div>
                        ))}

                        {/* Input Line */}
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-400 font-semibold">ankit@portfolio</span>
                            <span className="text-gray-500">:</span>
                            <span className="text-blue-400 font-semibold">~</span>
                            <span className="text-gray-500">$</span>
                            <div className="flex-1 relative ml-1">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full bg-transparent text-gray-200 outline-none caret-emerald-400 font-mono text-sm"
                                    spellCheck={false}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="bg-[#2d2d2d] px-4 py-1.5 flex items-center justify-between border-t border-gray-700/50">
                        <span className="text-[10px] text-gray-500 font-mono">Press ` or Esc to toggle</span>
                        <span className="text-[10px] text-gray-500 font-mono">↑↓ History · Ctrl+L Clear</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Terminal;
