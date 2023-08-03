var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/core/promiseUtils", "esri/core/reactiveUtils", "esri/widgets/support/widget", "esri/widgets/Widget", "esri/rest/support/Query"], function (require, exports, decorators_1, promiseUtils_1, reactiveUtils_1, widget_1, Widget, Query) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CSS = {
        base: "widgets-citystats",
        cardBlue: "widgets-citystats--cardBlue",
        cardGreen: "widgets-citystats--cardGreen",
        cardOrange: "widgets-citystats--cardOrange",
        cardPurple: "widgets-citystats--cardPurple",
        cardTitle: "widgets-citystats--cardtitle",
        cardValue: "widgets-citystats--cardvalue",
    };
    var CityStats = /** @class */ (function (_super) {
        __extends(CityStats, _super);
        function CityStats(props) {
            var _this = _super.call(this, props) || this;
            _this.iconClass = "esri-icon-dashboard";
            _this.count = 0;
            _this.statistics = null;
            _this.updateStatistics = (0, promiseUtils_1.debounce)(function () {
                return _this.view.whenLayerView(_this.layer)
                    .then(function (layerView) { return _this.queryStatistics(layerView); });
            });
            return _this;
        }
        CityStats.prototype.postInitialize = function () {
            var _this = this;
            var updateCallback = function () { return _this.updateStatistics().catch(function () { }); };
            (0, reactiveUtils_1.when)(function () { return !_this.view.updating; }, updateCallback);
            (0, reactiveUtils_1.watch)(function () { return _this.view.extent; }, updateCallback);
            (0, reactiveUtils_1.watch)(function () { return _this.year; }, updateCallback);
        };
        CityStats.prototype.queryStatistics = function (layerView) {
            var _this = this;
            // Define query parameters
            var where = "CNSTRCT_YR <= ".concat(this.year);
            var geometry = this.view.extent;
            var outStatistics = [
                {
                    onStatisticField: "HEIGHTROOF",
                    outStatisticFieldName: "MAX_HEIGHTROOF",
                    statisticType: "max"
                },
                {
                    onStatisticField: "CNSTRCT_YR",
                    outStatisticFieldName: "AVG_CNSTRCT_YR",
                    statisticType: "avg"
                }
            ];
            // Execute the queries on the layerview
            // instead of the layer
            var countPromise = layerView.queryFeatureCount(new Query({
                where: where,
                geometry: geometry
            }));
            var buildStatsPromise = layerView.queryFeatures(new Query({
                where: where,
                geometry: geometry,
                outStatistics: outStatistics
            }));
            return (0, promiseUtils_1.eachAlways)([
                buildStatsPromise,
                countPromise
            ])
                .then(function (results) { return _this.displayResults(results); });
        };
        CityStats.prototype.displayResults = function (results) {
            this.statistics = results[0].value.features[0].attributes;
            this.count = results[1].value;
        };
        CityStats.prototype.render = function () {
            var classes = {};
            var stats = this.statistics || {
                AVG_NUM_FLOORS: 0,
                MAX_HEIGHTROOF: 0,
                AVG_CNSTRCT_YR: 0
            };
            return ((0, widget_1.tsx)("div", { bind: this, class: CSS.base, classes: classes },
                (0, widget_1.tsx)("div", { class: CSS.cardBlue },
                    (0, widget_1.tsx)("div", { class: CSS.cardTitle }, "Buildings Count"),
                    (0, widget_1.tsx)("div", { class: CSS.cardValue }, this.count)),
                (0, widget_1.tsx)("div", { class: CSS.cardGreen },
                    (0, widget_1.tsx)("div", { class: CSS.cardTitle }, "Max Height"),
                    (0, widget_1.tsx)("div", { class: CSS.cardValue },
                        Math.round(stats.MAX_HEIGHTROOF),
                        " ft")),
                (0, widget_1.tsx)("div", { class: CSS.cardOrange },
                    (0, widget_1.tsx)("div", { class: CSS.cardTitle }, "Avg Construction Year"),
                    (0, widget_1.tsx)("div", { class: CSS.cardValue }, Math.round(stats.AVG_CNSTRCT_YR)))));
        };
        __decorate([
            (0, decorators_1.property)()
        ], CityStats.prototype, "iconClass", void 0);
        __decorate([
            (0, decorators_1.property)()
        ], CityStats.prototype, "layer", void 0);
        __decorate([
            (0, decorators_1.property)()
        ], CityStats.prototype, "count", void 0);
        __decorate([
            (0, decorators_1.property)()
        ], CityStats.prototype, "statistics", void 0);
        __decorate([
            (0, decorators_1.property)()
        ], CityStats.prototype, "view", void 0);
        __decorate([
            (0, decorators_1.property)()
        ], CityStats.prototype, "year", void 0);
        CityStats = __decorate([
            (0, decorators_1.subclass)("widgets.CityStats")
        ], CityStats);
        return CityStats;
    }(Widget));
    exports.default = CityStats;
});
//# sourceMappingURL=CityStats.js.map