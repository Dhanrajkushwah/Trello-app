import { List } from "./list.model";

export class Board {
    constructor(public id: string, public name: string, public lists: List[]) {}
  }