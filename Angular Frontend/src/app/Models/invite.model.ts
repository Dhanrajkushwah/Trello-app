export class Invite {
    constructor(
      public id: string,
      public email: string,
      public status: 'Pending' | 'Accepted'
    ) {}
  }