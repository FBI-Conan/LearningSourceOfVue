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

const vnode1 = h("ul", {}, [
	h("p", { key: "A" }, "A"),
	h("p", { key: "B" }, "B"),
	h("p", { key: "C" }, "C"),
	h("p", { key: "D" }, "D"),
]);

// vnode2在四个p标签外面加了一层section标签
const vnode2 = h("ul", {}, [
	h("section", {}, [
		h("p", { key: "A" }, "A"),
		h("p", { key: "B" }, "B"),
		h("p", { key: "C" }, "C"),
		h("p", { key: "D" }, "D"),
	]),
]);

const container = document.querySelector("#container");
patch(container, vnode1);

const btnEl = document.querySelector(".btn");
btnEl.addEventListener("click", () => {
	// 点击按钮，vnode1变为vnode2
	patch(vnode1, vnode2);
});
