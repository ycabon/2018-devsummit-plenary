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
        base: "widgets-drop-target",
        background: "widgets-drop-target--background",
        modal: "widgets-drop-target--modal",
        dropbox: "widgets-drop-target--dropbox",
        dropboxIcon: "widgets-drop-target--dropboxIcon",
        loaderContainer: "widgets-drop-target--loaderContainer",
        loader: "widgets-drop-target--loader",
        label: "widgets-drop-target--label",
        // States
        visible: "widgets-drop-target--visible",
        dragging: "widgets-drop-target--dragging",
        hover: "widgets-drop-target--hover",
        loading: "widgets-drop-target--loading"
    };
    function isThenable(obj) {
        return obj && typeof obj.then === "function";
    }
    let DropTarget = class DropTarget extends (0, decorators_1.declared)(Widget) {
        constructor(props) {
            super(props);
            this._dragEnterHandler = this._dragEnterHandler.bind(this);
            this._dragExitHandler = this._dragExitHandler.bind(this);
            this._dropHandler = this._dropHandler.bind(this);
            this._dragOverHandler = this._dragOverHandler.bind(this);
            this.own(this.watch("view.container", (value, oldValue) => {
                if (oldValue) {
                    //oldValue.removeEventListener("drag", this._dragEnterHandler);
                    oldValue.removeEventListener("dragend", this._dragExitHandler);
                    oldValue.removeEventListener("dragenter", this._dragEnterHandler);
                    oldValue.removeEventListener("dragexit", this._dragExitHandler);
                    oldValue.removeEventListener("dragleave", this._dragExitHandler);
                    oldValue.removeEventListener("dragover", this._dragOverHandler);
                    // oldValue.removeEventListener("dragstart", this._dragEnterHandler);
                    oldValue.removeEventListener("drop", this._dropHandler);
                }
                if (value) {
                    //value.addEventListener("drag", this._dragEnterHandler);
                    value.addEventListener("dragend", this._dragExitHandler);
                    value.addEventListener("dragenter", this._dragEnterHandler);
                    value.addEventListener("dragexit", this._dragExitHandler);
                    value.addEventListener("dragleave", this._dragExitHandler);
                    value.addEventListener("dragover", this._dragOverHandler);
                    // value.addEventListener("dragstart", this._dragEnterHandler);
                    value.addEventListener("drop", this._dropHandler);
                }
            }));
        }
        drop;
        state = "ready";
        loading = false;
        view;
        render() {
            const classes = {
                [CSS.visible]: this.state !== "ready",
                [CSS.dragging]: this.state === "dragging",
                [CSS.hover]: this.state === "hover",
                [CSS.loading]: this.state === "loading"
            };
            const iconClasses = {
                "esri-icon-upload": true,
                [CSS.dropboxIcon]: true
            };
            return ((0, widget_1.tsx)("div", { bind: this, class: CSS.base, classes: classes },
                (0, widget_1.tsx)("div", { class: CSS.background },
                    (0, widget_1.tsx)("div", { class: CSS.modal },
                        (0, widget_1.tsx)("div", { class: CSS.label }, "Drop here your geo data"),
                        (0, widget_1.tsx)("div", { class: CSS.dropbox },
                            (0, widget_1.tsx)("span", { classes: iconClasses })),
                        (0, widget_1.tsx)("div", { class: CSS.loaderContainer },
                            (0, widget_1.tsx)("div", { class: CSS.loader }, "Loading..."))))));
        }
        _dragEnterHandler(event) {
            this._receiveEvent(event);
            this.state = "dragging";
        }
        _dragExitHandler(event) {
            if (event.currentTarget !== this.view.container) {
                this.state = "ready";
            }
        }
        _dropHandler(event) {
            this._receiveEvent(event);
            const dataTransfer = event.dataTransfer;
            if (this.drop) {
                const dropped = this.drop(dataTransfer);
                if (isThenable(dropped)) {
                    this.state = "loading";
                    dropped
                        .then((dropped) => {
                        this.state = "ready";
                        this.emit("drop", {
                            item: dropped
                        });
                    })
                        .catch(() => {
                        this.state = "ready";
                    });
                }
                else {
                    this.state = "ready";
                    this.emit("drop", {
                        item: dropped
                    });
                }
            }
            else {
                this.state = "ready";
                this.emit("drop", {
                    item: dataTransfer
                });
            }
        }
        _dragOverHandler(event) {
            this._receiveEvent(event);
        }
        _receiveEvent(event) {
            const target = event.target;
            if (target.classList.contains(CSS.dropbox)) {
                event.preventDefault();
                this.state = "hover";
            }
            else {
                this.state = "dragging";
            }
        }
    };
    __decorate([
        (0, decorators_1.property)()
    ], DropTarget.prototype, "drop", void 0);
    __decorate([
        (0, decorators_1.property)(),
        (0, widget_1.renderable)()
    ], DropTarget.prototype, "state", void 0);
    __decorate([
        (0, decorators_1.property)(),
        (0, widget_1.renderable)()
    ], DropTarget.prototype, "loading", void 0);
    __decorate([
        (0, decorators_1.property)()
    ], DropTarget.prototype, "view", void 0);
    DropTarget = __decorate([
        (0, decorators_1.subclass)("widgets.DropTarget")
    ], DropTarget);
    exports.default = DropTarget;
});
//# sourceMappingURL=DropTarget.js.map