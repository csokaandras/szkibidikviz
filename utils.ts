import { Room, User, Answer, Question } from "./types";

export class App {
  private rooms: Room[] = [];

  createRoom(name: string): Room {
    let room: Room = new Room(name);

    this.rooms.push(room);

    return room;
  }

  getRooms = () => this.rooms;

  getRoom(name: string): Room {
    return this.rooms.find((room) => room.name == name);
  }

  getUser(id: string): User | null {
    this.rooms.forEach(room => {
      room.users.forEach(user => {
        if (user.id == id) return user;
      });
    });

    return null;
  }

  getUserByName(name: string): User | null {
    this.rooms.forEach(room => {
      room.users.forEach(user => {
        if (user.username == name) return user;
      });
    });

    return null;
  }

  doesRoomExist = (roomName: string) => !!this.rooms.find((item) => item.name === roomName);
}
