import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/domain/user.model';
import { LoginService } from '../../services/login/login.service';
import { RememberEmailService } from '../../services/rememberEmail/remember-email.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  private logged: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private rememberEmailService: RememberEmailService,
    private store: Store<{ logged: boolean }>
  ) {
    this.logged = store.select('logged');
    this.logged.subscribe((value) => {
      if (value) router.navigateByUrl('/home');
    });

    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }

  ngOnInit(): void {
    this.getRememberEmail();
  }

  public async onSubmit(): Promise<void> {
    this.setRemember();

    if (this.form.valid) this.login();
  }

  private async login(): Promise<void> {
    const resp = await this.loginService.login(
      this.form.value.email,
      this.form.value.password
    );

    if (resp) this.router.navigateByUrl('/home');
    //TODO: show notification when it can´t to login
  }

  private setRemember(): void {
    this.rememberEmailService.setEmail(
      this.form.value.email,
      this.form.value.remember
    );
  }

  private getRememberEmail(): void {
    const remember = this.rememberEmailService.getEmail();
    this.form.reset(remember);
  }
}
