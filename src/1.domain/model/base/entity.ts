import { ID } from './type/id';

export abstract class Entity {
  constructor(protected readonly id: ID) {}

  getId() {
    return this.id;
  }

  static generateNewId() {
    //TODO.
    return String(Math.random()); //
  }

  protected abstract validate(): void;

  toDTO() {
    return structuredClone(this);
  }
}
