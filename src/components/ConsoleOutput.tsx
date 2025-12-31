import { type QueryResult } from '../lib/sqlEngine';

interface ConsoleOutputProps {
    result: QueryResult | null;
}

export function ConsoleOutput({ result }: ConsoleOutputProps) {
    if (!result) {
        return (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm italic">
                Exécutez une requête pour voir le résultat ici...
            </div>
        );
    }

    if (!result.success) {
        return (
            <div className="p-4 text-destructive font-mono text-sm">
                Error: {result.error}
            </div>
        );
    }

    const data = result.data || [];
    if (data.length === 0) {
        return (
            <div className="p-4 text-muted-foreground font-mono text-sm">
                Requête exécutée avec succès. Aucun résultat retourné.
            </div>
        );
    }

    const columns = Object.keys(data[0]);

    return (
        <div className="h-full overflow-auto">
            <table className="w-full text-sm text-left border-collapse">
                <thead className="text-xs uppercase bg-secondary/50 sticky top-0">
                    <tr>
                        {columns.map((col) => (
                            <th key={col} className="px-4 py-2 font-medium text-muted-foreground border-b border-r last:border-r-0 whitespace-nowrap">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="font-mono">
                    {data.map((row: any, i: number) => (
                        <tr key={i} className="border-b last:border-b-0 hover:bg-secondary/20">
                            {columns.map((col) => (
                                <td key={col} className="px-4 py-2 border-r last:border-r-0 whitespace-nowrap">
                                    {row[col]?.toString() ?? <span className="text-muted-foreground italic">NULL</span>}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
