import { formatMoney } from "../src"; // 确保路径正确

describe("formatMoney function", () => {
  // 测试正数小数四舍五入
  describe("formatMoney 1.125 四舍五入到 2 位小数", () => {
    it("test 1.125", () => {
      expect(formatMoney(1.125)).toBe("￥1.13");
    });
  });

  describe("formatMoney 3.244 四舍五入到 2 位小数", () => {
    it("test 3.244", () => {
      expect(formatMoney(3.244)).toBe("￥3.24");
    });
  });

  // 测试整数
  describe("formatMoney 5.00", () => {
    it("test 5.00", () => {
      expect(formatMoney(5)).toBe("￥5.00");
    });
  });

  // 测试负数
  describe("formatMoney -1.125", () => {
    it("test -1.125", () => {
      expect(formatMoney(-1.125)).toBe("￥-1.13");
    });
  });

  // 测试边界值，输入为 0
  describe("formatMoney 0", () => {
    it("test 0", () => {
      expect(formatMoney(0)).toBe("￥0.00");
    });
  });

  // 测试大数值
  describe("formatMoney 123456.789", () => {
    it("test 123456.789", () => {
      expect(formatMoney(123456.789)).toBe("￥123,456.79");
    });
  });

  // 测试特殊字符输入，确保它们能打印出预期的值（如果格式化函数能够处理其他非数字输入）
  describe("formatMoney 非数字输入", () => {
    it("test non-numeric input", () => {
      // 假设函数应该返回类似的输出，这取决于您实际的 implementaion
      expect(formatMoney("abc")).toBe("￥0.00"); // 这只是一个例子
    });
  });
});
