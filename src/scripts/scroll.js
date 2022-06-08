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
    sync: true,
});

const seekThreshold = [];

for (let i = 0; i <= 1.01; i += 0.01) {
    seekThreshold.push(Math.round(i * 100) / 100);
}

// solution does not trigger in the middle of the screen
// trigger animation on intersection
const animationTrigger = (element, threshold = 1, callback) => {
    new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // element in view
                    if (typeof threshold === "object") {
                        scrollbar.addListener(listner);
                        function listner() {
                            callback(
                                ratioCalculator(element, threshold, listner)
                            );
                        }
                        listner(); // trigger the first time incase already in view
                    } else {
                        // trigger animation only once
                        callback(entry);
                        observer.unobserve(entry.target);
                    }
                }
            });
        },
        {
            threshold: typeof threshold === "object" ? 0 : threshold,
        }
    ).observe(element);
};

function ratioCalculator(
    element,
    {
        start: [elStartOffset = 0, winStartOffset = 1],
        end: [elEndOffset = 1, winEndOffset = 0],
    },
    listner
) {
    const winHeight = window.innerHeight;
    const { bottom, height: elHeight, top } = element.getBoundingClientRect();

    const elStartMarker = elStartOffset * elHeight;
    const elEndMarker = elEndOffset * elHeight;
    const elMiddle = elEndMarker - elStartMarker / 2;
    const winMiddle =
        winHeight * winEndOffset +
        (winHeight * winStartOffset - winHeight * winEndOffset) / 2;
    const maxRatio =
        elMiddle + (winHeight * winStartOffset - winHeight * winEndOffset) / 2;

    const ratio =
        Math.round(
            (0.5 -
                0.5 *
                    ((top + elStartMarker + elMiddle - winMiddle) / maxRatio)) *
                100
        ) / 100;

    // element out of view remove listner
    if (bottom <= 0) {
        scrollbar.removeListener(listner);
    }

    if (ratio < 0) {
        return 0;
    } else if (ratio > 1) {
        return 1;
    }
    return ratio;
}

export { animationTrigger };
