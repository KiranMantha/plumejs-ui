import { __decorate, __metadata } from "tslib";
import { Component, html, Input } from "@plumejs/core";
import toggleStyles from './toggle.component.scss';
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
                return html `
                <div class='toggle-container'>
                    <span>${this.toggleOptions.offText ? this.toggleOptions.offText.translate() : ''}</span>
                    <input type='checkbox' id='${this._id}' checked='${!!this.toggleOptions.isSelected}' onchange=${this.toggleChange}/>
                    <label for='${this._id}'></label>
                    <span>${this.toggleOptions.onText ? this.toggleOptions.onText.translate() : ''}</span>
                </div>`;
            }
            else {
                return html `<div></div>`;
            }
        }
    };
    __decorate([
        Input,
        __metadata("design:type", Object)
    ], ToggleComponent.prototype, "toggleOptions", void 0);
    ToggleComponent = __decorate([
        Component({
            selector: 'toggle-button',
            styles: toggleStyles
        }),
        __metadata("design:paramtypes", [])
    ], ToggleComponent);
};
export { registerToggleComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS90b2dnbGUvdG9nZ2xlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sWUFBWSxNQUFNLHlCQUF5QixDQUFDO0FBU25ELE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxFQUFFO0lBS2pDLElBQU0sZUFBZSxHQUFyQixNQUFNLGVBQWU7UUFZakI7WUFWQSxrQkFBYSxHQUFpQjtnQkFDMUIsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7Z0JBQ25CLE1BQU0sRUFBRSxFQUFFO2dCQUNWLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFVBQVUsRUFBRSxLQUFLO2FBQ3BCLENBQUM7WUFFTSxRQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1lBR3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUVELFlBQVksQ0FBQyxNQUFvQixFQUFFLE1BQW9CO1lBQ25ELElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7YUFDM0I7UUFDTCxDQUFDO1FBRUQsWUFBWSxDQUFDLENBQVE7WUFDakIsSUFBSSxLQUFLLEdBQUksQ0FBQyxDQUFDLE1BQWMsQ0FBQyxPQUFPLENBQUM7WUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVELE1BQU07WUFDRixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2xCLE9BQU8sSUFBSSxDQUFBOzs0QkFFQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7aURBQ25ELElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxjQUFjLElBQUksQ0FBQyxZQUFZO2tDQUNuRyxJQUFJLENBQUMsR0FBRzs0QkFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7dUJBQzNFLENBQUM7YUFDWDtpQkFBTTtnQkFDSCxPQUFPLElBQUksQ0FBQSxhQUFhLENBQUE7YUFDM0I7UUFDTCxDQUFDO0tBQ0osQ0FBQTtJQXRDRztRQURDLEtBQUs7OzBEQU1KO0lBUEEsZUFBZTtRQUpwQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixNQUFNLEVBQUUsWUFBWTtTQUN2QixDQUFDOztPQUNJLGVBQWUsQ0F3Q3BCO0FBQ0wsQ0FBQyxDQUFBO0FBRUQsT0FBTyxFQUFFLHVCQUF1QixFQUFnQixDQUFDIn0=