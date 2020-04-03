"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const plumejs_1 = require("plumejs");
const rxjs_1 = require("rxjs");
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
            styleUrl: "modal.component.scss"
        }),
        tslib_1.__metadata("design:paramtypes", [plumejs_1.DomTransition])
    ], ModalComponent);
};
exports.default = registerModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL21vZGFsL21vZGFsLWNvbXBvbmVudC9tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQTZFO0FBQzdFLCtCQUErQjtBQUcvQixNQUFNLHNCQUFzQixHQUFHLEdBQUcsRUFBRTtJQUtuQyxJQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFjO1FBQ25CLFlBQW9CLE9BQXNCO1lBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7WUFHMUMsY0FBUyxHQUFlO2dCQUN2QixFQUFFLEVBQUUsQ0FBQztnQkFDTCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxZQUFZLEVBQUUsRUFBRTtnQkFDaEIsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLHNCQUFzQixFQUFFLEtBQUs7YUFDN0IsQ0FBQztZQUVGLG9CQUFlLEdBQXFCLGdCQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFakQsWUFBTyxHQUFrQixJQUFJLGNBQU8sRUFBRSxDQUFDO1lBQ3ZDLFdBQU0sR0FBa0IsSUFBSSxjQUFPLEVBQUUsQ0FBQztZQUN0Qyx1QkFBa0IsR0FBVyxHQUFHLENBQUM7UUFoQlksQ0FBQztRQWtCdEMsS0FBSyxDQUFDLEtBQVM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUM1QixHQUFHLEVBQUU7Z0JBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQixDQUFDLEVBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUN2QixDQUFDO1lBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ25DLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFFRCxLQUFLO1lBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUM1QixHQUFHLEVBQUU7Z0JBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQixDQUFDLEVBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUN2QixDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU07WUFDTCxPQUFPLGNBQUksQ0FBQTs7O1lBR0YsSUFBSSxDQUFDLGVBQWU7Y0FDbEIsd0JBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FDekMsRUFBRTs7O1NBR0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO1NBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCO2dCQUN0QyxDQUFDLENBQUMsY0FBSSxDQUFBLEVBQUU7Z0JBQ1IsQ0FBQyxDQUFDLGNBQUksQ0FBQTs7O3FCQUdPLENBQUMsS0FBUyxFQUFDLEVBQUUsR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztXQUk3Qzs7O1NBR0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFhOzs7O0lBSWxDLENBQUM7UUFDSCxDQUFDO0tBQ0QsQ0FBQTtJQWxFQTtRQURDLGVBQUssRUFBRTs7cURBUU47SUFYRyxjQUFjO1FBSm5CLG1CQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsc0JBQXNCO1NBQ2hDLENBQUM7aURBRTRCLHVCQUFhO09BRHJDLGNBQWMsQ0FzRW5CO0FBQ0YsQ0FBQyxDQUFDO0FBQ0Ysa0JBQWUsc0JBQXNCLENBQUMifQ==