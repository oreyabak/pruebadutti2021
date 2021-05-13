import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../auth/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-page-one',
	templateUrl: './page-one.component.html',
	styleUrls: ['./page-one.component.scss']
})
export class PageOneComponent implements OnInit {

	constructor(
		private router: Router,
		private tokenStorage: TokenStorageService) { }

	ngOnInit(): void {
		// Ir al login si no tiene sesión.
		if (!this.tokenStorage.getToken()) {
			this.router.navigate(['']);
		}
	}

}
