import createElement from "./createElement";
import updateChildren from "./updateChildren";
/**
 * @method patchVnode 处理oldVnode和newVnode是同一个节点(sel,key相同)的情况
 * @param {*} oldVnode
 * @param {*} newVnode
 * @returns
 */
export default function patchVnode(oldVnode, newVnode) {
	// 判断新旧vnode是否是同一个对象
	if (oldVnode === newVnode) return;
	// 判断newVnode中有没有text
	if (newVnode.text) {
		newVnode.elm = oldVnode.elm;
		if (newVnode.text === oldVnode.text) return;
		newVnode.elm.innerText = newVnode.text;
	} else {
		// newVnode没有text，意味着有children，[]也算在这种情况里面
		if (oldVnode.children && oldVnode.children.length) {
			// 老的有children，新的也有children
			updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
		} else {
			// oldVnode有text
			oldVnode.elm.innerText = "";
			// 第二种解决方案 遍历newVnode的children  然后一个一个的append进去  这种就得多次的操作DOM树  感觉不是一个好方法
			const newEl = createElement(newVnode);
			oldVnode.elm.appendChild(newEl);
		}
	}
}
