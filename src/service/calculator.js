class CalculatorService {
  addition() {
    return this.left + this.right;
  }

  subtraction() {
    return this.left - this.right;
  }

  division() {
    return this.left / this.right;
  }

  multiplication() {
    return this.left * this.right;
  }

  remainder() {
    return this.left % this.right;
  }

  calculate(left, right, operation) {
    this.left = left;
    this.right = right;
    return this[operation]();
  }
}

export default new CalculatorService()