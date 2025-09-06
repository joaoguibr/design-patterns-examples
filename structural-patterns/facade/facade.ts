export class TV {
    private _isOn: boolean = false;

    turnOn(): void {
        this._isOn = true;
    }

    turnOff(): void {
        this._isOn = false;
    }

    get isOn(): boolean {
        return this._isOn;
    }
}

export class DVDPlayer {
    private _isOn: boolean = false;

    turnOn(): void {
        this._isOn = true;
    }

    turnOff(): void {
        this._isOn = false;
    }

    play(movie: string): string {
        if (!this._isOn) return 'DVD Player is off';

        return `Playing ${movie}`;
    }

    get isOn(): boolean {
        return this._isOn;
    }
}

export class SoundSystem {
    private _isOn: boolean = false;
    private _volume: number = 5;

    turnOn(): void {
        this._isOn = true;
    }

    turnOff(): void {
        this._isOn = false;
    }

    get isOn(): boolean {
        return this._isOn;
    }

    get volume(): number {
        return this._volume;
    }

    raiseVolume(): string {
        if (!this._isOn) return 'Sound System is off';

        this._volume += 5;

        return `Setting volume to ${this._volume}`;
    }

    lowerVolume(): string {
        if (!this._isOn) return 'Sound System is off';

        this._volume -= 5;

        return `Setting volume to ${this._volume}`;
    }
}

export class HomeTheaterFacade {
    private readonly tv: TV;
    private readonly dvdPlayer: DVDPlayer;
    private readonly soundSystem: SoundSystem;

    constructor(tv: TV, dvdPlayer: DVDPlayer, soundSystem: SoundSystem) {
        this.tv = tv;
        this.dvdPlayer = dvdPlayer;
        this.soundSystem = soundSystem;
    }

    watchMovie(movie: string): string {
        this.tv.turnOn();
        this.dvdPlayer.turnOn();
        this.soundSystem.turnOn();

        this.soundSystem.raiseVolume();

        return this.dvdPlayer.play(movie);
    }

    endMovie(): string {
        this.tv.turnOff();
        this.dvdPlayer.turnOff();
        this.soundSystem.turnOff();

        return 'Movie ended.';
    }
}
