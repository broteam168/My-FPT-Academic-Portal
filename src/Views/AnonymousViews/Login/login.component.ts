import { NgIf } from '@angular/common';
import {
  AfterContentInit,
  AfterViewChecked,
  Component,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserAuth } from '../../../Models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService, HttpClient],
})
export class LoginComponent implements OnInit, AfterContentInit {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  returnUrl!: string;
  fail: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) {
    let currentUser = this.authenticationService.currentUserValue;

    if (currentUser && currentUser.token) {
      this.router.navigate([currentUser.role[0].name.toLowerCase()]);
    }
  }
  ngAfterContentInit(): void {
    this.submitted = false;
  }
  ngOnInit(): void {
    this.submitted = true;
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    //console.log(this.f['username'].value);
    this.submitted = true;
    this.authenticationService
      .login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.responseCode == 200) {
            var current = this.authenticationService.currentUserValue;
            console.log(current)
            this.router.navigate([current.role[0].name.toLowerCase()]);
          } else {
            this.submitted = false;
            this.fail = true;
          }
        },
        (error) => {
          console.log(error);
          this.submitted = false;
          this.fail = true;
        }
      );
      this.submitted = false;
          
  }
  handleResult(result: boolean) {}

  closeModal() {
    this.submitted = false;
    this.fail = false;
  }
}
