import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TagsService } from '@/app/services/tags/tags.service';
import { CreationDialog } from '@/app/components/abstract/CreationDialog';
import { ErrorHandlerService } from '@/app/services/errors/error-handler.service';
import { MessageService } from 'primeng/api';
import { FormValidationErrorComponent } from '@/app/components/forms/form-validation-error/form-validation-error.component';

@Component({
  selector: 'app-create-tag',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, FormValidationErrorComponent],
  templateUrl: './create-tag.component.html',
  styleUrl: './create-tag.component.scss',
  providers: [TagsService, ErrorHandlerService, MessageService],
})
export class CreateTagComponent extends CreationDialog {
  private readonly tagsService = inject(TagsService);

  sourceForm: FormGroup;

  constructor() {
    const formBuilder = inject(FormBuilder);
    const ref = inject(DynamicDialogRef);
    const errorHandlerService = inject(ErrorHandlerService);

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
