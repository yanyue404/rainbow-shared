// __tests__/math.test.ts
import { add, sub, mul, div } from "../src"; // 确保路径正确

describe("Math functions", () => {
  describe("add", () => {
    it("should return the sum of two numbers", () => {
      expect(add(1, 2)).toBe(3);
    });
    it("should return 0 when adding 0", () => {
      expect(add(0, 0)).toBe(0);
    });

    it("should return the same number when adding 0", () => {
      expect(add(5, 0)).toBe(5);
      expect(add(0, 5)).toBe(5);
    });

    it("should handle negative numbers", () => {
      expect(add(-1, -1)).toBe(-2);
      expect(add(-1, 2)).toBe(1);
    });
  });

  describe("sub", () => {
    it("should return the difference of two numbers", () => {
      expect(sub(5, 2)).toBe(3);
    });

    it("should return a negative result when the first number is smaller", () => {
      expect(sub(2, 5)).toBe(-3);
    });
  });

  describe("mul", () => {
    it("should return the product of two numbers", () => {
      expect(mul(3, 4)).toBe(12);
    });

    it("should return 0 when multiplying by 0", () => {
      expect(mul(5, 0)).toBe(0);
      expect(mul(0, 5)).toBe(0);
    });
  });

  describe("div", () => {
    it("should return the quotient of two numbers", () => {
      expect(div(6, 2)).toBe(3);
    });

    it("should return a decimal result for division", () => {
      expect(div(5, 2)).toBe(2.5);
    });

    it("should throw an error when dividing by zero", () => {
      expect(() => div(5, 0)).toThrow("Cannot divide by zero");
    });
  });
});
