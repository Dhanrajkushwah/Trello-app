import { Member } from "./member.model";

export class Workspace {
    constructor(
      public id: string,
      public name: string,
      public members: Member[],
      public inviteLink: string,
      public maxMembers: number = 10
    ) {}
  }