import { useState, useEffect } from 'react';
import { Panel, Group, Separator } from 'react-resizable-panels';
import { Navbar } from './components/Navbar';
import { TheoryPanel } from './components/TheoryPanel';
import { SqlEditor } from './components/SqlEditor';
import { ConsoleOutput } from './components/ConsoleOutput';
import { SchemaVisualizer } from './components/SchemaVisualizer';
import { levels } from './data/levels';
import { sqlEngine, type QueryResult } from './lib/sqlEngine';

export default function App() {
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Initialize dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const currentLevel = levels.find(l => l.id === currentLevelId) || levels[0];

  useEffect(() => {
    // Reset code when level changes? Or keep it?
    // Usually reset to blank or a starter template
    setCode('SELECT * FROM ... -- Écrivez votre requête ici');
    setResult(null);
  }, [currentLevelId]);

  const handleRun = () => {
    // Run the query
    const res = sqlEngine.executeQuery(code);
    setResult(res);

    // Check if correct
    if (res.success) {
      // Run grading logic
      // We check against ALL valid expected SQLs.
      // But better: use the results-based check from the plan
      let isCorrect = false;
      for (const expected of currentLevel.expectedSql) {
        if (sqlEngine.checkAnswer(code, expected)) {
          isCorrect = true;
          break;
        }
      }

      if (isCorrect) {
        // Show success (simple alert for now, can be a modal later)
        // setTimeout to let the React render the table first
        setTimeout(() => {
          alert("🎉 Bravo ! Réponse correcte. Passage au niveau suivant !");
          if (currentLevelId < levels.length) {
            setCurrentLevelId(id => id + 1);
          }
        }, 500);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden">
      <Navbar
        currentLevel={currentLevel}
        totalLevels={levels.length}
        onLevelChange={setCurrentLevelId}
        isDark={isDark}
        toggleTheme={() => setIsDark(!isDark)}
      />

      <div className="flex-1 overflow-hidden">
        <Group orientation="horizontal" className="h-full w-full">
          {/* Left Side: Theory & Schema */}
          <Panel defaultSize={40} minSize={20}>
            <Group orientation="vertical" className="h-full w-full">
              <Panel defaultSize={60} minSize={30}>
                <TheoryPanel level={currentLevel} />
              </Panel>
              <Separator className="h-2 bg-border hover:bg-primary/20 transition-colors" />
              <Panel defaultSize={40} minSize={20}>
                <SchemaVisualizer />
              </Panel>
            </Group>
          </Panel>

          <Separator className="w-2 bg-border hover:bg-primary/20 transition-colors" />

          {/* Right Side: Editor & Console */}
          <Panel defaultSize={60} minSize={30}>
            <Group orientation="vertical" className="h-full w-full">
              <Panel defaultSize={60} minSize={30}>
                <SqlEditor
                  code={code}
                  onChange={(val) => setCode(val || '')}
                  onRun={handleRun}
                  isDark={isDark}
                />
              </Panel>
              <Separator className="h-2 bg-border hover:bg-primary/20 transition-colors" />
              <Panel defaultSize={40} minSize={10} className="bg-card">
                <ConsoleOutput result={result} />
              </Panel>
            </Group>
          </Panel>
        </Group>
      </div>
    </div>
  );
}
