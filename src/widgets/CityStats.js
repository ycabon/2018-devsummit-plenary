/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/core/watchUtils", "esri/core/promiseUtils", "esri/tasks/support/Query"], function (require, exports, __extends, __decorate, decorators_1, Widget, widget_1, watchUtils_1, promiseUtils_1, Query) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CSS = {
        base: "widgets-citystats",
        cardBlue: "widgets-citystats--cardBlue",
        cardGreen: "widgets-citystats--cardGreen",
        cardOrange: "widgets-citystats--cardOrange",
        cardPurple: "widgets-citystats--cardPurple",
        cardTitle: "widgets-citystats--cardtitle",
        cardValue: "widgets-citystats--cardvalue",
    };
    let CityStats = class CityStats extends (0, decorators_1.declared)(Widget) {
        constructor(props) {
            super(props);
        }
        // was a new demand of stats made
        _refresh = false;
        // promise to the current stats.
        _statsPromise;
        iconClass = "esri-icon-dashboard";
        layer;
        count = 0;
        statistics = null;
        view;
        /**
         * Filtering construction year
         */
        year;
        postInitialize() {
            const view = this.view;
            const updateCallback = () => this.updateStatistics();
            (0, watchUtils_1.whenFalse)(this, "view.updating", updateCallback);
            (0, watchUtils_1.watch)(this, "view.extent", updateCallback);
            (0, watchUtils_1.watch)(this, "year", updateCallback);
        }
        updateStatistics() {
            if (this._statsPromise) {
                this._refresh = true;
                return;
            }
            this._refresh = false;
            this._statsPromise = this.view.whenLayerView(this.layer)
                .then((layerView) => this.queryStatistics(layerView));
        }
        queryStatistics(layerView) {
            // Define query parameters
            const where = `CNSTRCT_YR <= ${this.year}`;
            const geometry = this.view.extent;
            const outStatistics = [
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
            const countPromise = layerView.queryFeatureCount(new Query({
                where,
                geometry
            }));
            const buildStatsPromise = layerView.queryFeatures(new Query({
                where,
                geometry,
                outStatistics
            }));
            return (0, promiseUtils_1.eachAlways)([
                buildStatsPromise,
                countPromise
            ])
                .then((results) => this.displayResults(results));
        }
        displayResults(results) {
            this.statistics = results[0].value && results[0].value[0].attributes;
            this.count = results[1].value;
            this._statsPromise = null;
            // if a stats has been asked, start a new batch
            if (this._refresh) {
                this.updateStatistics();
            }
        }
        render() {
            const classes = {};
            const stats = this.statistics || {
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
        }
    };
    __decorate([
        (0, decorators_1.property)()
    ], CityStats.prototype, "iconClass", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], CityStats.prototype, "layer", void 0);
    __decorate([
        (0, decorators_1.property)(),
        (0, widget_1.renderable)()
    ], CityStats.prototype, "count", void 0);
    __decorate([
        (0, decorators_1.property)(),
        (0, widget_1.renderable)()
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
    exports.default = CityStats;
});
//# sourceMappingURL=CityStats.js.map