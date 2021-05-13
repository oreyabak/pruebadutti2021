import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { TokenStorageService } from './services/token-storage.service';
import { UserService } from './services/user.service';

import { authInterceptorProviders } from './helpers/auth.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    TokenStorageService,
    UserService,
    authInterceptorProviders
  ],
})

export class AuthModule { }
