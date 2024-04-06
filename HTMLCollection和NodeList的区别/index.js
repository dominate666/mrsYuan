/**
 * HTMLCollection  实时的,始终跟当前页面上的元素是挂钩的
 * document.getElementsByClassName()
 * document.getElementsByTagName()
 */
/* let list = document.getElementsByClassName("list")[0];
let lis = document.getElementsByClassName("list-item"); */
let list = document.querySelectorAll(".list")[0];
let lis = document.querySelectorAll(".list-item");

let btn = document.getElementById("btn");
btn.onclick = () => {
  for (let i = 0; i < lis.length; i++) {
    const cloned = lis[i].cloneNode(true);
    list.appendChild(cloned);
  }
};
