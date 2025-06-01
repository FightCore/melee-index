import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TagsService } from '../../../services/tags/tags.service';
import { CreationDialog } from '../../abstract/CreationDialog';
import { ErrorHandlerService } from '../../../services/errors/error-handler.service';
import { MessageService } from 'primeng/api';
import { FormValidationErrorComponent } from '../../forms/form-validation-error/form-validation-error.component';

@Component({
  selector: 'app-create-tag',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, FormValidationErrorComponent],
  templateUrl: './create-tag.component.html',
  styleUrl: './create-tag.component.scss',
  providers: [TagsService, ErrorHandlerService, MessageService],
})
export class CreateTagComponent extends CreationDialog {
  sourceForm: FormGroup;

  constructor(formBuilder: FormBuilder, private readonly tagsService: TagsService, ref: DynamicDialogRef, errorHandlerService: ErrorHandlerService) {
    const propertyMap = new Map<string, string>();
    propertyMap.set('Name', 'name');
    const sourceForm = formBuilder.group({
      name: ['', Validators.required],
    });
    super(ref, propertyMap, errorHandlerService, sourceForm);
    this.sourceForm = sourceForm;
  }

  onSubmit(): void {
    if (this.sourceForm.valid) {
      this.tagsService.create(this.sourceForm.value.name)
        .subscribe({
          next: (response) => {
            this.ref.close(response);
          },
          error: (err) => this.handleHttpError(err),
      });
    }
  }
}
