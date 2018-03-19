const href = location.href;
var appName = href.substring(href.lastIndexOf('/') + 1, href.indexOf(".html"));
var path = href.substring(0, href.lastIndexOf('/'));

var api = `https://js.arcgis.com/4.7/`;
var node_modules = `https://js.arcgis.com/4.7/`;

var loaderConfig = {
  has: {
    "esri-promise-compatibility": 1,
    "esri-workers-for-memory-layers": 1,
    "esri-featurelayer-webgl": 1,
    "esri-workers": 1,
    "esri-built": 0
  },
  paths: {
    app: `${path}/src/${appName}`,
    esri: `${api}esri`,
    dojo: `${api}dojo`,
    dgrid: `${api}dgrid`,
    dojox: `${api}dojox`,
    dstore: `${api}dstore`,
    dijit: `${api}dijit`,
    moment: `${api}moment`
  },
  aliases: [
    [/^webgl-engine/, function() { return "esri/views/3d/webgl-engine"; }],
    [/^engine/, function() { return "esri/views/3d/webgl-engine"; }]
  ],
  packages: [{
    name: "@dojo",
    location: `${node_modules}@dojo`
  }, {
    name: "cldrjs",
    location: `${node_modules}cldrjs`,
    main: "dist/cldr"
  }, {
    name: "globalize",
    location: `${node_modules}globalize`,
    main: "dist/globalize"
  }, {
    name: "maquette",
    location: `${node_modules}maquette`,
    main: "dist/maquette.umd"
  }, {
    name: "maquette-jsx",
    location: `${node_modules}maquette-jsx`,
    main: "dist/maquette-jsx.umd"
  }, {
    name: "maquette-css-transitions",
    location: `${node_modules}maquette-css-transitions`,
    main: "dist/maquette-css-transitions.umd"
  }, {
    name: "tslib",
    location: `${node_modules}tslib`,
    main: "tslib"
  }],
  map: {
    "globalize": {
      "cldr": "cldrjs/dist/cldr",
      "cldr/event": "cldrjs/dist/cldr/event",
      "cldr/supplemental": "cldrjs/dist/cldr/supplemental",
      "cldr/unresolved": "cldrjs/dist/cldr/unresolved"
    }
  },
  baseUrl: `${path}/src/`,
  deps: [`app/application`]
}

window.dojoConfig = loaderConfig;
