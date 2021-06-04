import { vnode } from "./vnode";
import patchVnode from "./patchVnode";
import createElement from "./createElement";
/**
 * @function patch 上树
 * @param {*} oldVnode 节点或者是旧的虚拟节点DOM
 * @param {*} newVnode 新的虚拟节点
 */
export default function patch(oldVnode, newVnode) {
	// 判断oldVnode是虚拟节点还是Dom节点
	if (!oldVnode.sel) {
		// DOM节点 --> 包装为虚拟节点
		oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], "", oldVnode);
	}
	// 判断oldVnode和newVnode是不是同一个虚拟节点
	if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
		patchVnode(oldVnode, newVnode);
	} else {
		// 将newVnode生成对应的新的DOM节点，未挂载
		const newEl = createElement(newVnode);
		// 挂载上树
		oldVnode.elm.parentNode.replaceChild(newEl, oldVnode.elm);
	}
}
