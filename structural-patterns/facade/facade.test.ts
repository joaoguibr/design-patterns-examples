import { describe, it, expect, beforeEach } from 'vitest';
import { TV, DVDPlayer, SoundSystem, HomeTheaterFacade } from './facade';

describe('TV', () => {
    let tv: TV;

    beforeEach(() => {
        tv = new TV();
    });

    it('should be off by default', () => {
        expect(tv.isOn).toBe(false);
    });

    it('should turn on', () => {
        tv.turnOn();
        expect(tv.isOn).toBe(true);
    });

    it('should turn off', () => {
        tv.turnOn();
        tv.turnOff();
        expect(tv.isOn).toBe(false);
    });
});

describe('DVDPlayer', () => {
    let dvd: DVDPlayer;

    beforeEach(() => {
        dvd = new DVDPlayer();
    });

    it('should be off by default', () => {
        expect(dvd.isOn).toBe(false);
    });

    it('should turn on', () => {
        dvd.turnOn();
        expect(dvd.isOn).toBe(true);
    });

    it('should turn off', () => {
        dvd.turnOn();
        dvd.turnOff();
        expect(dvd.isOn).toBe(false);
    });

    it('should not play movie when off', () => {
        expect(dvd.play('Matrix')).toBe('DVD Player is off');
    });

    it('should play movie when on', () => {
        dvd.turnOn();
        expect(dvd.play('Matrix')).toBe('Playing Matrix');
    });
});

describe('SoundSystem', () => {
    let sound: SoundSystem;

    beforeEach(() => {
        sound = new SoundSystem();
    });

    it('should be off by default', () => {
        expect(sound.isOn).toBe(false);
    });

    it('should turn on', () => {
        sound.turnOn();
        expect(sound.isOn).toBe(true);
    });

    it('should turn off', () => {
        sound.turnOn();
        sound.turnOff();
        expect(sound.isOn).toBe(false);
    });

    it('should have default volume 5', () => {
        expect(sound.volume).toBe(5);
    });

    it('should not raise volume when off', () => {
        expect(sound.raiseVolume()).toBe('Sound System is off');
    });

    it('should raise volume when on', () => {
        sound.turnOn();
        expect(sound.raiseVolume()).toBe('Setting volume to 10');
        expect(sound.volume).toBe(10);
    });

    it('should not lower volume when off', () => {
        expect(sound.lowerVolume()).toBe('Sound System is off');
    });

    it('should lower volume when on', () => {
        sound.turnOn();
        expect(sound.lowerVolume()).toBe('Setting volume to 0');
        expect(sound.volume).toBe(0);
    });
});

describe('HomeTheaterFacade', () => {
    let tv: TV;
    let dvd: DVDPlayer;
    let sound: SoundSystem;
    let facade: HomeTheaterFacade;

    beforeEach(() => {
        tv = new TV();
        dvd = new DVDPlayer();
        sound = new SoundSystem();
        facade = new HomeTheaterFacade(tv, dvd, sound);
    });

    it('should turn on all devices and play movie', () => {
        const result = facade.watchMovie('Inception');
        expect(tv.isOn).toBe(true);
        expect(dvd.isOn).toBe(true);
        expect(sound.isOn).toBe(true);
        expect(sound.volume).toBe(10);
        expect(result).toBe('Playing Inception');
    });

    it('should turn off all devices and end movie', () => {
        facade.watchMovie('Inception');
        const result = facade.endMovie();
        expect(tv.isOn).toBe(false);
        expect(dvd.isOn).toBe(false);
        expect(sound.isOn).toBe(false);
        expect(result).toBe('Movie ended.');
    });
});