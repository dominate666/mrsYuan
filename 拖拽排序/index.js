let list = document.querySelector(".list");
let sourceNode;
list.ondragstart = function (e) {
  setTimeout(() => {
    e.target.classList.add("moving");
  }, 0);
  sourceNode = e.target;
};
/**
 * 排序时机:一个元素放在另一个元素的上面的时候,监听拖拽进入的事件
 *        1.进入父元素不处理
 *        2.进入自身不处理
 *        3.进入兄弟元素,交换位置
 */
// e是目标元素
list.ondragenter = function (e) {
  e.preventDefault();
  if (e.target === list || e.target === sourceNode) return;
  //   console.log(e.target);

  let children = [...list.children];
  let sourceIndex = children.indexOf(sourceNode);
  let targetIndex = children.indexOf(e.target);
  // 拖动的元素是进入到目标元素的下面还是上面
  if (sourceIndex < targetIndex) {
    console.log("下面");
    list.insertBefore(sourceNode, e.target.nextElementSibling);
  } else {
    console.log("上面");
    list.insertBefore(sourceNode, e.target);
  }
};
list.ondragover = function (e) {
  e.preventDefault();
};
// 拖拽结束
list.ondragend = function (e) {
  e.target.classList.remove("moving");
};
// 放手后元素又回到了原来的位置，浏览器的默认行为
