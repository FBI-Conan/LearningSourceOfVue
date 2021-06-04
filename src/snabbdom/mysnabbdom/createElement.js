/**
 * @function createElement 根据虚拟节点生成的新的Dom节点
 * @param {*} vnode
 */
export default function createElement(vnode) {
	const newEl = document.createElement(vnode.sel);
	if (vnode.text) newEl.innerText = vnode.text;
	vnode.elm = newEl;
	if (vnode.children && vnode.children.length) {
		vnode.children.forEach(childVnode => {
			newEl.appendChild(createElement(childVnode));
		});
	}
	return newEl;
}
