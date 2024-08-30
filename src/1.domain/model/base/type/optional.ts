export class Optional<T> {
  private readonly value: T | null;

  private constructor(value: T) {
    this.value = value;
  }

  static of(value: any) {
    return new Optional(value);
  }

  get() {
    return this.value;
  }

  orElseThrow(fn: () => void): T {
    if (this.value) {
      return this.value;
    } else {
      fn();
    }
  }
}
