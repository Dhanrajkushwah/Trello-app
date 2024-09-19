export class Member {
    constructor(
      public id: string,
      public name: string,
      public email: string,
      public role: 'Admin' | 'Member',
      public lastActive: Date
    ) {}
  }