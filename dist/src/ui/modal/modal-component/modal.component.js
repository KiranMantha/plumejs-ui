import { __decorate, __metadata } from "tslib";
import { Component, DomTransition, html, Input, useRef } from "@plumejs/core";
import { Subject } from "rxjs";
import modalComponentStyles from './modal.component.scss';
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
            this.modalContentRef = useRef(null);
            this.onClose = new Subject();
            this.onOpen = new Subject();
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
            return html `
				<div class='modalDialog'>
					<div
						ref=${this.modalContentRef}
						class=${`modalDialog-content  ${this.modalData.isModalOpen ? "in out" : "out"}`}
					>
						<div class="title">
							${this.modalData.title}
							${this.modalData.hideDefaultCloseButton
                ? html ``
                : html `
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
    __decorate([
        Input,
        __metadata("design:type", Object)
    ], ModalComponent.prototype, "modalData", void 0);
    ModalComponent = __decorate([
        Component({
            selector: "modal-dialog",
            styles: modalComponentStyles
        }),
        __metadata("design:paramtypes", [DomTransition])
    ], ModalComponent);
};
export default registerModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL21vZGFsL21vZGFsLWNvbXBvbmVudC9tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQU8sTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxvQkFBb0IsTUFBTSx3QkFBd0IsQ0FBQztBQUUxRCxNQUFNLHNCQUFzQixHQUFHLEdBQUcsRUFBRTtJQUtuQyxJQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFjO1FBQ25CLFlBQW9CLE9BQXNCO1lBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7WUFHMUMsY0FBUyxHQUFlO2dCQUN2QixFQUFFLEVBQUUsQ0FBQztnQkFDTCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxZQUFZLEVBQUUsRUFBRTtnQkFDaEIsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLHNCQUFzQixFQUFFLEtBQUs7YUFDN0IsQ0FBQztZQUVGLG9CQUFlLEdBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVqRCxZQUFPLEdBQWtCLElBQUksT0FBTyxFQUFFLENBQUM7WUFDdkMsV0FBTSxHQUFrQixJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ3RDLHVCQUFrQixHQUFXLEdBQUcsQ0FBQztRQWhCYSxDQUFDO1FBa0J2QyxLQUFLLENBQUMsS0FBVTtZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQzVCLEdBQUcsRUFBRTtnQkFDSixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLENBQUMsRUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQ3ZCLENBQUM7WUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDbkMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUVELEtBQUs7WUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQzVCLEdBQUcsRUFBRTtnQkFDSixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BCLENBQUMsRUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQ3ZCLENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFBOzs7WUFHRixJQUFJLENBQUMsZUFBZTtjQUNsQix3QkFBd0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FDMUUsRUFBRTs7O1NBR0csSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO1NBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCO2dCQUN6QyxDQUFDLENBQUMsSUFBSSxDQUFBLEVBQUU7Z0JBQ1IsQ0FBQyxDQUFDLElBQUksQ0FBQTs7O3FCQUdVLENBQUMsS0FBVSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztXQUloRDs7O1NBR0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZOzs7O0lBSWhDLENBQUM7UUFDSCxDQUFDO0tBQ0QsQ0FBQTtJQWpFQTtRQURDLEtBQUs7O3FEQVFKO0lBWEcsY0FBYztRQUpuQixTQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsY0FBYztZQUN4QixNQUFNLEVBQUUsb0JBQW9CO1NBQzVCLENBQUM7eUNBRTRCLGFBQWE7T0FEckMsY0FBYyxDQXFFbkI7QUFDRixDQUFDLENBQUM7QUFDRixlQUFlLHNCQUFzQixDQUFDIn0=