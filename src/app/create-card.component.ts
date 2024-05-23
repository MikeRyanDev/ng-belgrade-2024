import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateCardParams } from './services/db.service';

@Component({
  selector: 'app-create-card',
  standalone: true,
  template: `
    <form [formGroup]="form" (submit)="createCard()" novalidate>
      <h2 mat-dialog-title>Create Card</h2>
      <mat-dialog-content>
        <mat-form-field>
          <input formControlName="title" matInput placeholder="Title" />
        </mat-form-field>
        <input #fileInput formControlName="image" type="file" />
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button color="tertiary" mat-dialog-close>Cancel</button>
        <button mat-raised-button color="primary">Save</button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 300px;
        margin: 0 auto;
      }
    `,
  ],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class CreateCardComponent {
  disabled = signal(false);
  dialogRef = inject(MatDialogRef);
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl<null | File>(null, [Validators.required]),
  });
  imageInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  createCard() {
    const title = this.form.value.title;
    const inputRef = this.imageInput();
    const fileName = this.form.value.image;
    const firstFile = inputRef?.nativeElement?.files?.[0];

    if (!fileName || !inputRef || !title || !firstFile) {
      return;
    }

    this.form.disable();

    const reader = new FileReader();

    reader.onload = () => {
      const cardCreateParams: CreateCardParams = {
        title: title,
        imageUrl: reader.result as string,
        description: '',
        count: 1,
      };

      this.dialogRef.close(cardCreateParams);
    };

    reader.readAsDataURL(firstFile);
  }
}
