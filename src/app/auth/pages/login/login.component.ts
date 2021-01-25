import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoginService } from '../../services/login/login.service';
import { RememberEmailService } from '../../services/rememberEmail/remember-email.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public notifyMessage: string = '';
  public loading = false;
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

  public isInvalidControl(controlName: string) {
    const control = this.form.get(controlName);

    return control.invalid && control.touched;
  }

  public async onSubmit(): Promise<void> {
    this.form.markAllAsTouched();
    this.setRemember();
    if (this.form.valid) this.login();
  }

  private async login(): Promise<void> {
    this.loading = true;

    const resp = await this.loginService.login(
      this.form.value.email,
      this.form.value.password
    );

    this.loading = false;

    if (resp.ok) this.router.navigateByUrl('/home');
    else {
      this.notifyMessage = resp.message;
      this.showCard(!resp.ok);
    }
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

  private showCard(error: boolean): void {
    const notify = document.getElementById('notify');

    if (error) notify.style.backgroundColor = 'red';
    else notify.style.backgroundColor = 'green';

    notify.style.display = 'block';

    setTimeout(() => {
      notify.style.display = 'none';
    }, 2000);
  }
}
