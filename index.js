import { Model } from "./model.js";
import { makeRender } from "./render.js";

function initialize() {
    window.MODEL = new Model();
    window.render = makeRender(window.MODEL);
    window.render();
}

initialize();
