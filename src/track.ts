import { Line } from "./line";

export class Track {
  public src: string;

  public lines: Line[];

  constructor() {
    this.src = `[00:00.00]Queen - The Show Must Go On
    [00:04.12]Inuendo 1991
    [00:07.93]
    [00:18.60]1. Empty spaces, what are we living for
    [00:24.21]Abandoned places, I guess we know the score
    [00:29.81]On and on, does anybody know what we are looking for...
    [00:38.55]Another hero, another mindless crime
    [00:44.40]Behind the curtain, in the pantomime
    [00:50.43]Hold the line, does anybody want to take it anymore
    [00:57.05]
    [00:57.48]Chorus: The show must go on
    [01:02.91]The show must go on, yeah
    [01:09.84]Inside my heart is breaking
    [01:13.42]My make-up may be flaking, but my smile still stays on
    [01:21.48]
    [01:22.72]2. Whatever happens, I'll leave it all to chance
    [01:29.71]Another heartache, another failed romance
    [01:35.64]On and on, does anybody know what we are living for
    [01:44.27]I guess I'm learning (I'm learning...) I must be warmer now (warmer...)
    [01:49.55]I'll soon be turning (turning, turning, turning), round the corner now
    [01:55.79]Outside the dawn is breaking, but inside in the dark I'm aching to be free
    [02:04.09]
    [02:05.59]Chorus: The show must go on
    [02:11.65]The show must go on, yeah, yeeah
    [02:17.44]Uuuh, inside my heart is breaking
    [02:21.63]My make-up may be flaking, but my smile still stays on
    [02:32.49]Yeeeeah, yeah
    [02:37.42]Oh-uh-oh-uh-oh, oh-uh-oh
    [02:42.32]
    [02:47.10]Bridge: My soul is painted like the wings of butterflies
    [02:53.02]Fairytales of yesterday will grow but never die
    [02:59.08]I can fly my friends
    [03:03.32]
    [03:03.70]Chorus: The show must go on (go on...), yeeeaaaah...
    [03:08.98]The show must go on (go on, go on, go on)
    [03:15.59]I'll face it with the greed
    [03:18.78]I'm never giving in, on with the show
    [03:24.96]
    [03:26.81]Solo guitar
    [03:31.62]
    [03:35.40]Uuuh, I'll top the bill, I'll overkill
    [03:39.40]I have to find the will to carry on 
    [03:42.64](On with the show, on with the show) show...
    [03:50.50](The show must go on, go on, go on, go on, go on, go on...)
    [04:00.71]By Steve Crown martircrown@gmail.com`;

    this.lines = this.src.split(/[\r\n]+/).map(function (line, i) {
      return new Line(line, i);
    });
  }

  public lineAt(time: string | number) {
    let timeValue;
    switch (typeof time) {
      case 'string':
        let rgx = /^(\d+):(\d+\.\d+)$/;
        let [, m, s] = (time as string).match(rgx);
        timeValue = (+m * 60) + +s;
        break;
      case 'number':
        timeValue = time;
        break;
    }
    return this.lines.find(function (line) {
      return line.timeValue > timeValue;
    });
  }
}
