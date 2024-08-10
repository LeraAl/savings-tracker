import { Component, Inject } from '@angular/core';
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
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Goal } from '../../models/goal.model';

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
  imagePreview: string | ArrayBuffer | null = null;
  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddGoalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { goal: Goal },
    private fb: FormBuilder
  ) {
    this.goalForm = this.fb.group({
      title: ['', Validators.required],
      targetAmount: ['', [Validators.required, Validators.min(1)]],
      savedAmount: ['0', [Validators.required, Validators.min(0)]],
      savingStartDate: [new Date().toISOString(), Validators.required],
      dueDate: [''],
      imageUrl: [''],
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.goal) {
      this.isEditMode = true;
      this.goalForm.patchValue(this.data.goal);
      this.imagePreview = this.data.goal.imageUrl;
    }
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
