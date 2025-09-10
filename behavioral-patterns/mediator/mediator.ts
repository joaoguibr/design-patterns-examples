export interface ChatMediator {
  sendMessage(message: string, user: User): void;
  addUser(user: User): void;
}

export class User {
  constructor(public name: string, private readonly mediator: ChatMediator) {}

  send(message: string): void {
    console.log(`${this.name} sends: ${message}`);
    this.mediator.sendMessage(message, this);
  }

  receive(message: string, from: string): string {
    return `${this.name} receives from ${from}: ${message}`;
  }
}

export class ChatRoom implements ChatMediator {
  private readonly users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  sendMessage(message: string, user: User): void {
    this.users.forEach((u) => {
      if (u !== user) {
        u.receive(message, user.name);
      }
    });
  }
}
