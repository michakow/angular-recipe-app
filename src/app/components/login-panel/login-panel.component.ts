import { LocalizedString } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss'],
})
export class LoginPanelComponent implements OnInit {
  loginForm!: FormGroup;
  badLoginData: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.createForm();
  }

  async onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;
    this.userService.signIn(this.loginForm.value.login, this.loginForm.value.password).subscribe(value => {
      if(value) window.location.reload();
      else {
        this.badLoginData = true;
        setTimeout(() => this.badLoginData = false, 2500)
      }
    })
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
