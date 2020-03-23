### Useful Links

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions#Detecting_the_start_and_completion_of_a_transition

https://stackoverflow.com/questions/9255279/callback-when-css3-transition-finishes

crossbrowser transitions: https://gist.github.com/davidcalhoun/702826

http://jsfiddle.net/swfour/M2B9B/14/ css auto hide

https://devblogs.microsoft.com/typescript/typescript-and-babel-7/

https://github.com/karlhorky/typescript-tricks

### Plumejs repo
[here](https://github.com/kiranmantha/plumejs)

### Installation
`npm i -S plume-ui`

### Modal Service

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

### Notification Service

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
