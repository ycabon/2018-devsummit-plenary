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
        button: "esri-widget-button esri-widget widgets-iconbutton",
        disabled: "esri-disabled",
        interactive: "esri-interactive",
        icon: "esri-icon"
    };
    let IconButton = class IconButton extends (0, decorators_1.declared)(Widget) {
        constructor(props) {
            super(props);
        }
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        //----------------------------------
        //  action
        //----------------------------------
        action;
        //----------------------------------
        //  enabled
        //----------------------------------
        enabled = true;
        //----------------------------------
        //  iconClass
        //----------------------------------
        iconClass = "";
        //----------------------------------
        //  title
        //----------------------------------
        title = "";
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        render() {
            const tabIndex = this.enabled ? 0 : -1;
            const rootClasses = {
                [CSS.disabled]: !this.enabled,
                [CSS.interactive]: this.enabled
            };
            const iconClasses = {
                [this.iconClass]: !!this.iconClass
            };
            const iconRendered = !this.iconClass ?
                null :
                (0, widget_1.tsx)("span", { "aria-hidden": "true", role: "presentation", class: CSS.icon, classes: iconClasses });
            const titleRendered = !this.title ?
                null :
                (0, widget_1.tsx)("span", null, this.title);
            return ((0, widget_1.tsx)("div", { bind: this, class: CSS.button, classes: rootClasses, onclick: this._triggerAction, onkeydown: this._triggerAction, role: "button", tabIndex: tabIndex, title: this.title },
                iconRendered,
                titleRendered));
        }
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        _triggerAction() {
            if (this.enabled) {
                this.action.call(this);
            }
        }
    };
    __decorate([
        (0, decorators_1.property)()
    ], IconButton.prototype, "action", void 0);
    __decorate([
        (0, decorators_1.property)(),
        (0, widget_1.renderable)()
    ], IconButton.prototype, "enabled", void 0);
    __decorate([
        (0, decorators_1.property)({
            readOnly: false
        }),
        (0, widget_1.renderable)()
    ], IconButton.prototype, "iconClass", void 0);
    __decorate([
        (0, decorators_1.property)(),
        (0, widget_1.renderable)()
    ], IconButton.prototype, "title", void 0);
    __decorate([
        (0, widget_1.accessibleHandler)()
    ], IconButton.prototype, "_triggerAction", null);
    IconButton = __decorate([
        (0, decorators_1.subclass)("widgets.IconButton")
    ], IconButton);
    exports.default = IconButton;
});
//# sourceMappingURL=IconButton.js.map