import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from '../../services/author/author.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-author',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule, FloatLabel],
  templateUrl: './create-author.component.html',
  standalone: true,
  styleUrl: './create-author.component.scss'
})
export class CreateAuthorComponent {
  authorForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private readonly authorService: AuthorService,  private readonly ref: DynamicDialogRef) {
    this.authorForm = this.formBuilder.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.authorForm.valid) {
      this.authorService.create(this.authorForm.value.name, this.authorForm.value.imageUrl).subscribe({
        next: (response) => this.ref.close(response),
        error: (err) => console.error('Error creating author', err)
      });
    }
  }
}
