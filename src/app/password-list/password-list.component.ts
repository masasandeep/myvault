import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordmanagerService } from '../passwordmanager.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { faEye, faEyeSlash, faPaste } from '@fortawesome/free-solid-svg-icons';
import { Site } from '../site';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule,NavbarComponent],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css',
})
export class PasswordListComponent {
  siteForm!: FormGroup;
  state: string = 'Add';
  isSuccess: boolean = false;
  credentials!: Array<any>;
  siteId!: string;
  siteData!: Site;
  hashedPassword!: string;
  showPassword: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faPaste = faPaste;
  constructor(
    private passwordManagerService: PasswordmanagerService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.siteForm = this.formBuilder.group({
      id: [''],
      username: [''],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    this.siteId = this.route.snapshot.paramMap.get('id')!;
    this.passwordManagerService
      .getSiteDetails(this.siteId)
      .subscribe((data) => {
        this.siteData = data;
      });
    this.passwordManagerService.loadPasswords(this.siteId).subscribe((data) => {
      this.credentials = data;
    });
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  onSubmit(): void {
    this.hashedPassword = this.passwordManagerService.enCryptPassword(
      this.siteForm.value.password
    );
    this.siteForm.patchValue({
      password: this.hashedPassword,
    });
    if (this.state == 'Edit') {
      this.passwordManagerService
        .updatePassword(
          this.siteId,
          this.siteForm.value.id,
          this.siteForm.value
        )
        .then(() => {
          this.isSuccess = true;
          this.siteForm.reset();
          this.state = 'Add';
          setTimeout(() => {
            this.isSuccess = false;
          }, 2000);
        })
        .catch((err) => {
          alert('Error occured'+ err);
        });
    } else {
      this.passwordManagerService
        .addPassword(this.siteId, this.siteForm.value)
        .then(() => {
          console.log('Password Added');
          this.isSuccess = true;
          this.siteForm.reset();
        });
    }
  }
  onEdit(id: string, userName: string, password: string): void {
    this.state = 'Edit';
    this.siteForm.patchValue({
      id: id,
      username: userName,
      password: password,
    });
  }
  onDelete(id: string): void {
    this.passwordManagerService
      .deletePassword(this.siteId, id)
      .then(() => {
        console.log('Password deleted successfully');
      })
      .catch((err) => {
        alert('Error occured'+err);
      });
  }
  copyPassword(password: string): void {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        console.log('Password copied to clipboard:');
      })
      .catch((err) => {
        console.log('Error copying password:', err);
      });
  }
}
