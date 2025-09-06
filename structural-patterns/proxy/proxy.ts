export interface Image {
    display(): string;
}

export class RealImage implements Image {
    constructor(private readonly filename: string) {
        this.loadImageFromDisk();
    }

    private loadImageFromDisk(): string {
        return `Loading ${this.filename}`;
    }

    public display(): string {
        return `Displaying ${this.filename}`;
    }
}

export class ProxyImage implements Image {
    private realImage: RealImage | null = null;
    constructor(private readonly filename: string) {}

    public display(): string {
        this.realImage ??= new RealImage(this.filename);

        return this.realImage.display();
    }
}
