import { describe, it, expect, vi } from 'vitest';
import { RealImage, ProxyImage } from './proxy';

describe('RealImage', () => {
    it('should display the correct filename', () => {
        const image = new RealImage('test.jpg');
        expect(image.display()).toBe('Displaying test.jpg');
    });
});

describe('ProxyImage', () => {
    it('should display the correct filename using proxy', () => {
        const proxy = new ProxyImage('proxy.jpg');
        expect(proxy.display()).toBe('Displaying proxy.jpg');
    });

    it('should create RealImage only once', () => {
        const proxy = new ProxyImage('once.jpg');
        const spy = vi.spyOn(RealImage.prototype as any, 'display');
        proxy.display();
        proxy.display();
        expect(spy).toHaveBeenCalledTimes(2);
        spy.mockRestore();
    });

    it('should lazy-load RealImage on first display', () => {
        const proxy = new ProxyImage('lazy.jpg');
        expect((proxy as any).realImage).toBeNull();
        proxy.display();
        expect((proxy as any).realImage).not.toBeNull();
    });
});
