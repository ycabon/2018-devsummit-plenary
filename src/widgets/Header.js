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
        base: "widgets-header",
        actionContent: "widgets-header--actionContent",
        label: "widgets-header--label"
    };
    let Header = class Header extends (0, decorators_1.declared)(Widget) {
        constructor(props) {
            super(props);
        }
        title = "";
        actionContent;
        render() {
            const classes = {};
            return ((0, widget_1.tsx)("div", { bind: this, class: CSS.base, classes: classes },
                (0, widget_1.tsx)("div", { class: CSS.label }, this.title),
                (0, widget_1.tsx)("div", { class: CSS.actionContent }, this.actionContent && this.actionContent.map(content => content.render()))));
        }
    };
    __decorate([
        (0, decorators_1.property)(),
        (0, widget_1.renderable)()
    ], Header.prototype, "title", void 0);
    __decorate([
        (0, decorators_1.property)(),
        (0, widget_1.renderable)()
    ], Header.prototype, "actionContent", void 0);
    Header = __decorate([
        (0, decorators_1.subclass)("widgets.Header")
    ], Header);
    exports.default = Header;
});
//# sourceMappingURL=Header.js.map