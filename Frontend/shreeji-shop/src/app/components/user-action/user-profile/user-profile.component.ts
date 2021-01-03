import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() userDetails: User;
  @Output() usernameChanged: EventEmitter<User> = new EventEmitter();
  @ViewChild('progressSpan') progressSpan: ElementRef<HTMLElement>;
  profileForm: FormGroup;

  constructor(private http: HttpService,
    private common: CommonService) { }

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
      phone: new FormControl(this.userDetails?.phoneNumber, [Validators.required, Validators.pattern(/^\d{10}$/)]),
      email: new FormControl(this.userDetails?.email, [Validators.required, Validators.email]),
      address: new FormControl(this.userDetails?.address, Validators.required),
      pinCode: new FormControl(this.userDetails?.pinCode, [Validators.required, Validators.pattern(/^\d{6}$/)]),
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
    this._hideProgressMessage();
    this._validateForm(this.profileForm);
    if (this.profileForm.valid) {
      this.userDetails.userName = localStorage.getItem('username');
      this.userDetails.name = this.profileForm.get('name').value;
      this.userDetails.phoneNumber = Number(this.profileForm.get('phone').value);
      this.userDetails.email = this.profileForm.get('email').value;
      this.userDetails.address = this.profileForm.get('address').value;
      this.userDetails.pinCode = Number(this.profileForm.get('pinCode').value);
      this.common.setSpanMessage(this.progressSpan.nativeElement, 'Updating details...');
      this.common.setSpanType(this.progressSpan.nativeElement, 'progress');
      this.http.updateUserDetails(this.userDetails).subscribe(
        (updateResponse) => {
          if (updateResponse.message === 'User details updated successfully!') {
            this.usernameChanged.emit(this.userDetails);
            this.common.setSpanMessage(this.progressSpan.nativeElement, 'Details updated successfuly!');
            this.common.setSpanType(this.progressSpan.nativeElement, 'success');
            setTimeout(() => {
              this._hideProgressMessage();
            }, 1000);
          } else {
            this._handleFailedResponse();
          }
        },
        error => {
          this._handleFailedResponse();
          console.log('Error while updating user details > ', error);
        }
      )
    }
  }

  private _handleFailedResponse() {
    this.common.setSpanMessage(this.progressSpan.nativeElement, 'Details not updated!');
    this.common.setSpanType(this.progressSpan.nativeElement, 'error');
  }

  private _hideProgressMessage() {
    this.common.hideElement(this.progressSpan.nativeElement);
  }
}
