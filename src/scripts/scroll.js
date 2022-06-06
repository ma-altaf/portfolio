import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";
import Scrollbar, { ScrollbarPlugin } from "smooth-scrollbar";

class PausePlugin extends ScrollbarPlugin {
    static pluginName = "pause";

    static defaultOptions = {
        pause: false,
    };

    transformDelta(delta) {
        return this.options.open ? { x: 0, y: 0 } : delta;
    }
}

Scrollbar.use(PausePlugin, OverscrollPlugin);
// stop scrolling
// scrollbar.updatePluginOptions("pause", { pause: true });

// global/helper functions
const scrollbar = Scrollbar.init(document.querySelector("main"), {
    damping: 0.07,
});
