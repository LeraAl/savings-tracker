import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-goal-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-goal-dialog.component.html',
  styleUrl: './add-goal-dialog.component.scss',
})
export class AddGoalDialogComponent {
  goalForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null; // Preview the image

  constructor(
    public dialogRef: MatDialogRef<AddGoalDialogComponent>,
    private fb: FormBuilder
  ) {
    this.goalForm = this.fb.group({
      title: ['', Validators.required],
      targetAmount: ['', [Validators.required, Validators.min(1)]],
      savingStartDate: [new Date().toISOString(), Validators.required],
      dueDate: [''],
      imageUrl: [''],
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Set the preview
        this.goalForm.patchValue({ imageUrl: this.imagePreview }); // Store the image data in the form
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  }

  onSubmit() {
    if (this.goalForm.valid) {
      this.dialogRef.close(this.goalForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
