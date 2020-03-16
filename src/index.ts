import { Component, html, Route, Router, TranslationService, Input } from "plumejs";
import en from "./i18n/en";
import fr from "./i18n/fr";
import { ModalService, NotificationService } from "./ui";

@Component({
	selector: "app-root",
	styleUrl: "main.scss",
	root: true
})
export class AppRoot {
	constructor(
		private router: Router,
		private translations: TranslationService,
		private modalsrvc: ModalService,
		private notifySrvc: NotificationService
	) {
		translations.setTranslate(en, "en");
		translations.setTranslate(fr, "fr");
		translations.setDefaultLanguage("en");
	}

	routes: Array<Route> = [
		{
			path: "",
			redirectTo: "/todos"
		},
		{
			path: "/todos",
			template: "<todo-list></todo-list>",
			templatePath: () => import("./todos/index")
		},
		{
			path: "/persons/:id",
			template: "<persons-list></persons-list>",
			templatePath: () => import("./persons/index")
		}
	];

	notify(){
		this.notifySrvc.sendMessage('hello world');
	}

	navigateTo(path: string) {
		this.router.navigateTo(path);
	}

	openModal() {
		const modal = this.modalsrvc.show({
			renderTemplate: () => html`<nested-modal nestedModalData=${{message: 'Hello World'}}></nested-modal>`,
			modalTitle: "testing modal",
			modalClass: "sample-class",
		});

		modal.onOpen.subscribe(() => {
			console.log("main modal open");
		});

		modal.onClose.subscribe(() => {
			console.log("main modal closed");
		});
	}

	render() {
		return html`
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<a class="navbar-brand" href="#" onclick=${()=>{ this.navigateTo('/todos') }}>PlumeJS</a>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav mr-auto">
						<li class="nav-item active">
							<a
								class="nav-link"
								href="#"
								onclick=${() => {
									this.navigateTo("/todos");
								}}
								>Todos
							</a>
						</li>
						<li class="nav-item active">
							<a
								class="nav-link"
								href="#"
								onclick=${() => {
									this.navigateTo("/persons/123");
								}}
								>Persons</a
							>
						</li>
						<li class="nav-item dropdown">
							<select
								class="form-control"
								onchange=${(e: any) => {
									this.translations.setDefaultLanguage(e.target.value);
								}}
							>
								<option value="en">EN</option>
								<option value="fr">FR</option>
							</select>
						</li>
					</ul>
				</div>
			</nav>
			<div class="container">
				<h2 class="mb-3">
					This text is common for both todos and persons components
				</h2>
				<div>
					This is a translated value
					<span
						innerHTML=${"username.greet".translate({ name: "kiran" })}
					></span>
				</div>
				<button
					class="btn btn-sm btn-primary"
					onclick=${() => {
						this.openModal();
					}}
				>
					Open Modal
				</button>
				<button class='btn btn-sm btn-primary' style='margin-left: 10px;' onclick=${() => { this.notify(); }}>Notify</button>
				<router-outlet routes=${this.routes}></router-outlet>
			</div>
		`;
	}
}

@Component({
	selector: "nested-modal"
})
class NestedModal {
	constructor(private modalsrvc: ModalService) {}

	@Input()
	nestedModalData:any = {};

	openAnotherModal() {
		const modal = this.modalsrvc.show({
			renderTemplate: () => html`<div>i'm nested modal</div>`,
			modalTitle: "nested modal",
			modalClass: "nested-class"
		});

		modal.onOpen.subscribe(() => {
			console.log("nested modal open");
		});

		modal.onClose.subscribe(() => {
			console.log("nested modal closed");
		});
	}

	render() {
		return html`
			<div>sample modal</div>
			<div>${ this.nestedModalData.message }</div>
			<button
				class="btn btn-sm btn-primary"
				onclick=${() => {
					this.openAnotherModal();
				}}
			>
				open another modal
			</button>
		`;
	}
}
