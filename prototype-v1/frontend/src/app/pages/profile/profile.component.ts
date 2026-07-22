import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserService } from '@/app/services/user/user.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { selectUser } from '@/app/state/users/user.reducer';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, InputTextModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly userService = inject(UserService);

  user$ = this.store.select(selectUser);
  profileForm: FormGroup;

  constructor() {
    this.profileForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(32)]],
    });

    this.user$.subscribe((user) => {
      if (user) {
        this.profileForm.patchValue(user);
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.user$.subscribe((user) => {
        if (user) {
          this.userService.update(this.profileForm.value).subscribe();
        }
      });
    }
  }
}
