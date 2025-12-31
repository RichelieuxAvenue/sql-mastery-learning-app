import { useState, useEffect } from 'react';
import { sqlEngine } from '../lib/sqlEngine';
import { cn } from '../lib/utils';
import { Table as TableIcon } from 'lucide-react';

const TABLES = ['PRODUIT', 'CLIENT', 'COMMANDE', 'DETAIL'];

export function SchemaVisualizer() {
    const [activeTable, setActiveTable] = useState(TABLES[0]);
    const [data, setData] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        // Fetch table data when active table changes
        const result = sqlEngine.executeQuery(`SELECT * FROM ${activeTable}`);
        if (result.success && result.data) {
            setData(result.data);
            if (result.data.length > 0) {
                setColumns(Object.keys(result.data[0]));
            } else {
                // Fallback for empty table (hard to know columns without introspection, but seed data is populated)
                setColumns([]);
            }
        }
    }, [activeTable]);

    return (
        <div className="flex flex-col h-full bg-card">
            <div className="flex items-center gap-2 p-2 border-b bg-secondary/20 overflow-x-auto">
                <span className="text-xs font-bold text-muted-foreground uppercase mr-2 flex items-center gap-1">
                    <TableIcon className="w-3 h-3" /> Tables:
                </span>
                {TABLES.map(table => (
                    <button
                        key={table}
                        onClick={() => setActiveTable(table)}
                        className={cn(
                            "text-xs px-3 py-1.5 rounded-full transition-colors font-medium border",
                            activeTable === table
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background hover:bg-secondary text-muted-foreground border-transparent hover:border-border"
                        )}
                    >
                        {table}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-auto p-0">
                <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-secondary/30 sticky top-0 backdrop-blur-sm">
                        <tr>
                            {columns.map(col => (
                                <th key={col} className="px-3 py-2 font-semibold border-b border-r last:border-r-0 whitespace-nowrap text-muted-foreground">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="font-mono">
                        {data.map((row, i) => (
                            <tr key={i} className="border-b last:border-b-0 hover:bg-secondary/10">
                                {columns.map(col => (
                                    <td key={col} className="px-3 py-1.5 border-r last:border-r-0 whitespace-nowrap truncate max-w-[150px]">
                                        {row[col]?.toString()}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
