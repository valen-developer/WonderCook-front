import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UuidGeneratorService } from 'src/app/shared/services/uuidGenerator.service';
import { UserObjectWithPassword } from 'src/domain/user.model';
import { LoginService } from '../../services/login/login.service';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  public loading = false;

  public notifyMessage = '';

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private uuidGenerator: UuidGeneratorService,
    private router: Router
  ) {
    this.form = fb.group({
      alias: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required]],
      remember: [false],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid && this.comparePassword()) this.register();
  }

  public isInvalidControl(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control.invalid && control.touched;
  }

  private async register(): Promise<void> {
    this.loading = true;

    const newUser: UserObjectWithPassword = {
      alias: this.form.value.alias,
      email: this.form.value.email,
      name: this.form.value.name,
      password: this.form.value.password,
      uuid: UuidGeneratorService.generate(),
      bio: '',
    };

    const registeredResponse = await this.registerService.register(newUser);

    this.loading = false;

    this.notifyMessage = registeredResponse.message;

    this.showCard(!registeredResponse.ok);

    this.form.reset({});
  }

  private comparePassword() {
    return this.form.value.password === this.form.value.repeatPassword;
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
