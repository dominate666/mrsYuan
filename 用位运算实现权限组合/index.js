/* const READ==1;
const WRITE==2;
const UPDATE==3;
const DELETE==4; */
// js中ob开头表示后边书写的数字呢是二进制格式
// 有1的地方表示有相关权限
// React的Lane模型使用到了这个技巧
const READ = 0b1; // 0001
const WRITE = 0b10; // 0010
const UPDATE = 0b100; // 0100
const DELETE = 0b1000; //1000
// console.log(0b1101); // 13
const xxx = READ | WRITE | DELETE; //(|表示有1则为1)

// 后端返回了一个数字13，我如何判断是否有可读权限
const n = 13;
const hasRead = n & READ;
// console.log(hasRead);

// 权限切换(eg:删除权限有的话就去掉，没有的话就加上)
const toggle = n ^ DELETE;
console.log(toggle);
