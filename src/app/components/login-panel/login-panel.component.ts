import { LocalizedString } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss'],
})
export class LoginPanelComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.createForm();
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;
    localStorage.setItem('logged', 'true');
    localStorage.setItem('userName', JSON.stringify(this.loginForm.value.login));
    this.router.navigate(['recipes']);
  }

  remindPassword() {
    console.log('przypomnij haslo');
  }

  goToRegister() {
    console.log('zarejestruj');
  }

  private createForm(): FormGroup {
    const form = this.formBuilder.group({
      login: this.formBuilder.control('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]),
      password: this.formBuilder.control('', [Validators.required]),
    });

    return form;
  }
}
