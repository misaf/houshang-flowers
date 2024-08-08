import "./bootstrap";
import "flowbite";
// import Hls from "hls.js";

import {
    Livewire,
    Alpine,
} from "../../vendor/livewire/livewire/dist/livewire.esm";
import Clipboard from "@ryangjchandler/alpine-clipboard";

Alpine.plugin(Clipboard);

Livewire.start();

import.meta.glob([
    //'../images/**',
    //'../fonts/**',
    //'../templates/**/assets/css/**',
    "../templates/**/assets/fonts/**",
    "../templates/**/assets/images/**",
    //'../templates/**/assets/js/**',
]);

document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video");
    const videoSrc = video.getAttribute("data-src");

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSrc;
        video.addEventListener("canplay", function () {
            video.play();
        });
    }
});
