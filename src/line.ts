export class Line {
  public m: number;
  public s: number;
  public text: string;
  public index: number;

  constructor(src: string, index: number) {
    let rgx = /^\s*\[(\d+):(\d+\.\d+)](.*?)\s*$/;
    let [, m, s, text] = src.match(rgx);
    this.m = +m;
    this.s = +s;
    this.text = text;
    this.index = index;
  }

  get timeValue(): number {
    return (this.m * 60) + this.s;
  }
}
