import { Moon, Sun, Database, ChevronLeft, ChevronRight } from 'lucide-react';
import { type Level } from '../data/levels';

interface NavbarProps {
    currentLevel: Level;
    totalLevels: number;
    onLevelChange: (id: number) => void;
    isDark: boolean;
    toggleTheme: () => void;
}

export function Navbar({ currentLevel, totalLevels, onLevelChange, isDark, toggleTheme }: NavbarProps) {
    return (
        <nav className="h-14 border-b flex items-center justify-between px-4 bg-background">
            <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                    <Database className="w-5 h-5 text-primary" />
                </div>
                <span className="font-bold text-lg hidden sm:inline-block">SQL Master</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-md">
                    <button
                        onClick={() => onLevelChange(currentLevel.id - 1)}
                        disabled={currentLevel.id === 1}
                        className="p-1 hover:bg-background rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium w-32 text-center truncate">
                        {currentLevel.id}. {currentLevel.title}
                    </span>
                    <button
                        onClick={() => onLevelChange(currentLevel.id + 1)}
                        disabled={currentLevel.id === totalLevels}
                        className="p-1 hover:bg-background rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={toggleTheme}
                    className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>
        </nav>
    );
}
