import { Component, html, IHooks, Input } from "@plumejs/core";
import { Subscription } from "rxjs";
import { windowClick } from "../../window-event.observable";
import multiselectStyles from "./multi-select.component.scss";
import { IMultiSelectOptions } from "./multi-select.interface";

const registerMultiSelectComponent = () => {
	@Component({
		selector: "multi-select",
		styles: multiselectStyles,
	})
	class MultiSelectComponent implements IHooks {
		@Input
		multiSelectOptions: IMultiSelectOptions = {
			data: [],
			displayField: "",
			onchange: (selectedOption: any) => {
				console.log(selectedOption);
			},
			selectedValues: [],
		};

		private _windowClickListner: Subscription;
		private _showPopup: boolean = false;
		private _selectedOptions: Array<any> = [];
		private _buttonText: string;
		private _popupContainer: HTMLDivElement;
		private _searchText: string = "";
		private _selectItemsListContainer: HTMLDivElement;
		update: () => void;

		constructor() {
			this._onButtonClickTrigger = this._onButtonClickTrigger.bind(this);
			this._filterList = this._filterList.bind(this);
		}

		inputChanged(oldValue: IMultiSelectOptions, newValue: IMultiSelectOptions) {
			if (!!newValue.resetWidget) {
				this.multiSelectOptions.selectedValues = [];
				this._selectedOptions = [];
				this._buttonText = this.multiSelectOptions.nonSelectedText || "Select";
				this._deselectInputonreset();
			}
			this.multiSelectOptions.selectedValues = this.multiSelectOptions
				.selectedValues
				? this.multiSelectOptions.selectedValues
				: [];
			this._selectedOptions = this.multiSelectOptions.selectedValues;
			this._setButtonTextOnInit(this.multiSelectOptions.multiple);
		}

		mount() {
			this._windowClickListner = windowClick.subscribe((e: Event) => {
				this._showPopup = false;
				this.update();
			});

			this._buttonText = this.multiSelectOptions.nonSelectedText || "Select";
		}

		unmount() {
			this._windowClickListner.unsubscribe();
		}

		private _setButtonTextOnInit(isMultiple: boolean) {
			if (this._selectedOptions.length > 0) {
				let arrayType = typeof this._selectedOptions[0];
				let displayField =
					arrayType === "string" ? "" : this.multiSelectOptions.displayField;
				this._setButtontext(isMultiple, displayField);
			}
		}

		private _deselectInputonreset() {
			this._selectItemsListContainer
				.querySelectorAll(".active")
				.forEach((i) => {
					i.classList.remove("active");
					i.querySelector("input").checked = false;
				});
		}

		private _onButtonClickTrigger(e: Event) {
			this._showPopup = true;
			this._searchText = "";
			this._filterItems(this._searchText.toLowerCase());
			this.update();
		}

		private _preventClickPropagation(e: Event) {
			e.stopPropagation();
		}

		private _clearSelectionIfNotMultiple(isMultiple: boolean) {
			if (!isMultiple) {
				this._popupContainer
					.querySelectorAll(".active")
					.forEach((i) => i.classList.remove("active"));
			}
		}

		private _setButtontext(isMultiple: boolean, displayField: string) {
			if (isMultiple) {
				if (!!this.multiSelectOptions.buttonText) {
					this._buttonText = this.multiSelectOptions.buttonText(
						this._selectedOptions
					);
				} else {
					this._buttonText =
						displayField !== ""
							? this._selectedOptions
								.map((item: any) => item[displayField])
								.join(",")
							: this._selectedOptions.join(",");
					if (this._selectedOptions.length === 0)
						this._buttonText =
							this.multiSelectOptions.nonSelectedText || "Select";
				}
			} else {
				this._buttonText =
					displayField !== ""
						? this._selectedOptions[0][displayField]
						: this._selectedOptions[0];
			}
		}

		private _setupSelectedOptions(isMultiple: boolean, selectedOption: any) {
			if (isMultiple) {
				this._selectedOptions.push(selectedOption);
			} else {
				this._selectedOptions = [selectedOption];
			}
		}

		private _onOptionSelected(e: Event, selectedOption: any) {
			let target: any = e.target;
			let isInputChecked = target.checked;
			let displayField = this.multiSelectOptions.displayField || "";
			let isMultiple = !!this.multiSelectOptions.multiple;
			let _selectedValue: any;
			this._clearSelectionIfNotMultiple(isMultiple);

			if (isInputChecked) {
				target.parentElement.classList.add("active");
				this._setupSelectedOptions(isMultiple, selectedOption);
			} else {
				target.parentElement.classList.remove("active");
				this._selectedOptions = this._selectedOptions.filter((item: any) => {
					if (item[displayField] !== selectedOption[displayField]) {
						return item;
					}
				});
			}
			_selectedValue = isMultiple
				? this._selectedOptions
				: this._selectedOptions[0];
			this._setButtontext(isMultiple, displayField);
			this.multiSelectOptions.onchange(_selectedValue);
			if (!isMultiple) this._showPopup = false;
			this.update();
		}

		private _filterList(e: Event) {
			this._searchText = (e.target as HTMLInputElement).value;
			this._filterItems(this._searchText.toLowerCase());
		}

		private _filterItems(filterText: string) {
			Array.from(this._selectItemsListContainer.children).forEach(
				(element: HTMLLabelElement) => {
					let itemText = element.textContent || element.innerText;
					if (filterText) {
						if (itemText.toLowerCase().indexOf(filterText) !== -1) {
							element.classList.remove("hide-item");
						} else {
							element.classList.add("hide-item");
						}
					} else {
						element.classList.remove("hide-item");
					}
				}
			);
		}

		private _isItemExistsInSelectedValues(
			item: any,
			isMultiple: boolean
		): boolean {
			let index = -1;
			if (this.multiSelectOptions.selectedValues.length > 0) {
				if (typeof item === "string") {
					index = isMultiple
						? this.multiSelectOptions.selectedValues.indexOf(item as any)
						: [this.multiSelectOptions.selectedValues[0]].indexOf(item as any);
				} else {
					let _displayField = this.multiSelectOptions.displayField;
					index = isMultiple
						? (this.multiSelectOptions.selectedValues as any)
							.map((item) => item[_displayField])
							.indexOf(item[_displayField])
						: [this.multiSelectOptions.selectedValues[0]]
							.map((item) => item[_displayField])
							.indexOf(item[_displayField]);
				}
			}
			return index > -1 ? true : false;
		}

		private _buildItem(item: any, index) {
			let isMultiple = this.multiSelectOptions.multiple;
			let checked = this._isItemExistsInSelectedValues(item, isMultiple);
			let itemType = typeof item;
			if (isMultiple) {
				return html` <label for="id-${index}" class="select-item">
					<input
						name="select"
						id="id-${index}"
						type="checkbox"
						checked=${checked}
						onchange=${(e: Event) => {
						this._onOptionSelected(e, item);
					}}
					/>
					${itemType !== "string"
						? item[this.multiSelectOptions.displayField]
						: item}
				</label>`;
			} else {
				return html` <label for="id-${index}" class="select-item">
					<input
						name="select"
						id="id-${index}"
						type="radio"
						checked=${checked}
						onchange=${(e: Event) => {
						this._onOptionSelected(e, item);
					}}
					/>
					${itemType !== "string"
						? item[this.multiSelectOptions.displayField]
						: item}
				</label>`;
			}
		}

		render() {
			if (this.multiSelectOptions.data.length > 0) {
				return html`
					<div
						class="multi-select-container"
						onclick=${this._preventClickPropagation}
					>
						<button
							class="multi-select-trigger"
							onclick=${this._onButtonClickTrigger}
							disabled=${!!this.multiSelectOptions.disableDropdown}
						>
							${this._buttonText.translate()}
						</button>
						<div
							ref=${(node) => { this._popupContainer = node; }}
							class=${`multi-select-popup ${this._showPopup ? "show-popup" : ""
					}`}
						>
							${(() => {
						if (!!this.multiSelectOptions.enableFilter) {
							return html`
										<div class="multi-select-filter">
											<input
												class="filter-input"
												type="text"
												value="${this._searchText}"
												onkeyup=${this._filterList}
											/>
										</div>
									`;
						}
					})()}
							<div
								class="select-items-list"
								ref=${(node) => { this._selectItemsListContainer = node; }}
							>
								${(this.multiSelectOptions.data as any).map(
						(item: any, index: Number) => {
							return this._buildItem(item, index);
						}
					)}
							</div>
						</div>
					</div>
				`;
			} else {
				return html`<div></div>`;
			}
		}
	}
};

export { registerMultiSelectComponent };

