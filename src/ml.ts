import { raf } from "./raf-promise";
import { Track } from "./track";

export class ML {
  public static factory() {
    return new ML();
  }

  public track: Track;

  public audioPlayer: AudioPlayer;

  public div: HTMLDivElement;
  public textContainer: HTMLDivElement;

  public offsetDiv: HTMLDivElement;
  public offsetAdd: HTMLButtonElement;
  public offsetSub: HTMLButtonElement;

  public offset = 0;

  constructor() {
    this.audioPlayer = getAudioPlayer();

    this.div = document.createElement("div");
    this.div.style.width = `${window.screen.width}px`;
    this.div.style.height = "70px";
    this.div.style.position = "fixed";
    this.div.style.bottom = "0px";
    this.div.style.textAlign = "center";
    this.div.style.color = "red";
    document.body.appendChild(this.div);

    this.textContainer = document.createElement("div");
    this.textContainer.style.textAlign = "center";
    this.div.appendChild(this.textContainer);

    this.offsetAdd = document.createElement("button");
    this.div.appendChild(this.offsetAdd);

    this.offsetAdd.addEventListener('click', () => {
      this.offset++;
    })

    this.offsetSub = document.createElement("button");
    this.div.appendChild(this.offsetSub);

    this.offsetSub.addEventListener('click', () => {
      this.offset--;
    })

    this.offsetAdd.innerHTML = "+";
    this.offsetSub.innerHTML = "-";

    this.offsetDiv = document.createElement("div");
    this.div.appendChild(this.offsetDiv);

    this.track = new Track();
  }

  public async draw(): Promise<void> {
    let line = this.track.lineAt(this.audioPlayer.stats.currentPosition + this.offset);
    this.offsetDiv.innerHTML = `${this.audioPlayer.stats.currentPosition} | ${this.offset}`;

    if (this.textContainer.innerHTML != line.text) {
      this.textContainer.innerHTML = line.text;
    }

    await raf();
    this.draw();
  }
}
