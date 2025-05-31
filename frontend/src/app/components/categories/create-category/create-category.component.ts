import { Component } from '@angular/core';
import { CategoryService } from '../../../services/categories/category.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
  selector: 'app-create-category',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, FloatLabel, ColorPickerModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
  standalone: true,
})
export class CreateCategoryComponent {
  categoryForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly ref: DynamicDialogRef
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.categoryService
        .create(this.categoryForm.value.name, this.categoryForm.value.color)
        .subscribe({
          next: (response) => {
            this.ref.close(response);
          },
          error: (err) => console.error('Error creating category', err),
        });
    }
  }
}
