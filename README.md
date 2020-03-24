### Useful Links

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions#Detecting_the_start_and_completion_of_a_transition

https://stackoverflow.com/questions/9255279/callback-when-css3-transition-finishes

crossbrowser transitions: https://gist.github.com/davidcalhoun/702826

http://jsfiddle.net/swfour/M2B9B/14/ css auto hide

https://devblogs.microsoft.com/typescript/typescript-and-babel-7/

https://github.com/karlhorky/typescript-tricks

## Plumejs repo
[here](https://github.com/kiranmantha/plumejs)

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
import { IToggleInput, ToggleComponent } from 'plumejs-ui';

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