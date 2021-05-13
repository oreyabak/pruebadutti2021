import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/services/token-storage.service';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'massimo-dutti';

	isLoggedIn = false;
	username?: string;

	constructor(private tokenStoreageService: TokenStorageService) {}

	ngOnInit(): void {
		this.isLoggedIn = !!this.tokenStoreageService.getUser();

		if (this.isLoggedIn) {
			const user = this.tokenStoreageService.getUser();
			this.username = user.username;
		}
	}

	logout(): void {
		this.tokenStoreageService.signOut();
		window.location.reload();
	}
}
