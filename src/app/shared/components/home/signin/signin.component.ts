import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/identity/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
  ) { }

  login(): void {
    const email = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;
    this.authService
      .login(email, password)
      .subscribe(
        response => {
          this.toastrService.success(`Welcome ${email} :)`);
          this.router.navigateByUrl('/workers');
        },
        err => {
          err.error.errorMessages.forEach(e => this.toastrService.error(e));
          this.loginForm.reset();
          this.userNameInput.nativeElement.focus();
        });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
