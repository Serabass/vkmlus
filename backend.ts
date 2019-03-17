import * as md5 from "md5";
import fetch from "node-fetch";

export class Backend {
  private magicKey = Buffer.from("Mlv1clt4.0", "utf8");
  private url = "http://search.crintsoft.com/searchlyrics.htm";

  private clientUserAgent = "MiniLyrics";

  private template(artist: string, title: string, page: number = 1) {
    return `<?xml version='1.0' encoding='utf-8' standalone='yes' ?><searchV1 client=\"ViewLyricsOpenSearcher\" artist=\"${artist}\" title=\"${title}\" OnlyMatched=\"1\" />`;
  }

  private build(artist: string, title: string, page: number = 1) {
    let body = this.template(artist, title, page);
    let value = Buffer.from(body, "utf8");
    let pog = Buffer.concat([value, this.magicKey]);
    let hash = md5(pog);
    let j = 0;

    for (let i = 0; i < value.length; i++) {
      j += value[i];
    }

    let k = Math.round(j / value.length);

    for (let i = 0; i < value.length; i++) {
      value[i] = k ^ value[i];
    }

    let i = 0;
    let result = Buffer.alloc(512000);
    result.writeUInt8(0x02, i++);
    result.writeUInt32BE(k, i);
    i += 4;
    result.writeUInt8(0x04, i++);
    result.writeUInt8(0x00, i++);
    result.writeUInt8(0x00, i++);
    result.writeUInt8(0x00, i++);
  
    let rgx = /[\da-f][\da-f]/g;

    for (let ii = 0; ii < 32; ii += 2) {
      let [b] = rgx.exec(hash);
      let value = parseInt(b, 16);
      result.writeUInt8(value, i++);
    }

    value.copy(result, i, 0, value.length);
    i += value.length;
    result = result.slice(0, i);
    console.log(i, result.length);
    return value;
  }

  public async search(artist: string, title: string, page: number = 1) {
    let body = this.build(artist, title, page);
    let res = await fetch(this.url, {
      method: "POST",
      body,
      headers: {
        "User-Agent": this.clientUserAgent
      }
    });
    let text = await res.text();
    console.log(text);
  }
}
