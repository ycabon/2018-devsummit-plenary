
import Map = require("esri/Map");
import Viewpoint = require("esri/Viewpoint");

import MapView = require("esri/views/MapView");

import FeatureLayer = require("esri/layers/FeatureLayer");

import SimpleRenderer = require("esri/renderers/SimpleRenderer");

import Home = require("esri/widgets/Home");
import Expand = require("esri/widgets/Expand");
import Zoom = require("esri/widgets/Zoom");
import Legend = require("esri/widgets/Legend");
import FullScreen = require("esri/widgets/Fullscreen");
import Header from "../widgets/Header";
import CityStats from "../widgets/CityStats";
import IconButton from "../widgets/IconButton";

let map: Map;
let view: MapView;
let layer: FeatureLayer;
let cityStats: CityStats;

let animation: IHandle = null;

const applicationDiv = document.getElementById("applicationDiv");
const slider = document.getElementById("slider") as HTMLInputElement;
const sliderValue = document.getElementById("sliderValue");
const playButton = document.getElementById("playButton");
const titleDiv = document.getElementById("titleDiv");

(async () => {

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
    popupTemplate: null,
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

  (window as any)["view"] = view = new MapView({
    map: map,
    container: "viewDiv",
    center: [-74.011219, 40.705191],
    zoom: 15,
    constraints: {
      minScale: 72223.819286
    }
  });

  view.ui.empty("top-left");

  await view.when();

  slider.addEventListener("input", inputHandler);
  slider.addEventListener("change", inputHandler);

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
  function setYear(value: number): void {
    sliderValue.innerHTML = "" + Math.floor(value);
    slider.value = "" + Math.floor(value);
    layer.renderer = createRenderer(value);
    cityStats.year = value;
  }


  // Toggle animation on/off when user
  // clicks on the play button
  playButton.addEventListener("click", () => {
    if (playButton.classList.contains("toggled")) {
      stopAnimation();
    } else {
      startAnimation();
    }
  });

  /**********************
   * Setup widgets
   **********************/

  const header = new Header({
    title: "New York Construction",
    actionContent: [
      new FullScreen({
        view: view,
        element: applicationDiv
      })
    ]
  });
  const zoom = new Zoom({
    view: view,
    layout: "horizontal"
  });
  const home = new Home({
    view: view
  });
  const legend = new Legend({
    view: view
  });

  view.ui.add(header);
  view.ui.add(zoom, "bottom-left");
  view.ui.add(home, "bottom-left");
  view.ui.add(new Expand({ view: view, content: legend }), "bottom-right");

  const bookmark1 = new IconButton({
    title: "Manhattan",
    action() {
      view.goTo(
        {
          center: [-74.011218, 40.705190],
          scale: 9027.977411
        },
        {
          duration: 2000,
          easing: "ease-in-out"
        }
      );
    }
  });

  const bookmark2 = new IconButton({
    title: "New York",
    action() {
      view.goTo(
        {
          center: [-73.971278, 40.708108],
          scale: 36111.909643
        },
        {
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

  cityStats = new CityStats({
    view: view,
    layer: layer,
  });

  view.ui.add(
    new Expand({
      view: view,
      content: cityStats
    }),
    "bottom-right"
  );

  /**********************
   * Interactivity
   **********************/

  view.whenLayerView(layer).then(setupHoverTooltip);

  setYear(1890);

})();

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
function createRenderer(year: number) {
  return new SimpleRenderer({
    symbol: {
      type: "simple-fill",
      color: "rgb(0, 0, 0)",
      outline: null
    },
    visualVariables: [{
      type: "opacity",
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
    }, {
      type: "color",
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
    }]
  });
}

/**
 * Sets up a moving tooltip that displays
 * the construction year of the hovered building.
 */
function setupHoverTooltip(layerview: __esri.FeatureLayerView) {
  const tooltip = createTooltip();
  let highlight: IHandle;

  view.on("pointer-move", (event) => {

    const hit = view
      .hitTest({
        x: event.x,
        y: event.y
      })
      .then(hit => {
        // remove current highlighted feature
        if (highlight) {
          highlight.remove();
          highlight = null;
        }

        const results = hit.results.filter(function(result) {
          return result.graphic.layer === layer;
        });

        // highlight the hovered feature
        // or hide the tooltip
        if (results.length) {
          const graphic = results[0].graphic;

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
function setYear(value: number): void {
  sliderValue.innerHTML = "" + Math.floor(value);
  slider.value = "" + Math.floor(value);
  layer.renderer = createRenderer(value);
  cityStats.year = value;
}

/**
 * Animates the color visual variable continously
 */
function animate(startValue: number) {
  let animating = true;
  let value = startValue;

  const frame = () => {
    if (!animating) {
      return;
    }

    value += 0.5;
    if (value > 2017) {
      value = 1880;
    }

    setYear(value);

    // Update at 30fps
    setTimeout(function() {
      requestAnimationFrame(frame);
    }, 1000 / 30);
  };

  frame();

  return {
    remove: function() {
      animating = false;
    }
  };
}

/**
 * Creates a tooltip to display a the construction year of a building.
 */
function createTooltip() {
  const tooltip = document.createElement("div");
  const style = tooltip.style;

  tooltip.setAttribute("role", "tooltip");
  tooltip.classList.add("tooltip");

  const textElement = document.createElement("div");
  textElement.classList.add("esri-widget");
  tooltip.appendChild(textElement);

  view.container.appendChild(tooltip);

  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  let visible = false;

  // move the tooltip progressively
  function move() {
    x += (targetX - x) * 0.1;
    y += (targetY - y) * 0.1;

    if (Math.abs(targetX - x) < 1 && Math.abs(targetY - y) < 1) {
      x = targetX;
      y = targetY;
    } else {
      requestAnimationFrame(move);
    }

    style.transform = "translate3d(" + Math.round(x) + "px," + Math.round(
      y) + "px, 0)";
  }

  return {
    show(point: { x: number, y: number }, text: string) {
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

    hide() {
      style.opacity = "0";
      visible = false;
    }
  };
}