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
define(["require", "exports", "esri/Map", "esri/layers/CSVLayer", "esri/Graphic", "esri/Viewpoint", "esri/geometry/Circle", "esri/renderers/UniqueValueRenderer", "esri/symbols/PictureMarkerSymbol", "esri/views/MapView", "esri/widgets/Home", "esri/widgets/Zoom", "esri/widgets/Legend", "../widgets/DropTarget", "../widgets/Header", "../widgets/HurricaneInfo", "../widgets/IconButton", "../widgets/ToggleIconButton", "esri/core/promiseUtils", "esri/Color", "esri/symbols"], function (require, exports, Map, CSVLayer, Graphic, Viewpoint, Circle, UniqueValueRenderer, PictureMarkerSymbol, MapView, Home, Zoom, Legend, DropTarget_1, Header_1, HurricaneInfo_1, IconButton_1, ToggleIconButton_1, promiseUtils_1, Color, symbols_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var map;
    var view;
    var layer;
    var header;
    var mobile = !!navigator.userAgent.match(/Android|iPhone|iPad|iPod/i);
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var zoom, home, legend, target, bookmark1, bookmark2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    map = new Map({
                        basemap: {
                            portalItem: {
                                // id: "5679afc165a841838d919bee62424422"
                                id: "3113eacc129942b4abde490a51aeb33f"
                            }
                        }
                    });
                    view = new MapView({
                        map: map,
                        container: "viewDiv",
                        highlightOptions: {
                            color: new Color("white")
                        }
                    });
                    view.ui.empty("top-left");
                    header = new Header_1.default({
                        title: "Hurricanes",
                        actionContent: [
                            mobile ?
                                new IconButton_1.default({
                                    iconClass: "esri-icon-plus-circled",
                                    action: addCSVLayer
                                }) :
                                new IconButton_1.default({
                                    iconClass: "esri-icon-download",
                                    title: "Download Hurricanes.csv",
                                    action: function () {
                                        window.open("src/2-hurricanes/Hurricanes.csv");
                                    }
                                }),
                            new ToggleIconButton_1.default({
                                iconClass: "esri-icon-locate",
                                title: mobile ? "" : "Explore hurricanes",
                                toggle: function () { return toggleHighlighting(); },
                                enabled: false
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
                    target = new DropTarget_1.default({
                        view: view,
                        drop: function (dataTransfer) {
                            var files = dataTransfer.files;
                            var file = files[0];
                            layer = new CSVLayer({
                                url: URL.createObjectURL(file),
                                outFields: ["*"],
                                // "PROJCS[\"South Pole Stereographic_1\",GEOGCS[\"GCS WGS 1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Stereographic\"],PARAMETER[\"False_Easting\",0.0],PARAMETER[\"False_Northing\",0.0],PARAMETER[\"Central_Meridian\",-145.0],PARAMETER[\"Scale_Factor\",1.0],PARAMETER[\"Latitude_Of_Origin\",-90.0],UNIT[\"Meter\",1.0]]"
                                spatialReference: view.spatialReference,
                                renderer: new UniqueValueRenderer({
                                    field: "Category",
                                    orderByClassesEnabled: true,
                                    defaultSymbol: new PictureMarkerSymbol({
                                        url: "src/2-hurricanes/CatTS.png"
                                    }),
                                    uniqueValueInfos: [
                                        {
                                            value: 1,
                                            symbol: new PictureMarkerSymbol({
                                                url: "src/2-hurricanes/Cat1.png"
                                            })
                                        },
                                        {
                                            value: 2,
                                            symbol: new PictureMarkerSymbol({
                                                url: "src/2-hurricanes/Cat2.png"
                                            })
                                        },
                                        {
                                            value: 3,
                                            symbol: new PictureMarkerSymbol({
                                                url: "src/2-hurricanes/Cat3.png"
                                            })
                                        },
                                        {
                                            value: 4,
                                            symbol: new PictureMarkerSymbol({
                                                url: "src/2-hurricanes/Cat4.png"
                                            })
                                        },
                                        {
                                            value: 5,
                                            symbol: new PictureMarkerSymbol({
                                                url: "src/2-hurricanes/Cat5.png"
                                            })
                                        }
                                    ].reverse()
                                })
                            });
                            return layer.load();
                        }
                    });
                    view.ui.add(target);
                    view.ui.add(header);
                    view.ui.add(zoom, "bottom-left");
                    view.ui.add(home, "bottom-left");
                    return [4 /*yield*/, view.when()];
                case 1:
                    _a.sent();
                    target.on("drop", function (event) {
                        map.removeAll();
                        map.add(event.item);
                        header.actionContent[1].enabled = true;
                    });
                    bookmark1 = new IconButton_1.default({
                        title: "Pacific",
                        action: function () {
                            view.goTo(new Viewpoint({
                                rotation: 70,
                                scale: 73957190.948944,
                                targetGeometry: {
                                    type: "point",
                                    spatialReference: {
                                        wkt: "PROJCS[\"South Pole Stereographic_1\",GEOGCS[\"GCS WGS 1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Stereographic\"],PARAMETER[\"False_Easting\",0.0],PARAMETER[\"False_Northing\",0.0],PARAMETER[\"Central_Meridian\",-145.0],PARAMETER[\"Scale_Factor\",1.0],PARAMETER[\"Latitude_Of_Origin\",-90.0],UNIT[\"Meter\",1.0]]"
                                    },
                                    x: -15718279.325275715,
                                    y: 5522067.915221284
                                }
                            }), {
                                duration: 2000,
                                easing: "ease-in-out"
                            });
                        }
                    });
                    bookmark2 = new IconButton_1.default({
                        title: "Atlantic",
                        action: function () {
                            view.goTo(new Viewpoint({
                                rotation: 289,
                                scale: 36978595.474472,
                                targetGeometry: {
                                    type: "point",
                                    spatialReference: {
                                        wkt: "PROJCS[\"South Pole Stereographic_1\",GEOGCS[\"GCS WGS 1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Stereographic\"],PARAMETER[\"False_Easting\",0.0],PARAMETER[\"False_Northing\",0.0],PARAMETER[\"Central_Meridian\",-145.0],PARAMETER[\"Scale_Factor\",1.0],PARAMETER[\"Latitude_Of_Origin\",-90.0],UNIT[\"Meter\",1.0]]"
                                    },
                                    x: 17983804.09858078,
                                    y: 6259867.915768554
                                }
                            }), {
                                duration: 2000,
                                easing: "ease-in-out"
                            });
                        }
                    });
                    view.ui.add(bookmark1, "bottom-left");
                    view.ui.add(bookmark2, "bottom-left");
                    return [2 /*return*/];
            }
        });
    }); })();
    var drawHandle = null;
    var highlight = null;
    var info;
    function toggleHighlighting() {
        if (drawHandle) {
            drawHandle.remove();
            drawHandle = null;
            highlight && highlight.remove();
            view.graphics.removeAll();
            view.ui.remove(info);
            info = null;
            return;
        }
        if (!layer) {
            return;
        }
        info = new HurricaneInfo_1.default();
        view.ui.add(info);
        view.whenLayerView(layer)
            .then(function (layerView) {
            var performStatistics = (0, promiseUtils_1.debounce)(function (searchArea) {
                return layer
                    .queryFeatures({
                    geometry: searchArea,
                    outStatistics: [
                        {
                            onStatisticField: "wmo_wind",
                            outStatisticFieldName: "max_wmo_wind",
                            statisticType: "max"
                        }
                    ]
                })
                    .then(function (statistics) {
                    var maxWind = statistics.features[0].attributes.max_wmo_wind;
                    return layer.queryFeatures({
                        geometry: searchArea,
                        where: "wmo_wind = ".concat(maxWind),
                        outFields: ["Serial_Num", "Name", "Season"]
                    })
                        .then(function (maxWindFS) {
                        if (!maxWindFS.features[0]) {
                            return null;
                        }
                        return {
                            maxWind: maxWind,
                            hurricane: maxWindFS.features[0]
                        };
                    });
                })
                    .then(function (result) {
                    if (!result) {
                        info.hurricane = null;
                        return [];
                    }
                    var attr = result.hurricane.attributes;
                    info.hurricane = {
                        name: attr.Name,
                        season: attr.Season,
                        maxWind: result.maxWind,
                    };
                    return layer.queryObjectIds({
                        where: "Serial_Num = '".concat(attr.Serial_Num, "'")
                    });
                })
                    .then(function (objectIds) {
                    highlight === null || highlight === void 0 ? void 0 : highlight.remove();
                    highlight = null;
                    if (objectIds.length) {
                        highlight = layerView.highlight(objectIds);
                    }
                })
                    .catch(function (error) {
                    if (error.dojoType) {
                        return;
                    }
                    console.error(error);
                });
            });
            drawHandle = view.on("drag", function (event) {
                event.stopPropagation();
                view.graphics.removeAll();
                var searchArea = new Circle({
                    center: view.toMap(event),
                    radius: 500000
                });
                view.graphics.add(new Graphic({
                    geometry: searchArea,
                    symbol: new symbols_1.SimpleFillSymbol({
                        style: "none",
                        outline: {
                            color: "dark-gray",
                            width: 4
                        }
                    })
                }));
                performStatistics(searchArea).catch(function () { });
            });
        });
    }
    // For mobile support
    function addCSVLayer() {
        layer = new CSVLayer({
            url: "src/2-hurricanes/Hurricanes.csv",
            outFields: ["*"],
            // "PROJCS[\"South Pole Stereographic_1\",GEOGCS[\"GCS WGS 1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Stereographic\"],PARAMETER[\"False_Easting\",0.0],PARAMETER[\"False_Northing\",0.0],PARAMETER[\"Central_Meridian\",-145.0],PARAMETER[\"Scale_Factor\",1.0],PARAMETER[\"Latitude_Of_Origin\",-90.0],UNIT[\"Meter\",1.0]]"
            spatialReference: view.spatialReference,
            renderer: new UniqueValueRenderer({
                orderByClassesEnabled: true,
                field: "Category",
                defaultSymbol: new PictureMarkerSymbol({
                    url: "src/2-hurricanes/CatTS.png"
                }),
                uniqueValueInfos: [
                    {
                        value: 1,
                        symbol: new PictureMarkerSymbol({
                            url: "src/2-hurricanes/Cat1.png"
                        })
                    },
                    {
                        value: 2,
                        symbol: new PictureMarkerSymbol({
                            url: "src/2-hurricanes/Cat2.png"
                        })
                    },
                    {
                        value: 3,
                        symbol: new PictureMarkerSymbol({
                            url: "src/2-hurricanes/Cat3.png"
                        })
                    },
                    {
                        value: 4,
                        symbol: new PictureMarkerSymbol({
                            url: "src/2-hurricanes/Cat4.png"
                        })
                    },
                    {
                        value: 5,
                        symbol: new PictureMarkerSymbol({
                            url: "src/2-hurricanes/Cat5.png"
                        })
                    }
                ].reverse()
            })
        });
        map.add(layer);
        header.actionContent[0].enabled = false;
        header.actionContent[1].enabled = true;
    }
});
//# sourceMappingURL=application.js.map