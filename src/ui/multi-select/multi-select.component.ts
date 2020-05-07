import { Component, html, Input, useRef, Ref, IHooks } from 'plumejs';
import { Subscription } from 'rxjs';
import { windowClick } from '../../window-event.observable';
import { IMultiSelectOptions } from './multi-select.interface';
import multiselectStyles from './multi-select.component.scss';

const registerMultiSelectComponent = () => {
    @Component({
        selector: 'multi-select',
        styles: multiselectStyles
    })
    class MultiSelectComponent implements IHooks {

        @Input()
        multiSelectOptions: IMultiSelectOptions = {
            data: [],
            displayField: '',
            onchange: (selectedOption: any) => { console.log(selectedOption); }
        };

        private _windowClickListner: Subscription;
        private _showPopup: boolean = false;
        private _selectedOptions: Array<any> = [];
        private _buttonText: string;
        private _popupContainer: Ref<HTMLDivElement> = useRef(null);
        private _searchText: string = '';
        private _selectItemsListContainer: Ref<HTMLDivElement> = useRef(null);
        update: () => void;

        constructor() {
            this._onButtonClickTrigger = this._onButtonClickTrigger.bind(this);
            this._filterList = this._filterList.bind(this);
        }

        inputChanged(oldValue:IMultiSelectOptions, newValue: IMultiSelectOptions) {
            if(!!newValue.resetWidget) {
                this._selectedOptions = [];
                this._buttonText = this.multiSelectOptions.nonSelectedText || 'Select';
                this._deselectInputonreset();
            }
        }

        mount() {
            this._windowClickListner = windowClick.subscribe((e: Event) => {
                this._showPopup = false;
                this.update();
            });

            this._buttonText = this.multiSelectOptions.nonSelectedText || 'Select';
        }

        unmount() {
            this._windowClickListner.unsubscribe();
        }

        private _deselectInputonreset() {
            this._selectItemsListContainer.current.querySelectorAll('.active').forEach(i => {
                i.classList.remove('active');
                i.querySelector('input').checked = false;
            });
        }

        private _onButtonClickTrigger(e: Event) {
            this._showPopup = true;
            this._searchText = '';
            this._filterItems(this._searchText.toLowerCase());
            this.update();
        }

        private _preventClickPropagation(e: Event) {
            e.stopPropagation();
        }

        private _clearSelectionIfNotMultiple(isMultiple: boolean) {
            if (!isMultiple) {
                this._popupContainer.current.querySelectorAll('.active').forEach(i => i.classList.remove('active'));
            }
        }

        private _setButtontext(isMultiple:boolean, displayField: string) {            
            if (isMultiple) {
                if (!!this.multiSelectOptions.buttonText) {
                    this._buttonText = this.multiSelectOptions.buttonText(this._selectedOptions);
                } else {
                    this._buttonText = this._selectedOptions.map((item: any) => item[displayField]).join(',');
                    if (this._selectedOptions.length === 0) this._buttonText = this.multiSelectOptions.nonSelectedText || 'Select';
                }
            } else {
                this._buttonText = this._selectedOptions[0][displayField];
            }
        }

        private _setupSelectedOptions(isMultiple: boolean, selectedOption: any) {
            if(isMultiple) {
                this._selectedOptions.push(selectedOption);
            } else {
                this._selectedOptions = [selectedOption];
            }
        }

        private _onOptionSelected(e: Event, selectedOption: any) {
            let target: any = e.target;
            let isInputChecked = target.checked;
            let displayField = this.multiSelectOptions.displayField;
            let isMultiple = !!this.multiSelectOptions.multiple;
            let _selectedValue: any;
            this._clearSelectionIfNotMultiple(isMultiple);

            if (isInputChecked) {
                target.parentElement.classList.add('active');
                this._setupSelectedOptions(isMultiple, selectedOption);
            } else {
                target.parentElement.classList.remove('active');
                this._selectedOptions = this._selectedOptions.filter((item: any) => {
                    if (item[displayField] !== selectedOption[displayField]) {
                        return item;
                    }
                });
            }
            _selectedValue = isMultiple ? this._selectedOptions : this._selectedOptions[0];
            this._setButtontext(isMultiple, displayField);
            this.multiSelectOptions.onchange(_selectedValue);
            if(!isMultiple) this._showPopup = false;
            this.update();
        }

        private _filterList(e: Event) {
            this._searchText = (e.target as HTMLInputElement).value;
            this._filterItems(this._searchText.toLowerCase());
        }

        private _filterItems(filterText: string) {
            Array.from(this._selectItemsListContainer.current.children).forEach((element: HTMLLabelElement) => {
                let itemText = element.textContent || element.innerText;
                if (filterText) {
                    if (itemText.toLowerCase().indexOf(filterText) !== -1) {
                        element.classList.remove('hide-item');
                    } else {
                        element.classList.add('hide-item');
                    }
                } else {
                    element.classList.remove('hide-item');
                }
            });
        }

        private _buildItem(item: any, index) {
            if (this.multiSelectOptions.multiple) {
                return html`
                <label for='id-${ index }' class='select-item'>
                    <input name='select' id='id-${ index }' type='checkbox' onchange=${(e: Event) => { this._onOptionSelected(e, item); }}/>
                    ${ item[this.multiSelectOptions.displayField]}
                </label>`;
            } else {
                return html`
                <label for='id-${ index}' class='select-item'>
                    <input name='select' id='id-${ index}' type='radio' onchange=${(e: Event) => { this._onOptionSelected(e, item); }}/>
                    ${ item[this.multiSelectOptions.displayField]}
                </label>`;
            }
        }

        render() {
            if (this.multiSelectOptions.data.length > 0) {
                return html`
                <div class='multi-select-container' onclick=${this._preventClickPropagation}>
                    <button class='multi-select-trigger' onclick=${this._onButtonClickTrigger} disabled=${!!this.multiSelectOptions.disableDropdown}>
                        ${ this._buttonText.translate()}
                    </button>
                    <div ref=${ this._popupContainer} class=${`multi-select-popup ${this._showPopup ? 'show-popup' : ''}`}>
                        ${
                    (() => {
                        if (!!this.multiSelectOptions.enableFilter) {
                            return html`
                                <div class='multi-select-filter'>
                                    <input class='filter-input' type='text' value='${ this._searchText}' onkeyup=${this._filterList} />
                                </div>
                            `;
                        }
                    })()
                    }
                        <div class='select-items-list' ref=${ this._selectItemsListContainer}>
                            ${
                                this.multiSelectOptions.data.map((item: any, index: Number) => {
                                    return this._buildItem(item, index);
                                })
                            }
                        </div>                    
                    </div>
                </div>
            `;
            } else {
                return html`<div></div>`;
            }
        }
    }
}

export { registerMultiSelectComponent };