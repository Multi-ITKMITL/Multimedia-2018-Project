class Vector2D {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(vector) {
		return new Vector2D(this.x + vector.x, this.y + vector.y);
	}

	subtract(vector) {
		return new Vector2D(this.x - vector.x, this.y - vector.y);
	}

	multiple(scalar) {
		return new Vector2D(this.x * scalar, this.y * scalar);
	}

	dotproduct(vector) {
		return this.x * vector.x + this.y * vector.y;
	}

	angle(vector) {
		return this.dotproduct(vector) / (this.magnitude() * vector.magnitude())
	}

	magnitude() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}

	normalize() {
		let distFromOrigin = this.magnitude();
		return new Vector2D(this.x / distFromOrigin, this.y / distFromOrigin);
	}

	distance(vector) {
		return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2))
	}
}