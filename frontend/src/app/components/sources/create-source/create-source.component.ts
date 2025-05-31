import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SourceService } from '../../../services/source/source.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-source',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, FloatLabel],
  templateUrl: './create-source.component.html',
  styleUrl: './create-source.component.scss'
})
export class CreateSourceComponent {
  sourceForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private readonly sourceService: SourceService, private readonly ref: DynamicDialogRef) {
    this.sourceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.sourceForm.valid) {
      this.sourceService.create(this.sourceForm.value.name, this.sourceForm.value.description, this.sourceForm.value.url)
        .subscribe({
          next: (response) => {
            this.ref.close(response);
          },
          error: (err) => console.error('Error creating author', err)
      });
    }
  }
}
