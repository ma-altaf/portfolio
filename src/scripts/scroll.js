import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";
import Scrollbar, { ScrollbarPlugin } from "smooth-scrollbar";

class PausePlugin extends ScrollbarPlugin {
    static pluginName = "pause";

    static defaultOptions = {
        pause: false,
    };

    transformDelta(delta) {
        return this.options.pause ? { x: 0, y: 0 } : delta;
    }
}

Scrollbar.use(PausePlugin, OverscrollPlugin);

// global/helper functions
let scrollbar;

function initScrollbar() {
    scrollbar = Scrollbar.init(document.querySelector("main"), {
        damping: 0.07,
        sync: true,
    });
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
        start: [elStartOffset = 0, winStartOffset = 1] = [0, 1],
        end: [elEndOffset = 1, winEndOffset = 0] = [1, 0],
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
        (winHeight * (winStartOffset - winEndOffset)) / 2;
    const maxRatio =
        elMiddle + (winHeight * (winStartOffset - winEndOffset)) / 2;

    const ratio =
        0.5 - 0.5 * ((top + elStartMarker + elMiddle - winMiddle) / maxRatio);

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

export { scrollbar, initScrollbar, animationTrigger };
