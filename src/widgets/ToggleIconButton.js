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
        button: "esri-widget-button esri-widget widgets-toggleiconbutton",
        disabled: "esri-disabled",
        interactive: "esri-interactive",
        icon: "esri-icon",
        toggled: "widgets-toggleiconbutton--toggled",
        content: "widgets-toggleiconbutton--content",
        indicator: "widgets-toggleiconbutton--indicator"
    };
    let ToggleIconButton = class ToggleIconButton extends (0, decorators_1.declared)(Widget) {
        constructor(props) {
            super(props);
        }
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //--------------------------------------------------------------------------
        //----------------------------------
        //  toggled
        //----------------------------------
        toggled = false;
        //----------------------------------
        //  action
        //----------------------------------
        toggle;
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
                [CSS.interactive]: this.enabled,
                [CSS.toggled]: this.toggled
            };
            const iconClasses = {
                [this.iconClass]: !!this.iconClass
            };
            const titleRendered = this.title ? (0, widget_1.tsx)("span", null, this.title) : null;
            return ((0, widget_1.tsx)("div", { bind: this, class: CSS.button, classes: rootClasses, onclick: this._triggerAction, onkeydown: this._triggerAction, role: "button", tabIndex: tabIndex, title: this.title },
                (0, widget_1.tsx)("div", { class: CSS.content },
                    (0, widget_1.tsx)("span", { "aria-hidden": "true", role: "presentation", class: CSS.icon, classes: iconClasses }),
                    titleRendered),
                (0, widget_1.tsx)("div", { class: CSS.indicator })));
        }
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        _triggerAction() {
            if (this.enabled) {
                this.toggled = !this.toggled;
                this.toggle.call(this);
            }
        }
    };
    __decorate([
        (0, decorators_1.property)(),
        (0, widget_1.renderable)()
    ], ToggleIconButton.prototype, "toggled", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], ToggleIconButton.prototype, "toggle", void 0);
    __decorate([
        (0, decorators_1.property)(),
        (0, widget_1.renderable)()
    ], ToggleIconButton.prototype, "enabled", void 0);
    __decorate([
        (0, decorators_1.property)({
            readOnly: false
        }),
        (0, widget_1.renderable)()
    ], ToggleIconButton.prototype, "iconClass", void 0);
    __decorate([
        (0, decorators_1.property)(),
        (0, widget_1.renderable)()
    ], ToggleIconButton.prototype, "title", void 0);
    __decorate([
        (0, widget_1.accessibleHandler)()
    ], ToggleIconButton.prototype, "_triggerAction", null);
    ToggleIconButton = __decorate([
        (0, decorators_1.subclass)("widgets.ToggleIconButton")
    ], ToggleIconButton);
    exports.default = ToggleIconButton;
});
//# sourceMappingURL=ToggleIconButton.js.map