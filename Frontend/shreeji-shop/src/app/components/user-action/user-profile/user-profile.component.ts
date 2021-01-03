import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() userDetails: User;
  @Output() usernameChanged: EventEmitter<string> = new EventEmitter();
  profileForm: FormGroup;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this._setUserDetailsIfUndefined();
    this._initProfileForm();
  }

  private _setUserDetailsIfUndefined() {
    if (!this.userDetails) {
      this.http.getUserDetails().subscribe(
        userDetail => {
          this.userDetails = userDetail;
          this._initProfileForm();
        },
        error => {
          console.log('Error while fetching user details > ', error);
        }
      );
    }
  }

  private _initProfileForm() {
    this.profileForm = new FormGroup({
      name: new FormControl(this.userDetails?.name, Validators.required),
      phone: new FormControl(this.userDetails?.phoneNumber, [Validators.required, Validators.pattern(new RegExp(/^\d{10}/, "g"))]),
      email: new FormControl({ value: this.userDetails?.email, disabled: true }, [Validators.required, Validators.email]),
      address: new FormControl(this.userDetails?.address, Validators.required),
      pinCode: new FormControl(this.userDetails?.pinCode, [Validators.required, Validators.pattern(new RegExp(/^\d{6}/, "g"))]),
    });
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

  updateProfile() {
    this._validateForm(this.profileForm);
    console.log(this.userDetails);
  }

}
