import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TagsService } from '../../../services/tags/tags.service';

@Component({
  selector: 'app-create-tag',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, FloatLabel],
  templateUrl: './create-tag.component.html',
  styleUrl: './create-tag.component.scss'
})
export class CreateTagComponent {
  sourceForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private readonly tagsService: TagsService, private readonly ref: DynamicDialogRef) {
    this.sourceForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.sourceForm.valid) {
      this.tagsService.create(this.sourceForm.value.name)
        .subscribe({
          next: (response) => {
            this.ref.close(response);
          },
          error: (err) => console.error('Error creating tag', err)
      });
    }
  }
}
