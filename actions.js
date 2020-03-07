import { IDLE, PLAYING, RECORDING } from "./model.js";

function getUserMedia(model) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("no recording supported on this browser")
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => startRecordingWithStream(stream, model))
        .catch(err => console.error("getUserMedia failed: " + err));
}

function startRecordingWithStream(stream, model) {
    model.mediaRecorder = new MediaRecorder(stream);
    model.mediaRecorder.ondataavailable = function(e) {
        model.chunks.push(e.data);
    };

    model.mediaRecorder.onstop = event => stopRecordingStream(event, model);
    model.mediaRecorder.start();
}

function stopRecordingStream(event, model) {
    const blob = new Blob(model.chunks, { 'type' : 'audio/ogg; codecs=opus' });
    model.chunks = [];
    model.recordings.push(blob);
    render();
}

export function startRecording(event, model, render) {
    model.state = RECORDING;
    getUserMedia(model);
    render();
}

export function stopRecording(event, model, render) {
    model.state = IDLE;
    model.mediaRecorder.stop();
    render();
}

export function startPlaying(event, model, render) {
    model.state = PLAYING;
    render();
}

export function stopPlaying(event, model, render) {
    model.state = IDLE;
    render();
}
