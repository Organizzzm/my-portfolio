export default class Vector2D {
  private x = 0;
  private y = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static distance(vec1: Vector2D, vec2: Vector2D) {
    return vec1.subtract(vec2).length();
  }

  static angleBetween(vec1: Vector2D, vec2: Vector2D) {
    return Math.acos(vec1.dotProduct(vec2) / (vec1.length() * vec2.length()));
  }

  lengthSquared() {
    return this.x * this.x + this.y * this.y;
  }

  length() {
    return Math.sqrt(this.lengthSquared());
  }

  clone() {
    return new Vector2D(this.x, this.y);
  }

  negate() {
    this.x = -this.x;
    this.y = -this.y;
  }

  normalize() {
    const length = this.length();
    if (length > 0) {
      this.x /= length;
      this.y /= length;
    }
    return this.length();
  }

  add(vec: Vector2D) {
    return new Vector2D(this.x + vec.x, this.y + vec.y);
  }

  incrementBy(vec: Vector2D) {
    this.x += vec.x;
    this.y += vec.y;
  }

  subtract(vec: Vector2D) {
    return new Vector2D(this.x - vec.x, this.y - vec.y);
  }

  decrementBy(vec: Vector2D) {
    this.x -= vec.x;
    this.y -= vec.y;
  }

  scaleBy(k: number) {
    this.x *= k;
    this.y *= k;
  }

  dotProduct(vec: Vector2D) {
    return this.x * vec.x + this.y * vec.y;
  }
}
