export const IDLE = "IDLE";
export const PLAYING = "PLAYING";
export const RECORDING = "RECORDING";

export class Model {
    constructor() {
        this.state = IDLE;
        this.mediaRecorder = null;
        this.chunks = [];
        this.recordings = [];
    }
}
