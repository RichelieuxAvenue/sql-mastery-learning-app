import alasql from 'alasql';
import { seedSql } from '../data/seed';

export interface QueryResult {
    success: boolean;
    data?: any[];
    error?: string;
}

export class SqlEngine {
    private dbId: string;

    constructor() {
        this.dbId = 'sql_learning_db';
        this.init();
    }

    private init() {
        // Create a new in-memory database
        alasql(`CREATE DATABASE IF NOT EXISTS ${this.dbId}`);
        alasql(`USE ${this.dbId}`);

        // Execute seed data
        // We split by ';' to execute statements one by one as alasql might prefer that for some statements
        // But alasql usually handles multiple statements. Let's try batch first.
        try {
            alasql(seedSql);
        } catch (e) {
            console.error("Seed error:", e);
            // Fallback: split by semicolon
            const statements = seedSql.split(';').filter(s => s.trim().length > 0);
            for (const stmt of statements) {
                try {
                    alasql(stmt);
                } catch (innerE) {
                    console.error("Statement error:", innerE, stmt);
                }
            }
        }
    }

    executeQuery(sql: string): QueryResult {
        try {
            alasql(`USE ${this.dbId}`);
            // Catch forbidden commands? (For now, allow anything)
            const data = alasql(sql);
            return { success: true, data: data as any[] };
        } catch (e: any) {
            return { success: false, error: e.message || String(e) };
        }
    }

    reset() {
        alasql(`DROP DATABASE IF EXISTS ${this.dbId}`);
        this.init();
    }

    /**
     * Checks if the user's query result matches the expected query result.
     * We run both against the current DB state.
     * actually, running the expected query might return different data if the user modified the DB.
     * So we should probably run them on a FRESH instance or transaction?
     * For simplicity, read-only levels are easiest. For DML (update/delete), we might need to reset before grading.
     */
    checkAnswer(userSql: string, expectedSql: string): boolean {
        try {
            // Run expected query
            const expectedRes = this.executeQuery(expectedSql);
            // Run user query
            const userRes = this.executeQuery(userSql);

            if (!expectedRes.success || !userRes.success) return false;

            // Compare JSON
            return JSON.stringify(expectedRes.data) === JSON.stringify(userRes.data);
        } catch (e) {
            return false;
        }
    }
}

export const sqlEngine = new SqlEngine();
