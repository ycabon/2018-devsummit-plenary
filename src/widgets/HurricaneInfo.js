/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, decorators_1, Widget, widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CSS = {
        base: "widgets-hurricaneinfo",
        background: "widgets-hurricaneinfo--background",
        modal: "widgets-hurricaneinfo--modal",
        visible: "widgets-hurricaneinfo--visible",
        hurricaneName: "widgets-hurricaneinfo--hurricane-name",
        hurricaneSeason: "widgets-hurricaneinfo--hurricane-season",
        hurricaneMaxWind: "widgets-hurricaneinfo--hurricane-maxwind",
        hurricaneInfo: "widgets-hurricaneinfo--info",
    };
    let HurricaneInfo = class HurricaneInfo extends (0, decorators_1.declared)(Widget) {
        // constructor(props: Partial<Pick<HurricaneInfo<T>, "drop" | "view">>) {
        //   super(props as any);
        // }
        hurricane;
        render() {
            const classes = {
                [CSS.visible]: this.hurricane != null
            };
            const hurricane = this.hurricane;
            const renderedHurricanes = !hurricane ? null : ((0, widget_1.tsx)("div", { class: CSS.modal },
                (0, widget_1.tsx)("div", { class: CSS.hurricaneInfo },
                    (0, widget_1.tsx)("div", { class: CSS.hurricaneSeason }, hurricane.season),
                    (0, widget_1.tsx)("div", { class: CSS.hurricaneMaxWind }, Math.round(hurricane.maxWind * 1.852) + " km/h")),
                (0, widget_1.tsx)("div", { class: CSS.hurricaneName }, hurricane.name)));
            return ((0, widget_1.tsx)("div", { bind: this, classes: classes, class: CSS.base },
                (0, widget_1.tsx)("div", { class: CSS.background }, renderedHurricanes)));
        }
    };
    __decorate([
        (0, decorators_1.property)(),
        (0, widget_1.renderable)()
    ], HurricaneInfo.prototype, "hurricane", void 0);
    HurricaneInfo = __decorate([
        (0, decorators_1.subclass)("widgets.HurricaneInfo")
    ], HurricaneInfo);
    exports.default = HurricaneInfo;
});
//# sourceMappingURL=HurricaneInfo.js.map