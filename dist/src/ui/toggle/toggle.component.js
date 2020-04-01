"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const plumejs_1 = require("plumejs");
const registerToggleComponent = () => {
    let ToggleComponent = class ToggleComponent {
        constructor() {
            this.toggleOptions = {
                onchange: () => { },
                onText: '',
                offText: '',
                isSelected: false
            };
            this._id = Math.random();
            this._showWidget = false;
            this.toggleChange = this.toggleChange.bind(this);
        }
        inputChanged(oldVal, newVal) {
            if (newVal.onchange) {
                this._showWidget = true;
            }
        }
        toggleChange(e) {
            let value = e.target.checked;
            this.toggleOptions.onchange(value);
        }
        render() {
            if (this._showWidget) {
                return plumejs_1.html `
                <div class='toggle-container'>
                    <span>${this.toggleOptions.offText ? this.toggleOptions.offText.translate() : ''}</span>
                    <input type='checkbox' id='${this._id}' checked='${!!this.toggleOptions.isSelected}' onchange=${this.toggleChange}/>
                    <label for='${this._id}'></label>
                    <span>${this.toggleOptions.onText ? this.toggleOptions.onText.translate() : ''}</span>
                </div>`;
            }
            else {
                return plumejs_1.html `<div></div>`;
            }
        }
    };
    tslib_1.__decorate([
        plumejs_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], ToggleComponent.prototype, "toggleOptions", void 0);
    ToggleComponent = tslib_1.__decorate([
        plumejs_1.Component({
            selector: 'toggle-button',
            styleUrl: 'toggle.component.scss'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ToggleComponent);
};
exports.registerToggleComponent = registerToggleComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS90b2dnbGUvdG9nZ2xlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBeUQ7QUFTekQsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLEVBQUU7SUFLakMsSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZTtRQVlqQjtZQVZBLGtCQUFhLEdBQWlCO2dCQUMxQixRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztnQkFDbkIsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsVUFBVSxFQUFFLEtBQUs7YUFDcEIsQ0FBQztZQUVNLFFBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7WUFHeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBRUQsWUFBWSxDQUFDLE1BQW9CLEVBQUUsTUFBb0I7WUFDbkQsSUFBRyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzthQUMzQjtRQUNMLENBQUM7UUFFRCxZQUFZLENBQUMsQ0FBUTtZQUNqQixJQUFJLEtBQUssR0FBSSxDQUFDLENBQUMsTUFBYyxDQUFDLE9BQU8sQ0FBQztZQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQsTUFBTTtZQUNGLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbEIsT0FBTyxjQUFJLENBQUE7OzRCQUVFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtpREFDbkQsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLGNBQWMsSUFBSSxDQUFDLFlBQVk7a0NBQ3BHLElBQUksQ0FBQyxHQUFHOzRCQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTt1QkFDNUUsQ0FBQzthQUNYO2lCQUFNO2dCQUNILE9BQU8sY0FBSSxDQUFBLGFBQWEsQ0FBQTthQUMzQjtRQUNMLENBQUM7S0FDSixDQUFBO0lBdENHO1FBREMsZUFBSyxFQUFFOzswREFNTjtJQVBBLGVBQWU7UUFKcEIsbUJBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSx1QkFBdUI7U0FDcEMsQ0FBQzs7T0FDSSxlQUFlLENBd0NwQjtBQUNMLENBQUMsQ0FBQTtBQUVRLDBEQUF1QiJ9