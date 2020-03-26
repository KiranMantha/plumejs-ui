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
            this.toggleChange = this.toggleChange.bind(this);
        }
        toggleChange(e) {
            let value = e.target.checked;
            this.toggleOptions.onchange(value);
        }
        render() {
            if (this.toggleOptions.onchange) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS90b2dnbGUvdG9nZ2xlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBaUQ7QUFTakQsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLEVBQUU7SUFLakMsSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZTtRQVdqQjtZQVRBLGtCQUFhLEdBQWlCO2dCQUMxQixRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztnQkFDbkIsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsVUFBVSxFQUFFLEtBQUs7YUFDcEIsQ0FBQztZQUVNLFFBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFHeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBRUQsWUFBWSxDQUFDLENBQVE7WUFDakIsSUFBSSxLQUFLLEdBQUksQ0FBQyxDQUFDLE1BQWMsQ0FBQyxPQUFPLENBQUM7WUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVELE1BQU07WUFDRixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFO2dCQUM3QixPQUFPLGNBQUksQ0FBQTs7NEJBRUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO2lEQUNuRCxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsY0FBYyxJQUFJLENBQUMsWUFBWTtrQ0FDcEcsSUFBSSxDQUFDLEdBQUc7NEJBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO3VCQUM1RSxDQUFDO2FBQ1g7aUJBQU07Z0JBQ0gsT0FBTyxjQUFJLENBQUEsYUFBYSxDQUFBO2FBQzNCO1FBQ0wsQ0FBQztLQUNKLENBQUE7SUEvQkc7UUFEQyxlQUFLLEVBQUU7OzBEQU1OO0lBUEEsZUFBZTtRQUpwQixtQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLHVCQUF1QjtTQUNwQyxDQUFDOztPQUNJLGVBQWUsQ0FpQ3BCO0FBQ0wsQ0FBQyxDQUFBO0FBRVEsMERBQXVCIn0=