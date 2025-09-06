export class Logger {
    private static instance: Logger | null = null;
    private readonly _logHistory: string[] = [];

    private constructor() {}

    static getInstance(): Logger {
        Logger.instance ??= new Logger();
        return Logger.instance;
    }

    public get logHistory(): string[] {
        return this._logHistory;
    }

    public log(message: string): void {
        this._logHistory.push(message);
    }

    public clearLogHistory(): void {
        this._logHistory.length = 0;
    }

    public clearInstance(): void {
        Logger.instance = null;
    }
}
