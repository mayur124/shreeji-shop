import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName: string;
  isLoggedIn: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this._handleLoginStatus();
    this.authService.loggedIn.subscribe(() => {
      this._handleLoginStatus();
    });
  }

  private _handleLoginStatus() {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.userName = localStorage.getItem('username');
    } else {
      this.isLoggedIn = false;
    }
  }

  navigateToAuthentication() {
    this.router.navigate(['authenticate'], { relativeTo: this.route });
  }

  showOrders() { }

  showWishlist() { }

  editProfile() { }

  logout() {
    this.authService.logout();
  }

}
