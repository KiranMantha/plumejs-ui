import { Injectable, Component, html, Input, Router } from "plumejs";

@Injectable()
export class PersonService {
	getPersons() {
		return fetch("https://jsonplaceholder.typicode.com/users").then(res =>
			res.json()
		);
	}
}

@Component({
	selector: "persons-list",
	styleUrl: 'persons/persons.scss'
})
class PersonsList {
	data: Array<string> = [];
	persondetails: any = {};
	update: any;
	element: any;
	routeId:any;
	constructor(private personSrvc: PersonService, private router:Router) {
		this.routeId = this.router.getCurrentRoute().params.id;
	}
	
	mount() {
		this.personSrvc.getPersons().then(data => {
			this.data = data;
			this.update(); // triggers change detection and update view
		});
	}

	alertName(user: any) {
		this.persondetails = user;
		this.update();
	}

	render() {
		return html`
			<h4 class='mb-3'>Sample service injection with http call and passing data to other component</h4>
			<p class='test'>Id value from route: ${ this.routeId }</p>
			<div class='row'>
				<div class='col-md-6'>
					<div class="list-group">
						${this.data.map(
							(user: any) =>
								html`
									<button type='button' class="list-group-item  list-group-item-action"
										onclick=${() => {
											this.alertName(user);
										}}
									>
										${user.name}
									</button>
								`
						)}
					</div>
				</div>
				<div class='col-md-6'>
					<person-details
						id="person-details"
						userDetails=${this.persondetails}
					></person-details>
				</div>
			</div>
		`;
	}
}

@Component({
	selector: "person-details"
})
export class PersonDetails {
	@Input()
	userDetails: any = {};

	render() {
		console.log("selected: user", this.userDetails);
		if (this.userDetails.name) {
			return html`
				<div class="card" style="width: 18rem;">
					<div class="card-body">
						<h5 class="card-title">${ this.userDetails.name }</h5>
						<h6 class="card-subtitle mb-2 text-muted">${ this.userDetails.email }</h6>
						<p class="card-text">Company: ${ this.userDetails.company.name }</p>
						<p class="card-text">Phone: ${ this.userDetails.phone }</p>
					</div>
				</div>
			`;
		} else {
			return html``;
		}
	}
}
