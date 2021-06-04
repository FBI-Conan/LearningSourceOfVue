import "./style/custom.css";
import {
	init,
	classModule,
	propsModule,
	styleModule,
	eventListenersModule,
	h,
} from "snabbdom";

// 创建出patch函数
const patch = init([
	classModule,
	propsModule,
	styleModule,
	eventListenersModule,
]);

// 创建虚拟节点
let myVnode1 = h(
	"a",
	{ props: { href: "http://www.atguigu.com", target: "_blank" } },
	"尚硅谷"
);
console.log(myVnode1);

const myVnode2 = h("div", { class: { box: true } }, "我是一个盒子");

// 嵌套使用h函数
const myVnode3 = h("ul", {}, [
	h("li", {}, "milk"),
	h("li", h("p", "coffee")),
	h("li", [h("p", "tea"), h("p", "cola")]),
]);
console.log(myVnode3);
var objk = {
	sel: "ul",
	data: {},
	children: [
		{
			sel: "li",
			data: {},
			text: "milk",
		},
		{
			sel: "li",
			data: {},
			text: "coffee",
		},
		{
			sel: "li",
			data: {},
			text: "cola",
		},
	],
};

// 让虚拟节点上树
const container = document.querySelector("#container");
// patch(container, myVnode1);
// patch(container, myVnode2);
patch(container, myVnode3);
