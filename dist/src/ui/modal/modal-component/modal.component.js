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
                modalClass: "",
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
				<div class=${`modalDialog ${this.modalData.modalClass} `}>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL21vZGFsL21vZGFsLWNvbXBvbmVudC9tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQTZFO0FBQzdFLCtCQUErQjtBQUcvQixNQUFNLHNCQUFzQixHQUFHLEdBQUcsRUFBRTtJQUtuQyxJQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFjO1FBQ25CLFlBQW9CLE9BQXNCO1lBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7WUFHMUMsY0FBUyxHQUFlO2dCQUN2QixFQUFFLEVBQUUsQ0FBQztnQkFDTCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxZQUFZLEVBQUUsRUFBRTtnQkFDaEIsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLHNCQUFzQixFQUFFLEtBQUs7YUFDN0IsQ0FBQztZQUVGLG9CQUFlLEdBQXFCLGdCQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFakQsWUFBTyxHQUFrQixJQUFJLGNBQU8sRUFBRSxDQUFDO1lBQ3ZDLFdBQU0sR0FBa0IsSUFBSSxjQUFPLEVBQUUsQ0FBQztZQUN0Qyx1QkFBa0IsR0FBVyxHQUFHLENBQUM7UUFqQlksQ0FBQztRQW1CdEMsS0FBSyxDQUFDLEtBQVM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUM1QixHQUFHLEVBQUU7Z0JBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQixDQUFDLEVBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUN2QixDQUFDO1lBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ25DLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFFRCxLQUFLO1lBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUM1QixHQUFHLEVBQUU7Z0JBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQixDQUFDLEVBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUN2QixDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU07WUFDTCxPQUFPLGNBQUksQ0FBQTtpQkFDRyxlQUFlLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHOztZQUVoRCxJQUFJLENBQUMsZUFBZTtjQUNsQix3QkFDUCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUN6QyxFQUFFOzs7U0FHQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUs7U0FDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0I7Z0JBQ3RDLENBQUMsQ0FBQyxjQUFJLENBQUEsRUFBRTtnQkFDUixDQUFDLENBQUMsY0FBSSxDQUFBOzs7cUJBR08sQ0FBQyxLQUFTLEVBQUMsRUFBRSxHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O1dBSTdDOzs7U0FHRCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWE7Ozs7SUFJbEMsQ0FBQztRQUNILENBQUM7S0FDRCxDQUFBO0lBbkVBO1FBREMsZUFBSyxFQUFFOztxREFTTjtJQVpHLGNBQWM7UUFKbkIsbUJBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxzQkFBc0I7U0FDaEMsQ0FBQztpREFFNEIsdUJBQWE7T0FEckMsY0FBYyxDQXVFbkI7QUFDRixDQUFDLENBQUM7QUFDRixrQkFBZSxzQkFBc0IsQ0FBQyJ9