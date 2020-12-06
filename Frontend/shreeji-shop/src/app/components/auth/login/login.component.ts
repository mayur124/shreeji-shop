import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILoginRequest } from "../../../models/ILoginRequest.model";
import { IRegisterRequest } from "../../../models/IRegisterRequest.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentTab: 'signIn' | 'signUp' = 'signIn';
  signInForm: FormGroup;
  signUpForm: FormGroup;
  loginRequest: ILoginRequest;
  signUpRequest: IRegisterRequest;

  constructor(private location: Location) {
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
    this.loginRequest.userName = this.signInForm.get('siUserName').value;
    this.loginRequest.password = this.signInForm.get('siPassword').value;
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
}
