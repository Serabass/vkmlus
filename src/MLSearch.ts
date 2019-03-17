export class MLSearch {
  public static url = 'https://search.crintsoft.com/searchlyrics.htm';

  public static template(artist: string, title: string, page: number = 1) {
    return `<?xml version='1.0' encoding='utf-8' ?><searchV1 artist="${artist}" title="${title}" OnlyMatched="1" client="ViewLyricsOpenSearcher" RequestPage="${page}"/>`;
  };

  public static async search() {
    let response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'User-Agent': 'MiniLyrics'
      },
      body: this.template('Queen', 'The Show Must Go On'),
    });
    debugger;
  }
}