var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/renderers/SimpleRenderer", "esri/widgets/Home", "esri/widgets/Expand", "esri/widgets/Zoom", "esri/widgets/Legend", "esri/widgets/Fullscreen", "../widgets/Header", "../widgets/CityStats", "../widgets/IconButton", "esri/symbols", "esri/renderers/visualVariables/OpacityVariable", "esri/renderers/visualVariables/ColorVariable"], function (require, exports, Map, MapView, FeatureLayer, SimpleRenderer, Home, Expand, Zoom, Legend, FullScreen, Header_1, CityStats_1, IconButton_1, symbols_1, OpacityVariable, ColorVariable) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var map;
    var view;
    var layer;
    var cityStats;
    var animation = null;
    var applicationDiv = document.getElementById("applicationDiv");
    var slider = document.getElementById("slider");
    var sliderValue = document.getElementById("sliderValue");
    var playButton = document.getElementById("playButton");
    var titleDiv = document.getElementById("titleDiv");
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        // When user drags the slider:
        //  - stops the animation
        //  - set the visualized year to the slider one.
        function inputHandler() {
            stopAnimation();
            setYear(parseInt(slider.value));
        }
        /**
         * Sets the current visualized construction year.
         */
        function setYear(value) {
            sliderValue.innerHTML = "" + Math.floor(value);
            slider.value = "" + Math.floor(value);
            layer.renderer = createRenderer(value);
            cityStats.year = value;
        }
        var header, zoom, home, legend, bookmark1, bookmark2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /**********************
                     * Setup Map and View
                     **********************/
                    layer = new FeatureLayer({
                        portalItem: {
                            id: "dfe2d606134546f5a712e689d76540ac"
                        },
                        definitionExpression: "CNSTRCT_YR > 0",
                        title: "Building Footprints",
                        minScale: 72223.819286,
                        popupTemplate: undefined,
                        outFields: [
                            "HEIGHTROOF",
                            "NUM_FLOORS",
                            "CNSTRCT_YR",
                            "GROUNDELEV"
                        ]
                    });
                    map = new Map({
                        basemap: "dark-gray-vector",
                        layers: [layer]
                    });
                    window["view"] = view = new MapView({
                        map: map,
                        container: "viewDiv",
                        center: [-74.011219, 40.705191],
                        zoom: 15,
                        constraints: {
                            minScale: 72223.819286
                        }
                    });
                    view.ui.empty("top-left");
                    return [4 /*yield*/, view.when()];
                case 1:
                    _a.sent();
                    slider.addEventListener("input", inputHandler);
                    slider.addEventListener("change", inputHandler);
                    // Toggle animation on/off when user
                    // clicks on the play button
                    playButton.addEventListener("click", function () {
                        if (playButton.classList.contains("toggled")) {
                            stopAnimation();
                        }
                        else {
                            startAnimation();
                        }
                    });
                    header = new Header_1.default({
                        title: "New York Construction",
                        actionContent: [
                            new FullScreen({
                                view: view,
                                element: applicationDiv
                            })
                        ]
                    });
                    zoom = new Zoom({
                        view: view,
                        layout: "horizontal"
                    });
                    home = new Home({
                        view: view
                    });
                    legend = new Legend({
                        view: view
                    });
                    view.ui.add(header);
                    view.ui.add(zoom, "bottom-left");
                    view.ui.add(home, "bottom-left");
                    view.ui.add(new Expand({ view: view, content: legend }), "bottom-right");
                    bookmark1 = new IconButton_1.default({
                        title: "Manhattan",
                        action: function () {
                            view.goTo({
                                center: [-74.011218, 40.705190],
                                scale: 9027.977411
                            }, {
                                duration: 2000,
                                easing: "ease-in-out"
                            });
                        }
                    });
                    bookmark2 = new IconButton_1.default({
                        title: "New York",
                        action: function () {
                            view.goTo({
                                center: [-73.971278, 40.708108],
                                scale: 36111.909643
                            }, {
                                duration: 2000,
                                easing: "ease-in-out"
                            });
                        }
                    });
                    view.ui.add(bookmark1, "bottom-left");
                    view.ui.add(bookmark2, "bottom-left");
                    /**********************
                     * Stats
                     **********************/
                    cityStats = new CityStats_1.default({
                        view: view,
                        layer: layer,
                    });
                    view.ui.add(new Expand({
                        view: view,
                        content: cityStats
                    }), "bottom-right");
                    /**********************
                     * Interactivity
                     **********************/
                    view.whenLayerView(layer).then(setupHoverTooltip);
                    setYear(1890);
                    return [2 /*return*/];
            }
        });
    }); })();
    /**
     * Starts the animation that cycle
     * through the construction years.
     */
    function startAnimation() {
        stopAnimation();
        animation = animate(parseFloat(slider.value));
        playButton.classList.add("toggled");
    }
    /**
     * Stops the animations
     */
    function stopAnimation() {
        if (!animation) {
            return;
        }
        animation.remove();
        animation = null;
        playButton.classList.remove("toggled");
    }
    /**
     * Returns a renderer with a color visual variable driven by the input
     * year. The selected year will always render buildings built in that year
     * with a light blue color. Buildings built 20+ years before the indicated
     * year are visualized with a pink color. Buildings built within that
     * 20-year time frame are assigned a color interpolated between blue and pink.
     */
    function createRenderer(year) {
        return new SimpleRenderer({
            symbol: new symbols_1.SimpleFillSymbol({
                color: "rgb(0, 0, 0)",
                outline: null
            }),
            visualVariables: [new OpacityVariable({
                    field: "CNSTRCT_YR",
                    stops: [{
                            opacity: 1,
                            value: year
                        },
                        {
                            opacity: 0,
                            value: year + 1
                        }],
                    legendOptions: {
                        showLegend: false
                    }
                }), new ColorVariable({
                    field: "CNSTRCT_YR",
                    legendOptions: {
                        title: "Built:"
                    },
                    stops: [{
                            value: year,
                            color: "#0ff",
                            // color: [189,0,38,255],
                            label: "in " + Math.floor(year)
                        }, {
                            value: year - 10,
                            color: "#f0f",
                            // color: [253,141,60,255],
                            label: "in " + (Math.floor(year) - 20)
                        }, {
                            value: year - 50,
                            color: "#404",
                            // color: [255, 255, 178, 100],
                            label: "before " + (Math.floor(year) - 50)
                        }]
                })]
        });
    }
    /**
     * Sets up a moving tooltip that displays
     * the construction year of the hovered building.
     */
    function setupHoverTooltip(layerview) {
        var tooltip = createTooltip();
        var highlight = null;
        view.on("pointer-move", function (event) {
            var hit = view
                .hitTest({
                x: event.x,
                y: event.y
            })
                .then(function (hit) {
                // remove current highlighted feature
                if (highlight) {
                    highlight.remove();
                    highlight = null;
                }
                var results = hit.results.filter(function (result) {
                    return result.type === "graphic" && result.graphic.layer === layer;
                });
                // highlight the hovered feature
                // or hide the tooltip
                if (results.length) {
                    var graphic = results[0].graphic;
                    // building not yet built
                    if (graphic.attributes["CNSTRCT_YR"] >= cityStats.year) {
                        tooltip.hide();
                        return;
                    }
                    highlight = layerview.highlight(graphic);
                    tooltip.show(event, "Built in " + graphic.getAttribute("CNSTRCT_YR"));
                }
                else {
                    tooltip.hide();
                }
            });
        });
    }
    /**
     * Sets the current visualized construction year.
     */
    function setYear(value) {
        sliderValue.innerHTML = "" + Math.floor(value);
        slider.value = "" + Math.floor(value);
        layer.renderer = createRenderer(value);
        cityStats.year = value;
    }
    /**
     * Animates the color visual variable continously
     */
    function animate(startValue) {
        var animating = true;
        var value = startValue;
        var frame = function () {
            if (!animating) {
                return;
            }
            value += 0.5;
            if (value > 2017) {
                value = 1880;
            }
            setYear(value);
            // Update at 30fps
            setTimeout(function () {
                requestAnimationFrame(frame);
            }, 1000 / 30);
        };
        frame();
        return {
            remove: function () {
                animating = false;
            }
        };
    }
    /**
     * Creates a tooltip to display a the construction year of a building.
     */
    function createTooltip() {
        var tooltip = document.createElement("div");
        var style = tooltip.style;
        tooltip.setAttribute("role", "tooltip");
        tooltip.classList.add("tooltip");
        var textElement = document.createElement("div");
        textElement.classList.add("esri-widget");
        tooltip.appendChild(textElement);
        view.container.appendChild(tooltip);
        var x = 0;
        var y = 0;
        var targetX = 0;
        var targetY = 0;
        var visible = false;
        // move the tooltip progressively
        function move() {
            x += (targetX - x) * 0.1;
            y += (targetY - y) * 0.1;
            if (Math.abs(targetX - x) < 1 && Math.abs(targetY - y) < 1) {
                x = targetX;
                y = targetY;
            }
            else {
                requestAnimationFrame(move);
            }
            style.transform = "translate3d(" + Math.round(x) + "px," + Math.round(y) + "px, 0)";
        }
        return {
            show: function (point, text) {
                if (!visible) {
                    x = point.x;
                    y = point.y;
                }
                targetX = point.x;
                targetY = point.y;
                style.opacity = "1";
                visible = true;
                textElement.innerHTML = text;
                move();
            },
            hide: function () {
                style.opacity = "0";
                visible = false;
            }
        };
    }
});
//# sourceMappingURL=application.js.map