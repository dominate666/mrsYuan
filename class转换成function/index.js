/**
 * 1.严格模式
 * 2.只能通过new调用
 * 3.方法不能被枚举
 * 4.方法func不能被new（new Example.prototype.func()）
 */
class Example {
  constructor(name) {
    this.name = name;
  }
  func() {
    console.log(this.name);
  }
}

new Example.prototype.func();
