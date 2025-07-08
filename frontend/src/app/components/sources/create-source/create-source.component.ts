import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SourceService } from '@/app/services/source/source.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreationDialog } from '@/app/components/abstract/CreationDialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '@/app/services/errors/error-handler.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormValidationErrorComponent } from '@/app/components/forms/form-validation-error/form-validation-error.component';

@Component({
  selector: 'app-create-source',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, ToastModule, FormValidationErrorComponent],
  templateUrl: './create-source.component.html',
  styleUrl: './create-source.component.scss',
  providers: [ErrorHandlerService, MessageService, FormValidationErrorComponent],
})
export class CreateSourceComponent extends CreationDialog {
  private readonly sourceService = inject(SourceService);

  sourceForm: FormGroup;

  constructor() {
    const formBuilder = inject(FormBuilder);
    const errorHandlerService = inject(ErrorHandlerService);
    const ref = inject(DynamicDialogRef);

    const propertyMap = new Map<string, string>();
    propertyMap.set('Name', 'name');
    propertyMap.set('Description', 'description');
    propertyMap.set('Url', 'url');

    const formGroup = formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
    });

    super(ref, propertyMap, errorHandlerService, formGroup);
    this.sourceForm = formGroup;
  }

  onSubmit(): void {
    if (this.sourceForm.valid) {
      this.sourceService
        .create(this.sourceForm.value.name, this.sourceForm.value.description, this.sourceForm.value.url)
        .subscribe({
          next: (response) => {
            this.ref.close(response);
          },
          error: (err: HttpErrorResponse) => {
            this.handleHttpError(err);
          },
        });
    }
  }
}
