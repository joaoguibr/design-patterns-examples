import { describe, it, expect } from 'vitest';
import { TV, Radio, RemoteControl, AdvancedRemoteControl } from './bridge';

describe('TV', () => {
    it('initial state', () => {
        const tv = new TV();
        expect(tv.isEnabled()).toBe(false);
        expect(tv.getVolume()).toBe(0);
        expect(tv.getChannel()).toBe(1);
    });

    it('enable/disable directly', () => {
        const tv = new TV();
        tv.enable();
        expect(tv.isEnabled()).toBe(true);
        tv.disable();
        expect(tv.isEnabled()).toBe(false);
    });
});

describe('Radio', () => {
    it('initial state', () => {
        const radio = new Radio();
        expect(radio.isEnabled()).toBe(false);
        expect(radio.getVolume()).toBe(0);
        expect(radio.getChannel()).toBe(1);
    });

    it('enable/disable directly', () => {
        const radio = new Radio();
        radio.enable();
        expect(radio.isEnabled()).toBe(true);
        radio.disable();
        expect(radio.isEnabled()).toBe(false);
    });
});

describe('RemoteControl with TV', () => {
    it('toggles power', () => {
        const tv = new TV();
        const remote = new RemoteControl(tv);

        expect(tv.isEnabled()).toBe(false);
        remote.togglePower();
        expect(tv.isEnabled()).toBe(true);
        remote.togglePower();
        expect(tv.isEnabled()).toBe(false);
    });

    it('controls volume (can go negative)', () => {
        const tv = new TV();
        const remote = new RemoteControl(tv);

        expect(tv.getVolume()).toBe(0);
        remote.volumeUp();
        expect(tv.getVolume()).toBe(1);
        remote.volumeDown();
        expect(tv.getVolume()).toBe(0);
        remote.volumeDown();
        expect(tv.getVolume()).toBe(-1);
    });

    it('controls channel', () => {
        const tv = new TV();
        const remote = new RemoteControl(tv);

        expect(tv.getChannel()).toBe(1);
        remote.channelUp();
        expect(tv.getChannel()).toBe(2);
        remote.channelDown();
        expect(tv.getChannel()).toBe(1);
        remote.channelDown();
        expect(tv.getChannel()).toBe(0);
    });
});

describe('RemoteControl with Radio', () => {
    it('toggles power', () => {
        const radio = new Radio();
        const remote = new RemoteControl(radio);

        expect(radio.isEnabled()).toBe(false);
        remote.togglePower();
        expect(radio.isEnabled()).toBe(true);
        remote.togglePower();
        expect(radio.isEnabled()).toBe(false);
    });

    it('controls volume (can go negative)', () => {
        const radio = new Radio();
        const remote = new RemoteControl(radio);

        expect(radio.getVolume()).toBe(0);
        remote.volumeUp();
        expect(radio.getVolume()).toBe(1);
        remote.volumeDown();
        expect(radio.getVolume()).toBe(0);
        remote.volumeDown();
        expect(radio.getVolume()).toBe(-1);
    });

    it('controls channel (station)', () => {
        const radio = new Radio();
        const remote = new RemoteControl(radio);

        expect(radio.getChannel()).toBe(1);
        remote.channelUp();
        expect(radio.getChannel()).toBe(2);
        remote.channelDown();
        expect(radio.getChannel()).toBe(1);
    });
});

describe('AdvancedRemoteControl', () => {
    it('mutes volume', () => {
        const tv = new TV();
        const advancedRemote = new AdvancedRemoteControl(tv);

        // set some volume
        tv.setVolume(10);
        expect(tv.getVolume()).toBe(10);

        advancedRemote.mute();
        expect(tv.getVolume()).toBe(0);
    });

    it('inherits base controls', () => {
        const radio = new Radio();
        const advancedRemote = new AdvancedRemoteControl(radio);

        expect(radio.isEnabled()).toBe(false);
        advancedRemote.togglePower();
        expect(radio.isEnabled()).toBe(true);

        expect(radio.getChannel()).toBe(1);
        advancedRemote.channelUp();
        expect(radio.getChannel()).toBe(2);
    });
});