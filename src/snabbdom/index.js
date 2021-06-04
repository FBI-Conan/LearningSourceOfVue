import h from "./mysnabbdom/h";
import patch from "./mysnabbdom/patch";

const btnEl = document.querySelector(".btn");
const container = document.getElementById("container");
const myVnode1 = h("ul", {}, [
	h("li", { key: "A" }, "A"),
	h("li", { key: "B" }, "B"),
	h("li", { key: "C" }, "C"),
	h("li", { key: "D" }, "D"),
	h("li", { key: "E" }, "E"),
]);
const myVnode2 = h("ul", {}, [
	h("li", { key: "A" }, "A"),
	h("li", { key: "B" }, "B"),
	h("li", { key: "Q" }, "Q"),
	h("li", { key: "C" }, "C"),
	h("li", { key: "D" }, "D"),
	h("li", { key: "E" }, "E"),
]);
patch(container, myVnode1);
btnEl.addEventListener("click", () => {
	patch(myVnode1, myVnode2);
});
