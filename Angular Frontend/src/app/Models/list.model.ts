import { Card } from "./card.model";

export class List {
    constructor(public id: string, public name: string, public cards: Card[]) {}
  }