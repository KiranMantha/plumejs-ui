"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@plumejs/core");
const toggle_component_scss_1 = tslib_1.__importDefault(require("./toggle.component.scss"));
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
                return core_1.html `
                <div class='toggle-container'>
                    <span>${this.toggleOptions.offText ? this.toggleOptions.offText.translate() : ''}</span>
                    <input type='checkbox' id='${this._id}' checked='${!!this.toggleOptions.isSelected}' onchange=${this.toggleChange}/>
                    <label for='${this._id}'></label>
                    <span>${this.toggleOptions.onText ? this.toggleOptions.onText.translate() : ''}</span>
                </div>`;
            }
            else {
                return core_1.html `<div></div>`;
            }
        }
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], ToggleComponent.prototype, "toggleOptions", void 0);
    ToggleComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'toggle-button',
            styles: toggle_component_scss_1.default
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ToggleComponent);
};
exports.registerToggleComponent = registerToggleComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS90b2dnbGUvdG9nZ2xlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBK0Q7QUFDL0QsNEZBQW1EO0FBU25ELE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxFQUFFO0lBS2pDLElBQU0sZUFBZSxHQUFyQixNQUFNLGVBQWU7UUFZakI7WUFWQSxrQkFBYSxHQUFpQjtnQkFDMUIsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7Z0JBQ25CLE1BQU0sRUFBRSxFQUFFO2dCQUNWLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFVBQVUsRUFBRSxLQUFLO2FBQ3BCLENBQUM7WUFFTSxRQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1lBR3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUVELFlBQVksQ0FBQyxNQUFvQixFQUFFLE1BQW9CO1lBQ25ELElBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7YUFDM0I7UUFDTCxDQUFDO1FBRUQsWUFBWSxDQUFDLENBQVE7WUFDakIsSUFBSSxLQUFLLEdBQUksQ0FBQyxDQUFDLE1BQWMsQ0FBQyxPQUFPLENBQUM7WUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVELE1BQU07WUFDRixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2xCLE9BQU8sV0FBSSxDQUFBOzs0QkFFRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7aURBQ25ELElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxjQUFjLElBQUksQ0FBQyxZQUFZO2tDQUNwRyxJQUFJLENBQUMsR0FBRzs0QkFDYixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7dUJBQzVFLENBQUM7YUFDWDtpQkFBTTtnQkFDSCxPQUFPLFdBQUksQ0FBQSxhQUFhLENBQUE7YUFDM0I7UUFDTCxDQUFDO0tBQ0osQ0FBQTtJQXRDRztRQURDLFlBQUssRUFBRTs7MERBTU47SUFQQSxlQUFlO1FBSnBCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixNQUFNLEVBQUUsK0JBQVk7U0FDdkIsQ0FBQzs7T0FDSSxlQUFlLENBd0NwQjtBQUNMLENBQUMsQ0FBQTtBQUVRLDBEQUF1QiJ9