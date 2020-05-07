"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const plumejs_1 = require("plumejs");
const rxjs_1 = require("rxjs");
const modal_component_scss_1 = tslib_1.__importDefault(require("./modal.component.scss"));
const registerModalComponent = () => {
    let ModalComponent = class ModalComponent {
        constructor(domSrvc) {
            this.domSrvc = domSrvc;
            this.modalData = {
                Id: 0,
                title: "",
                bodyTemplate: "",
                backdrop: false,
                isModalOpen: false,
                hideDefaultCloseButton: false
            };
            this.modalContentRef = plumejs_1.useRef(null);
            this.onClose = new rxjs_1.Subject();
            this.onOpen = new rxjs_1.Subject();
            this.transitionDuration = 300;
        }
        close(event) {
            this.domSrvc.onTransitionEnd(this.modalContentRef.current, () => {
                this.onClose.next();
            }, this.transitionDuration);
            this.modalData.isModalOpen = false;
            this.update();
        }
        mount() {
            this.domSrvc.onTransitionEnd(this.modalContentRef.current, () => {
                this.onOpen.next();
            }, this.transitionDuration);
        }
        render() {
            return plumejs_1.html `
				<div class='modalDialog'>
					<div
						ref=${this.modalContentRef}
						class=${`modalDialog-content  ${this.modalData.isModalOpen ? "in out" : "out"}`}
					>
						<div class="title">
							${this.modalData.title}
							${this.modalData.hideDefaultCloseButton
                ? plumejs_1.html ``
                : plumejs_1.html `
										<button
											class="btn-close"
											onclick=${(event) => { this.close(event); }}
										>
											&times;
										</button>
								  `}
						</div>
						<div>
							${this.modalData.bodyTemplate}
						</div>
					</div>
				</div>
			`;
        }
    };
    tslib_1.__decorate([
        plumejs_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], ModalComponent.prototype, "modalData", void 0);
    ModalComponent = tslib_1.__decorate([
        plumejs_1.Component({
            selector: "modal-dialog",
            styles: modal_component_scss_1.default
        }),
        tslib_1.__metadata("design:paramtypes", [plumejs_1.DomTransition])
    ], ModalComponent);
};
exports.default = registerModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL21vZGFsL21vZGFsLWNvbXBvbmVudC9tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQTZFO0FBQzdFLCtCQUErQjtBQUUvQiwwRkFBMEQ7QUFFMUQsTUFBTSxzQkFBc0IsR0FBRyxHQUFHLEVBQUU7SUFLbkMsSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBYztRQUNuQixZQUFvQixPQUFzQjtZQUF0QixZQUFPLEdBQVAsT0FBTyxDQUFlO1lBRzFDLGNBQVMsR0FBZTtnQkFDdkIsRUFBRSxFQUFFLENBQUM7Z0JBQ0wsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixzQkFBc0IsRUFBRSxLQUFLO2FBQzdCLENBQUM7WUFFRixvQkFBZSxHQUFxQixnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWpELFlBQU8sR0FBa0IsSUFBSSxjQUFPLEVBQUUsQ0FBQztZQUN2QyxXQUFNLEdBQWtCLElBQUksY0FBTyxFQUFFLENBQUM7WUFDdEMsdUJBQWtCLEdBQVcsR0FBRyxDQUFDO1FBaEJZLENBQUM7UUFrQnRDLEtBQUssQ0FBQyxLQUFTO1lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFDNUIsR0FBRyxFQUFFO2dCQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckIsQ0FBQyxFQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FDdkIsQ0FBQztZQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUNuQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixDQUFDO1FBRUQsS0FBSztZQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFDNUIsR0FBRyxFQUFFO2dCQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEIsQ0FBQyxFQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FDdkIsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNO1lBQ0wsT0FBTyxjQUFJLENBQUE7OztZQUdGLElBQUksQ0FBQyxlQUFlO2NBQ2xCLHdCQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQ3pDLEVBQUU7OztTQUdDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztTQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQjtnQkFDdEMsQ0FBQyxDQUFDLGNBQUksQ0FBQSxFQUFFO2dCQUNSLENBQUMsQ0FBQyxjQUFJLENBQUE7OztxQkFHTyxDQUFDLEtBQVMsRUFBQyxFQUFFLEdBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7V0FJN0M7OztTQUdELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBYTs7OztJQUlsQyxDQUFDO1FBQ0gsQ0FBQztLQUNELENBQUE7SUFsRUE7UUFEQyxlQUFLLEVBQUU7O3FEQVFOO0lBWEcsY0FBYztRQUpuQixtQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGNBQWM7WUFDeEIsTUFBTSxFQUFFLDhCQUFvQjtTQUM1QixDQUFDO2lEQUU0Qix1QkFBYTtPQURyQyxjQUFjLENBc0VuQjtBQUNGLENBQUMsQ0FBQztBQUNGLGtCQUFlLHNCQUFzQixDQUFDIn0=