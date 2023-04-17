define(["require", "exports", "esri/Map", "esri/layers/CSVLayer", "esri/Graphic", "esri/Viewpoint", "esri/geometry/Circle", "esri/renderers/UniqueValueRenderer", "esri/symbols/PictureMarkerSymbol", "esri/views/MapView", "esri/widgets/Home", "esri/widgets/Zoom", "esri/widgets/Legend", "@dojo/core/util", "../widgets/Header", "../widgets/DropTarget", "../widgets/IconButton", "../widgets/ToggleIconButton", "../widgets/HurricaneInfo"], function (require, exports, Map, CSVLayer, Graphic, Viewpoint, Circle, UniqueValueRenderer, PictureMarkerSymbol, MapView, Home, Zoom, Legend, util_1, Header_1, DropTarget_1, IconButton_1, ToggleIconButton_1, HurricaneInfo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let map;
    let view;
    let layer;
    let header;
    const mobile = !!navigator.userAgent.match(/Android|iPhone|iPad|iPod/i);
    (async () => {
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
                color: "white"
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
                        action: () => {
                            window.open("src/2-hurricanes/Hurricanes.csv");
                        }
                    }),
                new ToggleIconButton_1.default({
                    iconClass: "esri-icon-locate",
                    title: mobile ? "" : "Explore hurricanes",
                    toggle: () => toggleHighlighting(),
                    enabled: false
                })
            ]
        });
        const zoom = new Zoom({
            view,
            layout: "horizontal"
        });
        const home = new Home({
            view
        });
        const legend = new Legend({
            view
        });
        const target = new DropTarget_1.default({
            view,
            drop: (dataTransfer) => {
                const files = dataTransfer.files;
                const file = files[0];
                layer = new CSVLayer({
                    url: URL.createObjectURL(file),
                    // "PROJCS[\"South Pole Stereographic_1\",GEOGCS[\"GCS WGS 1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Stereographic\"],PARAMETER[\"False_Easting\",0.0],PARAMETER[\"False_Northing\",0.0],PARAMETER[\"Central_Meridian\",-145.0],PARAMETER[\"Scale_Factor\",1.0],PARAMETER[\"Latitude_Of_Origin\",-90.0],UNIT[\"Meter\",1.0]]"
                    spatialReference: view.spatialReference,
                    renderer: new UniqueValueRenderer({
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
                        ]
                    })
                });
                return layer.load();
            }
        });
        view.ui.add(target);
        view.ui.add(header);
        view.ui.add(zoom, "bottom-left");
        view.ui.add(home, "bottom-left");
        await view.when();
        target.on("drop", (event) => {
            map.removeAll();
            map.add(event.item);
            header.actionContent[1].enabled = true;
        });
        const bookmark1 = new IconButton_1.default({
            title: "Pacific",
            action() {
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
        const bookmark2 = new IconButton_1.default({
            title: "Atlantic",
            action() {
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
    })();
    let drawHandle = null;
    let promise;
    let highlight = null;
    let info;
    function toggleHighlighting() {
        if (drawHandle) {
            drawHandle.remove();
            drawHandle = null;
            promise && promise.cancel();
            promise = null;
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
            .then((layerView) => {
            var performStatistics = (0, util_1.throttle)((searchArea) => {
                promise && promise.cancel();
                promise = layer
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
                    .then(statistics => {
                    const maxWind = statistics.features[0].attributes.max_wmo_wind;
                    return layer.queryFeatures({
                        geometry: searchArea,
                        where: `wmo_wind = ${maxWind}`,
                        outFields: ["Serial_Num", "Name"]
                    })
                        .then(maxWindFS => {
                        if (!maxWindFS.features[0]) {
                            return null;
                        }
                        return {
                            maxWind,
                            hurricane: maxWindFS.features[0]
                        };
                    });
                })
                    .then(result => {
                    if (!result) {
                        info.hurricane = null;
                        return [];
                    }
                    const attr = result.hurricane.attributes;
                    info.hurricane = {
                        name: attr.Name,
                        season: attr.Season,
                        maxWind: result.maxWind,
                    };
                    return layer.queryObjectIds({
                        where: `Serial_Num = '${attr.Serial_Num}'`
                    });
                })
                    .then((objectIds) => {
                    highlight?.remove();
                    highlight = null;
                    if (objectIds.length) {
                        highlight = layerView.highlight(objectIds);
                    }
                })
                    .catch(error => {
                    if (error.dojoType) {
                        return;
                    }
                    console.error(error);
                });
            }, 75);
            drawHandle = view.on("drag", (event) => {
                event.stopPropagation();
                view.graphics.removeAll();
                const searchArea = new Circle({
                    center: view.toMap(event),
                    radius: 500000
                });
                view.graphics.add(new Graphic({
                    geometry: searchArea,
                    symbol: {
                        type: "simple-fill",
                        style: "none",
                        outline: {
                            color: "dark-gray",
                            width: 4
                        }
                    }
                }));
                performStatistics(searchArea);
            });
        });
    }
    // For mobile support
    function addCSVLayer() {
        layer = new CSVLayer({
            url: "src/2-hurricanes/Hurricanes.csv",
            // "PROJCS[\"South Pole Stereographic_1\",GEOGCS[\"GCS WGS 1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]],PROJECTION[\"Stereographic\"],PARAMETER[\"False_Easting\",0.0],PARAMETER[\"False_Northing\",0.0],PARAMETER[\"Central_Meridian\",-145.0],PARAMETER[\"Scale_Factor\",1.0],PARAMETER[\"Latitude_Of_Origin\",-90.0],UNIT[\"Meter\",1.0]]"
            spatialReference: view.spatialReference,
            renderer: new UniqueValueRenderer({
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
                ]
            })
        });
        map.add(layer);
        header.actionContent[0].enabled = false;
        header.actionContent[1].enabled = true;
    }
});
//# sourceMappingURL=application.js.map