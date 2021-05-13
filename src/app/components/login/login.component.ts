import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TokenStorageService } from '../../auth/services/token-storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	dataLoading: boolean = false;
	unregistered: boolean = false;
	invalid: boolean = false;
	isLoggedIn = false;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private authService: AuthService,
		private tokenStorage: TokenStorageService,
	) { }

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(3)]],
			password: ['', [Validators.required, Validators.minLength(3)]]
		});

		if (this.tokenStorage.getToken()) {
			this.isLoggedIn = true;
			this.router.navigate(['/principal/ships']);
		}
	}

	// Petición de acceso a la App.
	loginUser() {
		if (this.loginForm.invalid) { return }

		this.dataLoading = true;
		let username = this.loginForm.value.username;
		let password = this.loginForm.value.password;
		this.authService.login(username, password).subscribe(
			data => {
				this.tokenStorage.saveToken(data.accessToken);
				this.tokenStorage.saveUser(data);

				this.unregistered = false;
				this.isLoggedIn = true;
				this.dataLoading = false;
				this.reloadPage();
			},
			err => {
				this.unregistered = true;
				this.dataLoading = false;
			}
		);

		// TODO : Falta integrar el servicio para autentificar al usuario
		//var filterJson = this.users.filter(function (user) { return user.first_name === userLogin });
		//if (filterJson.length > 0) {	this.router.navigate(['/principal/ships'])} else {this.unregistered = true;}
	}

	reloadPage(): void {
		window.location.reload();
	}
}

