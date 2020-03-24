"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const plumejs_1 = require("plumejs");
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
exports.ToggleComponent = ToggleComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS90b2dnbGUvdG9nZ2xlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBaUQ7QUFhakQsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQVd4QjtRQVRBLGtCQUFhLEdBQWlCO1lBQzFCLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO1lBQ2xCLE1BQU0sRUFBRSxFQUFFO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUsS0FBSztTQUNwQixDQUFDO1FBRU0sUUFBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUd4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxZQUFZLENBQUMsQ0FBTztRQUNoQixJQUFJLEtBQUssR0FBSSxDQUFDLENBQUMsTUFBYyxDQUFDLE9BQU8sQ0FBQztRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUU7WUFDNUIsT0FBTyxjQUFJLENBQUE7OzRCQUVNLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRztpREFDcEQsSUFBSSxDQUFDLEdBQUksY0FBZSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFXLGNBQWMsSUFBSSxDQUFDLFlBQVk7a0NBQ3ZHLElBQUksQ0FBQyxHQUFHOzRCQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRzt1QkFDN0UsQ0FBQztTQUNmO2FBQU07WUFDSCxPQUFPLGNBQUksQ0FBQSxhQUFhLENBQUE7U0FDM0I7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQS9CRztJQURDLGVBQUssRUFBRTs7c0RBTU47QUFQTyxlQUFlO0lBSjNCLG1CQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZUFBZTtRQUN6QixRQUFRLEVBQUUsdUJBQXVCO0tBQ3BDLENBQUM7O0dBQ1csZUFBZSxDQWlDM0I7QUFqQ1ksMENBQWUifQ==