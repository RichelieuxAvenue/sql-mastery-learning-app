import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { type Level } from '../data/levels';

interface TheoryPanelProps {
    level: Level;
}

export function TheoryPanel({ level }: TheoryPanelProps) {
    return (
        <div className="h-full overflow-auto p-6 prose prose-sm dark:prose-invert max-w-none">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-primary">{level.title}</h2>
                <div className="h-1 w-20 bg-primary/20 rounded-full"></div>
            </div>

            <div className="bg-card border rounded-lg p-6 shadow-sm">
                <ReactMarkdown
                    components={{
                        h1: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-4 text-foreground border-b pb-2" {...props} />,
                        code: ({ node, className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                                <div className="relative group">
                                    <code className={cn("block bg-secondary/50 p-4 rounded-lg my-4 text-sm font-mono overflow-x-auto border", className)} {...props}>
                                        {children}
                                    </code>
                                </div>
                            ) : (
                                <code className="bg-secondary px-1.5 py-0.5 rounded text-accent-foreground font-mono text-xs" {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                >
                    {level.theory}
                </ReactMarkdown>
            </div>

            <div className="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-lg">
                <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                    🚀 Mission
                </h4>
                <p className="text-foreground">
                    Lisez l'énoncé ci-dessus et écrivez votre requête SQL dans l'éditeur.
                </p>
            </div>
        </div>
    );
}
