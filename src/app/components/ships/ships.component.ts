import { Component, OnInit } from '@angular/core';
import { ShipsService } from 'src/app/services/ships.service';
import { TokenStorageService } from '../../auth/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-ships',
	templateUrl: './ships.component.html',
	styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {

	public dataList: any = [];

	constructor(
		private router: Router,
		private tokenStorage: TokenStorageService,
		private shipsService: ShipsService) { }

	ngOnInit(): void {
		// Ir al login si no tiene sesión.
		if (!this.tokenStorage.getToken()) {
			this.router.navigate(['']);
		}

		this.shipsService.getShips().subscribe((ships) => {
			this.dataList = ships;
			console.log('SHIPS -->', this.dataList.results)
		});
	}
}
