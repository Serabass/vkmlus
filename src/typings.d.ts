
declare class AudioPlayer {
  public stats: {
    currentPosition: number;
  }
}

declare var getAudioPlayer: () => AudioPlayer;
