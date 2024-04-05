"use strict";
// 转换
function Example(name) {
  if (!new.target) {
    throw new TypeError(
      "Class constructor Example cannot be invoked without 'new'"
    );
  }
  this.name = name;
}
Object.defineProperty(Example.prototype, "func", {
  value: function () {
    if (new.target) {
      throw new TypeError("Example.prototype.func is not a constructor");
    }
    console.log(this.name);
  },
  enumerable: false,
});

let m = new Example("lisi");
for (let key in m) {
  console.log(key);
}
