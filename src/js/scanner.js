export default class Scanner{
  constructor(templateStr) {
    this.templateStr = templateStr;
    // 指针
    this.pos = 0;
    // 尾巴，一开始就是模板字符串原文
    this.tail = templateStr;
  }
  // 跳过指定内容，无返回值
  scan(tag) {
    if(this.tail.indexOf(tag)===0){
      this.pos += tag.length;
      this.tail = this.tail.slice(tag.length);
    }
  }
  // 让指针进行扫描，直到遇见指定内容结束，并且能够返回结束之前路过的文字
  scanUntil(stopTag) {
    // 记录一下执行本方法的时候pos的值
    const pos_start = this.pos;
    // 当尾巴不为""且尾巴的开头不是stopTag时，说明未寻找到stopTag
    while(!this.eos()&&this.tail.indexOf(stopTag)!==0) {
      this.pos++;
      this.tail = this.templateStr.slice(this.pos);
    }
    return this.templateStr.slice(pos_start, this.pos);
  }
  eos() {
    return this.tail===""
  }
}