import { ID } from './type/id';

export abstract class Entity {
  constructor(private readonly id: ID) {}

  getId() {
    return this.id;
  }

  static generateNewId() {
    //TODO.
    return String(Math.random()); //
  }

  protected abstract validate(): void;

  toPlainObject() {
    const plainObj = {
      ...this,
    };
    return plainObj;
  }
}
