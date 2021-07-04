import parse from "./parse";
let templateString = `<div>
    <h3 class='box1 box2' id='myBox'>你好</h3>
    <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>
  </div>`;
const ast = parse(templateString);
console.log(ast);
