import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../auth/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-page-two',
	templateUrl: './page-two.component.html',
	styleUrls: ['./page-two.component.scss']
})
export class PageTwoComponent implements OnInit {

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
