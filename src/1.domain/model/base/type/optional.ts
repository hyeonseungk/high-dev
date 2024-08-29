export class Optional<T> {
  private readonly value: T | null;

  constructor(value: T) {
    this.value = value;
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
