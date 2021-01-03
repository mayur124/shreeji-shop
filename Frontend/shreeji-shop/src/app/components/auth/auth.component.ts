import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ILoginRequest, ILoginResponse, IRegisterRequest } from "../../models/authentication.model";

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild('progressSpan') progressSpan: ElementRef<HTMLElement>;
  currentTab: 'signIn' | 'signUp' = 'signIn';
  signInForm: FormGroup;
  signUpForm: FormGroup;
  loginRequest: ILoginRequest;
  signUpRequest: IRegisterRequest;

  constructor(private location: Location,
    private authService: AuthService,
    private common: CommonService) {
    this.loginRequest = {
      userName: '',
      password: '',
    };
    this.signUpRequest = {
      name: '',
      phoneNumber: null,
      email: '',
      userName: '',
      password: '',
      address: '',
      pinCode: null,
    };
  }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      siUserName: new FormControl('', Validators.required),
      siPassword: new FormControl('', Validators.required)
    });
    this.signUpForm = new FormGroup({
      suName: new FormControl('', Validators.required),
      suPhone: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^\d{10}/, "g"))]),
      suEmail: new FormControl('', [Validators.required, Validators.email]),
      suUsername: new FormControl('', Validators.required),
      suPassword: new FormControl('', Validators.required),
      suAddress: new FormControl('', Validators.required),
      suPinCode: new FormControl('', [Validators.required, Validators.pattern(new RegExp(/^\d{6}/, "g"))]),
    });
  }

  closeModal() {
    this.location.back();
  }

  private _validateForm(form: FormGroup) {
    const formControls = Object.keys(form.controls);
    for (let i = 0; i < formControls.length; i++) {
      const element: string = formControls[i];
      if (!form.get(element).valid) {
        form.get(element).markAsTouched();
        break;
      }
    }
  }

  signIn() {
    this._validateForm(this.signInForm);
    if (this.signInForm.valid) {
      this.loginRequest.userName = this.signInForm.get('siUserName').value;
      this.loginRequest.password = this.signInForm.get('siPassword').value;
      this.common.setSpanMessage(this.progressSpan.nativeElement, 'Signing in...');
      this.common.setSpanType(this.progressSpan.nativeElement, 'progress');
      this.authService.signIn(this.loginRequest).subscribe(
        (response) => {
          if (response) {
            this.common.removeElement(this.progressSpan.nativeElement);
            this.closeModal();
          } else {
            this._handleUnsuccessfulLogin();
          }
        },
        (error: HttpErrorResponse) => {
          console.log('Error while signing in >\n', error);
          this._handleUnsuccessfulLogin();
        }
      );
    }
  }

  private _handleUnsuccessfulLogin() {
    this.common.setSpanMessage(this.progressSpan.nativeElement, 'Invalid username or password');
    this.common.setSpanType(this.progressSpan.nativeElement, 'error');
    this._clearLocalStorage();
  }

  signUp() {
    this._validateForm(this.signUpForm);
    this.signUpRequest.name = this.signUpForm.get('suName').value;
    this.signUpRequest.phoneNumber = Number(this.signUpForm.get('suPhone').value);
    this.signUpRequest.email = this.signUpForm.get('suEmail').value;
    this.signUpRequest.userName = this.signUpForm.get('suUsername').value;
    this.signUpRequest.password = this.signUpForm.get('suPassword').value;
    this.signUpRequest.address = this.signUpForm.get('suAddress').value;
    this.signUpRequest.pinCode = Number(this.signUpForm.get('suPinCode').value);
  }

  private _clearLocalStorage() {
    localStorage.clear();
  }

}
