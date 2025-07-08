import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule , FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthorService } from '@/app/services/author/author.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreationDialog } from '@/app/components/abstract/CreationDialog';
import { ErrorHandlerService } from '@/app/services/errors/error-handler.service';
import { MessageService } from 'primeng/api';
import { FormValidationErrorComponent } from '@/app/components/forms/form-validation-error/form-validation-error.component';

@Component({
  selector: 'app-create-author',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, FormValidationErrorComponent],
  templateUrl: './create-author.component.html',
  standalone: true,
  styleUrl: './create-author.component.scss',
  providers: [MessageService, AuthorService, ErrorHandlerService]
})
export class CreateAuthorComponent extends CreationDialog {
  private readonly authorService = inject(AuthorService);

  authorForm: FormGroup;

  constructor() {
    const formBuilder = inject(FormBuilder);
    const ref = inject(DynamicDialogRef);
    const errorHandlerService = inject(ErrorHandlerService);

    const propertyMap = new Map<string, string>();
    propertyMap.set('Name', 'name');
    propertyMap.set('ImageUrl', 'imageUrl');
    const authorForm = formBuilder.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
    super(ref, propertyMap, errorHandlerService, authorForm);
    this.authorForm = authorForm;
  }

  onSubmit(): void {
    if (this.authorForm.valid) {
      this.authorService.create(this.authorForm.value.name, this.authorForm.value.imageUrl).subscribe({
        next: (response) => this.ref.close(response),
        error: (err) => this.handleHttpError(err)
      });
    }
  }
}
