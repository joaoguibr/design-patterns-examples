import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChatRoom, User } from './mediator';

describe('Mediator Pattern - ChatRoom', () => {
  let chatRoom: ChatRoom;
  let alice: User;
  let bob: User;
  let carol: User;

  beforeEach(() => {
    chatRoom = new ChatRoom();
    alice = new User('Alice', chatRoom);
    bob = new User('Bob', chatRoom);
    carol = new User('Carol', chatRoom);
    chatRoom.addUser(alice);
    chatRoom.addUser(bob);
    chatRoom.addUser(carol);
  });

  it('should add users to the chat room', () => {
    expect(chatRoom['users'].length).toBe(3);
    expect(chatRoom['users']).toContain(alice);
    expect(chatRoom['users']).toContain(bob);
    expect(chatRoom['users']).toContain(carol);
  });

  it('should call receive on other users when a message is sent', () => {
    const bobReceiveSpy = vi.spyOn(bob, 'receive');
    const carolReceiveSpy = vi.spyOn(carol, 'receive');
    const aliceReceiveSpy = vi.spyOn(alice, 'receive');

    alice.send('Hello, everyone!');

    expect(bobReceiveSpy).toHaveBeenCalledWith('Hello, everyone!', 'Alice');
    expect(carolReceiveSpy).toHaveBeenCalledWith('Hello, everyone!', 'Alice');
    expect(aliceReceiveSpy).not.toHaveBeenCalled();
  });

  it('should return correct receive message format', () => {
    const msg = bob.receive('Hi!', 'Alice');
    expect(msg).toBe('Bob receives from Alice: Hi!');
  });

  it('should log sending message to console', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    alice.send('Test message');
    expect(logSpy).toHaveBeenCalledWith('Alice sends: Test message');
    logSpy.mockRestore();
  });

  it('should not call receive on sender', () => {
    const aliceReceiveSpy = vi.spyOn(alice, 'receive');
    bob.send('Hey Alice!');
    expect(aliceReceiveSpy).toHaveBeenCalledWith('Hey Alice!', 'Bob');
    expect(aliceReceiveSpy).toHaveBeenCalledTimes(1);
    expect(aliceReceiveSpy).not.toHaveBeenCalledWith('Hey Alice!', 'Carol');
  });
});