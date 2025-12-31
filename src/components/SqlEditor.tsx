import { useRef } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import { Play } from 'lucide-react';

interface SqlEditorProps {
    code: string;
    onChange: (value: string | undefined) => void;
    onRun: () => void;
    isDark: boolean;
}

export function SqlEditor({ code, onChange, onRun, isDark }: SqlEditorProps) {
    const editorRef = useRef<any>(null);

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;

        // Add command to run on Ctrl+Enter / Cmd+Enter
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
            onRun();
        });
    };

    return (
        <div className="h-full flex flex-col relative group">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                    onClick={onRun}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg hover:bg-primary/90 transition-all font-medium text-sm animate-in fade-in zoom-in duration-300"
                    title="Run Query (Ctrl+Enter)"
                >
                    <Play className="w-4 h-4 fill-current" /> Run
                </button>
            </div>

            <Editor
                height="100%"
                defaultLanguage="sql"
                theme={isDark ? "vs-dark" : "light"}
                value={code}
                onChange={onChange}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 20 },
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on"
                }}
            />
        </div>
    );
}
