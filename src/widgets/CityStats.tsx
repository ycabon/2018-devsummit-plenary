import { property, subclass } from "esri/core/accessorSupport/decorators";
import { debounce, eachAlways } from "esri/core/promiseUtils";
import { watch, when } from "esri/core/reactiveUtils";
import { tsx } from "esri/widgets/support/widget";
import Widget = require("esri/widgets/Widget");

import FeatureLayer = require("esri/layers/FeatureLayer");
import Query = require("esri/rest/support/Query");
import MapView = require("esri/views/MapView");
import FeatureLayerView = require("esri/views/layers/FeatureLayerView");

const CSS = {
  base: "widgets-citystats",
  cardBlue: "widgets-citystats--cardBlue",
  cardGreen: "widgets-citystats--cardGreen",
  cardOrange: "widgets-citystats--cardOrange",
  cardPurple: "widgets-citystats--cardPurple",
  cardTitle: "widgets-citystats--cardtitle",
  cardValue: "widgets-citystats--cardvalue",
};

@subclass("widgets.CityStats")
export default class CityStats extends Widget {

  constructor(props: Partial<CityStats>) {
    super(props);
  }

  @property()
  iconClass: string = "esri-icon-dashboard";

  @property()
  layer: FeatureLayer;

  @property()
    count: number = 0;

  @property()
    statistics: HashMap<number> | null = null;

  @property()
  view: MapView;

  /**
   * Filtering construction year
   */
  @property()
  year: number;

  postInitialize() {
    const updateCallback = () => this.updateStatistics().catch(() => {});

    when(() => !this.view.updating, updateCallback);
    watch(() => this.view.extent, updateCallback);
    watch(() => this.year, updateCallback);
  }

  updateStatistics = debounce(() => {
    return this.view.whenLayerView(this.layer)
      .then((layerView: FeatureLayerView) => this.queryStatistics(layerView));
  });

  queryStatistics(layerView: FeatureLayerView) {
    // Define query parameters
    const where = `CNSTRCT_YR <= ${this.year}`;
    const geometry = this.view.extent;
    const outStatistics = [
      {
        onStatisticField: "HEIGHTROOF",
        outStatisticFieldName: "MAX_HEIGHTROOF",
        statisticType: "max" as const
      },
      {
        onStatisticField: "CNSTRCT_YR",
        outStatisticFieldName: "AVG_CNSTRCT_YR",
        statisticType: "avg" as const
      }
    ];

    // Execute the queries on the layerview
    // instead of the layer
    const countPromise = layerView.queryFeatureCount(
      new Query({
        where,
        geometry
      })
    );

    const buildStatsPromise = layerView.queryFeatures(
      new Query({
        where,
        geometry,
        outStatistics
      })
    );

    return eachAlways([
      buildStatsPromise,
      countPromise
    ])
    .then((results: any) => this.displayResults(results));
  }

  displayResults(results: any): any {
    this.statistics = results[0].value && results[0].value.attributes;
    this.count = results[1].value;
  }

  render() {
    const classes = {
    };

    const stats = this.statistics || {
      AVG_NUM_FLOORS: 0,
      MAX_HEIGHTROOF: 0,
      AVG_CNSTRCT_YR: 0
    }

    return (
      <div bind={this}
        class={CSS.base}
        classes={classes}>
        <div class={CSS.cardBlue}>
          <div class={CSS.cardTitle}>Buildings Count</div>
          <div class={CSS.cardValue}>{this.count}</div>
        </div>
        <div class={CSS.cardGreen}>
          <div class={CSS.cardTitle}>Max Height</div>
          <div class={CSS.cardValue}>{Math.round(stats.MAX_HEIGHTROOF)} ft</div>
        </div>
        <div class={CSS.cardOrange}>
          <div class={CSS.cardTitle}>Avg Construction Year</div>
          <div class={CSS.cardValue}>{Math.round(stats.AVG_CNSTRCT_YR)}</div>
        </div>
      </div>
    );
  }

}
