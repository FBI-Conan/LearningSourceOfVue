/**
 * 把传入的对象返回
 * @param {*} sel
 * @param {*} data
 * @param {*} children
 * @param {*} text
 * @param {*} elm
 * @returns
 */
export function vnode(sel, data, children, text, elm) {
	const key = data.key;
	return {
		sel,
		data,
		children,
		text,
		elm,
		key,
	};
}
