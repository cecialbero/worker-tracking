import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/identity/auth.service';
import { SignupService } from 'src/app/services/identity/signup.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private signupService: SignupService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  signup(): void {
    const newUser = this.signupForm.getRawValue() as User;
    this.signupService.signup(newUser)
      .subscribe(response => {
        if (response.hasOwnProperty('token')) {
          this.toastr.success(`User ${newUser.email} register succesfully`);
          this.router.navigate(['']);
        } else {
          this.toastr.warning(`Esto no debió haber pasado.. ${response}`);
        }
      }, err => {
        err.error.errorMessages.forEach(msg => this.toastr.error(msg));
      });
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],
    });
  }
}
