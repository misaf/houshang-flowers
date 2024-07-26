import "./bootstrap";
import "flowbite";

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
