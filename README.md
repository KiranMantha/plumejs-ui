[![GitHub contributors](https://img.shields.io/github/contributors/kiranmantha/plumejs-ui)](https://GitHub.com/KiranMantha/plumejs-ui/graphs/contributors/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://GitHub.com/KiranMantha/plumejs-ui/pulls)

[![npm](https://img.shields.io/npm/dw/@plumejs/ui)](https://www.npmjs.com/package/@plumejs/ui) [![npm](https://img.shields.io/npm/v/@plumejs/ui)](https://www.npmjs.com/package/@plumejs/ui) [![Dependencies](https://img.shields.io/badge/Dependencies-%40plumejs%2Fcore-green)](https://GitHub.com/KiranMantha/plumejs)

Demo [here](https://kiranmantha.github.io/plumejs/#/controls). Check console logs for further details.

### Useful Links

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions#Detecting_the_start_and_completion_of_a_transition

https://stackoverflow.com/questions/9255279/callback-when-css3-transition-finishes

crossbrowser transitions: https://gist.github.com/davidcalhoun/702826

http://jsfiddle.net/swfour/M2B9B/14/ css auto hide

https://devblogs.microsoft.com/typescript/typescript-and-babel-7/

https://github.com/karlhorky/typescript-tricks

# PlumeJs UI

This module is a collection of UI components built using [PlumeJs](https://github.com/kiranmantha/plumejs).

## Installation

`npm i -S @plumejs/ui`

## Upcoming

Tabs Component

## Changes needed in your application

Update your plumejs application's `base.config.js` as:

from

```javascript
{
    test: /\.(s*)css$/,
    exclude: /node_modules/,
    use: ['css-loader', 'sass-loader']
}
```

to

```javascript
{
    test: /\.(s*)css$/,
    use: ['css-loader', 'sass-loader']
}
```

## Modal Service

ModalService exposes three methods show, close and closeAll. Inorder to use this service:

```typescript
import { Component } from '@plumejs/core';
import { ModalService, IModal } from '@plumejs/ui';

@Component({
    selector: 'your-selector'
})
class YourComponent {
    modal:IModal;

    constructor(private modalService:ModalService){ }

    showModal() {
        //show method returns IModal interface which have property `Id` and methods `onOpen, onClose`
        this.modal = this.modalsrvc.show({
			renderTemplate: () => html`<div>Hello World</div>`,
			modalTitle: "testing modal",
			modalClass: "sample-class" //optional property to add custom class to modal dialog which allows customization
            hideDefaultCloseButton: true //optional property to hide modal's close button
            backdrop: true //optional property to show or hide modal backdrop
		});

		this.modal.onOpen.subscribe(() => {
			console.log("main modal open: ", this.modal.Id);
		});

		this.modal.onClose.subscribe(() => {
			console.log("main modal closed");
		});
    }

    closeModal() {
        //close method used to close modal dialog and accepts modal reference
        this.modalsrvc.close(this.modal);
    }

    closeAllModals() {
        //closeAll method is used to close all opened modal dialogs
        this.modalsrvc.closeAll();
    }
}

```

## Notification Service

NotificationService is used to show simple notification. Inorder to use this

```typescript
import { Component } from '@plumejs/core';
import { NotificationService, NotificationType } from '@plumejs/ui';

@Component({
  selector: 'your-selector'
})
class YourComponent {
  constructor(private notifySrvc: NotificationService) {}

  showNotification() {
    //sendMessage accepts two arguments, text and optional notification type
    //By default info type is displayed
    this.notifySrvc.sendMessage('hello world');

    // This display notification with danger type
    this.notifySrvc.sendMessage('hello world', NotificationType.Danger);

    // This display auto hide notification after 2sec
    this.notifySrvc.sendMessage('hello world', NotificationType.Info, true);
  }
}
```

## Toggle Button

Toggle button provide a switch interface. It accepts input `toggleOptions`. It can be used as:

```typescript
import { Component, html, ComponentRef } from '@plumejs/core';
import { IToggleInput, ToggleComponent } from '@plumejs/ui';

@Component({
    selector: 'my-comp'
})
class MyComponent {
    toggleRef: ComponentRef<ToggleComponent>;
    toggleInput:IToggleInput = {
        onchange: (checked: boolean) => { this.onToggleChange(checked); } // executed when toggle change. Required.
        onText: 'my.translation' // string. also works for translation or normal text. Optional. will not display text when not passed.
        offText: 'my.translation' // string. also works for translation or normal text. Optional. will not display text when not passed.
        isSelected: true // boolean. set the initial state of toggle switch. will be false by default. Optional
    }

    mount() {
        this.toggleRef.setProps(this.toggleInput);
    }

    onToggleChange(_checked: boolean) {
        console.log(_checked);
    }

    render() {
        return html`
            <toggle-button ref=${(node) => { this.toggleRef = node; }}></toggle-button>
        `
    }
}
```

## Multi-select Dropdown

This component can replace traditional html dropdown and also can be transformed as multi select dropdown. To use this:

```typescript
import { Component, html, ComponentRef } from '@plumejs/core';
import { IMultiSelectOptions, MultiSelectComponent } from '@plumejs/ui';

@Component({
    selector: 'your-selector'
})
class YourComponent {
    multiSelectRef: ComponentRef<MultiSelectComponent>;
    multiSelectOptions: IMultiSelectOptions = {
        // The items collection to display in dropdown list.
        // The items can be objects or strings.
        // Required
		data: [{
			name: 'option1'
		}, {
            name: 'option2'
        },{
            name: 'option3'
        },{
            name: 'option4'
        },{
            name: 'option5'
        }],

        // The property to preselect items in dropdown.
        // Accepts object array or string array.
        // Optional
        selectedValues: [{
			name: 'option1'
		}, {
            name: 'option2'
        }],

        // The property of item in items collection which needs to display as option text.
        // This can't be a nested property.
        // Optional. Not required if data is string array.
		displayField: 'name',

        // The flag which helps to render as single select or multi select dropdown. Default false.
        // Optional.
		multiple: false,

        // The flag which enable search to find option in log dropdown list. Default false.
        // Will work for both single select/ multi select lists.
        // Optional.
		enableFilter: true,

        // The flag to disable dropdown. Default false.
        // Optional.
		disableDropdown: false,

        // Default button text when no item is selected. Default 'Select'.
        // Optional.
        nonSelectedText: 'Select',

        // The function used to display custom text in the case of multi select list.
        // The argument `options` is the options selected in multi select.
        // By default the button text is displayed as comma seperated options.
        // Optional.
		buttonText: (options:Array<any>) => {
			if (options.length === 0) {
				return 'None selected';
			}
			else if (options.length > 3) {
				return options.length + ' selected';
			} else {
				return options.map(i=>i.name).join(', ');
			}
		},

        // A listener function to get selected option.
        // If data is object array, option will be a simple object in the case of single select or an array of objects in the case of multi select.
        // If data is string array, option will be a string in the case of single select or an array of strings in the case of multi select.
        // Required.
		onchange: (selectedOption: any) => { console.log(selectedOption); }

        // A boolean flag used to reset multi select widget.
        // Optional
        resetWidget: false
	}

    mount() {
        this.multiSelectRef.setProps(this.multiSelectOptions);
    }

    render() {
        return html`
            <multi-select ref=${(node) => { this.multiSelectRef = node; }}></multi-select>
        `;
    }
}

```
