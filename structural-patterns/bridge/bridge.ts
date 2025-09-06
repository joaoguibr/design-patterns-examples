export interface Device {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    getVolume(): number;
    setVolume(volume: number): void;
    getChannel(): number;
    setChannel(channel: number): void;
}

export class TV implements Device {
    private volume: number;
    private channel: number;
    private isOn: boolean;

    constructor() {
        this.volume = 0;
        this.channel = 1;
        this.isOn = false;
    }

    isEnabled(): boolean {
        return this.isOn;
    }

    enable(): void {
        this.isOn = true;
    }

    disable(): void {
        this.isOn = false;
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(volume: number): void {
        this.volume = volume;
    }

    getChannel(): number {
        return this.channel;
    }

    setChannel(channel: number): void {
        this.channel = channel;
    }
}

export class Radio implements Device {
    private volume: number;
    private station: number;
    private isOn: boolean;

    constructor() {
        this.volume = 0;
        this.station = 1;
        this.isOn = false;
    }

    isEnabled(): boolean {
        return this.isOn;
    }

    enable(): void {
        this.isOn = true;
    }

    disable(): void {
        this.isOn = false;
    }

    getVolume(): number {
        return this.volume;
    }

    setVolume(volume: number): void {
        this.volume = volume;
    }

    getChannel(): number {
        return this.station;
    }

    setChannel(station: number): void {
        this.station = station;
    }
}

export class RemoteControl {
    protected readonly device: Device;

    constructor(device: Device) {
        this.device = device;
    }

    togglePower(): void {
        if (this.device.isEnabled()) {
            this.device.disable();
        } else {
            this.device.enable();
        }
    }

    volumeUp(): void {
        this.device.setVolume(this.device.getVolume() + 1);
    }

    volumeDown(): void {
        this.device.setVolume(this.device.getVolume() - 1);
    }

    channelUp(): void {
        this.device.setChannel(this.device.getChannel() + 1);
    }

    channelDown(): void {
        this.device.setChannel(this.device.getChannel() - 1);
    }
}

export class AdvancedRemoteControl extends RemoteControl {
    mute(): void {
        this.device.setVolume(0);
    }
}
