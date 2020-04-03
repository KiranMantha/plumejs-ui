[![GitHub contributors](https://img.shields.io/github/contributors/kiranmantha/plumejs-ui)](https://GitHub.com/KiranMantha/plumejs-ui/graphs/contributors/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[![npm](https://img.shields.io/npm/dw/plumejs-ui)](https://www.npmjs.com/package/plumejs-ui)  [![npm](https://img.shields.io/npm/v/plumejs-ui)](https://www.npmjs.com/package/plumejs-ui)

Demo [here](https://kiranmantha.github.io/plumejs/#/controls). Check console logs for further details.

### Useful Links

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions#Detecting_the_start_and_completion_of_a_transition

https://stackoverflow.com/questions/9255279/callback-when-css3-transition-finishes

crossbrowser transitions: https://gist.github.com/davidcalhoun/702826

http://jsfiddle.net/swfour/M2B9B/14/ css auto hide

https://devblogs.microsoft.com/typescript/typescript-and-babel-7/

https://github.com/karlhorky/typescript-tricks

## Plumejs repo
Please find the documentation [here](https://github.com/kiranmantha/plumejs).

## Installation
`npm i -S plumejs-ui`

### Changes needed in your application

Update your plumejs application's `base.config.js` as:

from

```
const scssMap = fromDir(path.resolve(__dirname, appconstants.sourceDir, '.scss');
```

to

```
appconstants.plumeuiDir = '../node_modules/plumejs-ui'

const scssMap = fromDir([path.resolve(__dirname, appconstants.sourceDir), path.resolve(__dirname, appconstants.plumeuiDir)], '.scss');
```

## Modal Service

ModalService exposes three methods show, close and closeAll. Inorder to use this service:

```
import { ModalService, IModal } from 'plumejs-ui';

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

```
import { NotificationService, NotificationType } from 'plumejs-ui';

@Component({
    selector: 'your-selector'
})
class YourComponent {
    constructor(private notifySrvc: NotificationService){}

    showNotification() {
        //sendMessage accepts two arguments, text and optional notification type
        //By default info type is displayed
        this.notifySrvc.sendMessage('hello world');

        // This display notification with danger type
        this.notifySrvc.sendMessage('hello world', NotificationType.Danger);
    }
}
```

## Toggle Button

Toggle button provide a switch interface. It accepts input `toggleOptions`. It can be used as:

```
import { IToggleInput, registerToggleComponent } from 'plumejs-ui';

registerToggleComponent(); // Call this function in your root component. No need to execute this when ever you import.

@Component({
    selector: 'my-comp'
})
class MyComponent {
    toggleInput:IToggleInput = {
        onchange: this.onToggleChange // executed when toggle change. Required.
        onText: 'my.translation' // string. also works for translation or normal text. Optional. will not display text when not passed.
        offText: 'my.translation' // string. also works for translation or normal text. Optional. will not display text when not passed.
        isSelected: true // boolean. set the initial state of toggle switch. will be false by default. Optional
    }

    constructor() {
        this.onToggleChange = this.onToggleChange.bind(this);
    }

    onToggleChange(_checked: boolean) {
        console.log(_checked);
    }

    render() {
        return html`
            <toggle-button toggleOptions=${ this.toggleInput }></toggle-button>
        `
    }
}
```

## Multi-select Dropdown

This component can replace traditional html dropdown and also can be transformed as multi select dropdown. To use this:

```
import { IMultiSelectOptions, registerMultiSelectComponent } from 'plumejs-ui';

registerMultiSelectComponent(); // Call this function in your root component. No need to execute this when ever you import.

@Component({
    selector: 'your-selector'
})
class YourComponent {
    multiSelectOptions: IMultiSelectOptions = {
        // The items collection to display in dropdown list. Required
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

        // The property of item in items collection which needs to display as option text. This can't be a nested property. Required.
		displayField: 'name',

        // The flag which helps to render as single select or multi select dropdown. Default false. Optional.
		multiple: false,

        // The flag which enable search to find option in log dropdown list. Default false. Will work for both single select/ multi select lists. Optional.
		enableFilter: true,

        // The flag to disable dropdown. Default false. Optional.
		disableDropdown: false,

        // Default button text when no item is selected. Default 'Select'. Optional.
        nonSelectedText: 'Select',

        // The function used to display custom text in the case of multi select list. The argument `options` is the options selected in multi select. By default the button text is displayed as comma seperated options. Optional.
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

        // A listener function to get selected option. The option will be a simple object in the case of single select or an array of objects in the case of multi select. Required.
		onchange: (selectedOption: any) => { console.log(selectedOption); }

        // A boolean flag used to reset multi select widget
        resetWidget: false
	}

    render() {
        return html`
            <multi-select multiSelectOptions=${ this.multiSelectOptions }></multi-select>
        `;
    }
}

```