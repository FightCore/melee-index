import { Component } from '@angular/core';
import { CategoryService } from '../../../services/categories/category.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { CreationDialog } from '../../abstract/CreationDialog';
import { ErrorHandlerService } from '../../../services/errors/error-handler.service';
import { MessageService } from 'primeng/api';
import { FormValidationErrorComponent } from '../../forms/form-validation-error/form-validation-error.component';

@Component({
  selector: 'app-create-category',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ColorPickerModule,
    SelectModule,
    DialogModule,
    FormValidationErrorComponent,
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
  standalone: true,
  providers: [CategoryService, ErrorHandlerService, MessageService],
})
export class CreateCategoryComponent extends CreationDialog {
  categoryForm: FormGroup;

  colorOptions = [
  { label: 'Red 500', value: 'bg-red-500' },
  { label: 'Red 600', value: 'bg-red-600' },
  { label: 'Red 700', value: 'bg-red-700' },
  { label: 'Blue 500', value: 'bg-blue-500' },
  { label: 'Blue 600', value: 'bg-blue-600' },
  { label: 'Blue 700', value: 'bg-blue-700' },
  { label: 'Green 500', value: 'bg-green-500' },
  { label: 'Green 600', value: 'bg-green-600' },
  { label: 'Green 700', value: 'bg-green-700' },
  { label: 'Yellow 500', value: 'bg-yellow-500' },
  { label: 'Yellow 600', value: 'bg-yellow-600' },
  { label: 'Yellow 700', value: 'bg-yellow-700' },
  { label: 'Purple 500', value: 'bg-purple-500' },
  { label: 'Purple 600', value: 'bg-purple-600' },
  { label: 'Purple 700', value: 'bg-purple-700' },
  { label: 'Pink 500', value: 'bg-pink-500' },
  { label: 'Pink 600', value: 'bg-pink-600' },
  { label: 'Pink 700', value: 'bg-pink-700' },
  { label: 'Gray 500', value: 'bg-gray-500' },
  { label: 'Gray 600', value: 'bg-gray-600' },
  { label: 'Gray 700', value: 'bg-gray-700' },
  { label: 'Indigo 500', value: 'bg-indigo-500' },
  { label: 'Indigo 600', value: 'bg-indigo-600' },
  { label: 'Indigo 700', value: 'bg-indigo-700' },
  { label: 'Teal 500', value: 'bg-teal-500' },
  { label: 'Teal 600', value: 'bg-teal-600' },
  { label: 'Teal 700', value: 'bg-teal-700' },
  { label: 'Orange 500', value: 'bg-orange-500' },
  { label: 'Orange 600', value: 'bg-orange-600' },
  { label: 'Orange 700', value: 'bg-orange-700' },
];


  constructor(
    formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
    ref: DynamicDialogRef,
    errorHandlerService: ErrorHandlerService
  ) {
    const categoryForm = formBuilder.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
    });

    const propertyMap = new Map<string, string>();
    propertyMap.set('Name', 'name');
    propertyMap.set('Color', 'color');
    super(ref, propertyMap, errorHandlerService, categoryForm);
    this.categoryForm = categoryForm;
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.categoryService
        .create(this.categoryForm.value.name, this.categoryForm.value.color.value)
        .subscribe({
          next: (response) => {
            this.ref.close(response);
          },
          error: (err) => this.handleHttpError(err),
        });
    }
  }

  selectedColor: string | null = null;
}
