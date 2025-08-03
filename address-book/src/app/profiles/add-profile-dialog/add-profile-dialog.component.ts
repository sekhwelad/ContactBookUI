import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Profile } from '../profiles/profile.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-profile-dialog',
  standalone: true,
  templateUrl: './add-profile-dialog.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AddProfileDialogComponent {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProfileDialogComponent>
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      description: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['',Validators.required],
      website: ['',Validators.required],
    });
  }

  onSave(): void {
    if (this.profileForm.valid) {
      this.dialogRef.close(this.profileForm.value as Profile);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
