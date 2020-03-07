import { IDLE, PLAYING, RECORDING } from "./model.js";
import * as actions from "./actions.js";
import assert from "./assert.js";

const CONTAINER = document.getElementById("container");

export function makeRender(model) {
    const recordButton = document.createElement("button");
    recordButton.textContent = "record";
    recordButton.addEventListener("click", event => actions.startRecording(event, model, render));

    const stopRecordingButton = document.createElement("button");
    stopRecordingButton.textContent = "stop recording";
    stopRecordingButton.addEventListener("click", event => actions.stopRecording(event, model, render));

    const playButton = document.createElement("button");
    playButton.textContent = "play";
    playButton.addEventListener("click", event => actions.startPlaying(event, model, render));

    const stopPlayingButton = document.createElement("button");
    stopPlayingButton.textContent = "stop playing";
    stopPlayingButton.addEventListener("click", event => actions.stopPlaying(event, model, render));

    function render() {
        CONTAINER.textContent = "";

        switch (model.state) {
        case IDLE:
            renderIdle(model);
            break;
        case RECORDING:
            renderRecording(model);
            break;
        case PLAYING:
            renderPlaying(model);
            break;
        default:
            throw new Error("Unknown state: " + model.state);
        }
        renderRecordingList(model);
    }
    return render;

    function renderRecordingList(model) {
        for (let recording of model.recordings) {
            const audio = document.createElement('audio');
            audio.setAttribute('controls', '');
            audio.controls = true;
            const audioURL = window.URL.createObjectURL(recording);
            audio.src = audioURL;
            CONTAINER.appendChild(audio);
        }
    }

    function renderIdle(model) {
        assert(model.state === IDLE, "Model state should be IDLE but is " + model.state);

        CONTAINER.appendChild(recordButton);
        recordButton.disabled = false;
    }

    function renderRecording(model) {
        assert(model.state === RECORDING, "Model state should be RECORDING but is " + model.state);

        CONTAINER.appendChild(stopRecordingButton);
        stopRecordingButton.disabled = false;
    }

    function renderPlaying(model) {
        assert(model.state === PLAYING, "Model state should be PLAYING but is " + model.state);

        CONTAINER.appendChild(recordButton);
        recordButton.disabled = true;
    }

}
