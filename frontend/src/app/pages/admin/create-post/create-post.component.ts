import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TabsModule } from 'primeng/tabs';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { TagsService } from '@/app/services/tags/tags.service';
import { AuthorService } from '@/app/services/author/author.service';
import { SourceService } from '@/app/services/source/source.service';
import { PostService } from '@/app/services/post/post.service';
import { CreatePost } from '@/models/admin/create-post';
import { CategoryService } from '@/app/services/categories/category.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-post',
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabel,
    TextareaModule,
    TabsModule,
    SelectModule,
    MultiSelectModule,
    DatePickerModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
  providers: [MessageService],
})
export class CreatePostComponent implements OnInit {
  private readonly tagService = inject(TagsService);
  private readonly authorService = inject(AuthorService);
  private readonly sourceService = inject(SourceService);
  private readonly categoryService = inject(CategoryService);
  private readonly postService = inject(PostService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  formGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    summary: new FormControl('', Validators.required),
    created: new FormControl<Date>(new Date(Date.now()), Validators.required),
    modified: new FormControl<Date>(new Date(Date.now()), Validators.required),
    author: new FormControl('', Validators.required),
    source: new FormControl('', Validators.required),
    tags: new FormControl<string[]>([], Validators.required),
    category: new FormControl('', Validators.required),
  });

  authors: string[] | undefined;
  tags: string[] = [];
  sources: string[] = [];
  categories: string[] = [];

  ngOnInit() {
    this.tagService.getAll().subscribe((tags) => (this.tags = tags));
    this.authorService
      .getAll()
      .subscribe((authors) => (this.authors = authors.map((author) => author.name)));
    this.sourceService
      .getAll()
      .subscribe((sources) => (this.sources = sources.map((source) => source.name)));
    this.categoryService
      .getAll()
      .subscribe((categories) => (this.categories = categories.map((category) => category.name)));
  }

  create(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      console.log('Invalid form');
      return;
    }
    const post = this.formGroup.value as CreatePost;
    this.postService.create(post).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Post created successfully',
        });
        this.router.navigate(['/admin/posts']);
      },
      error: (err) => {
        console.error('Error creating post', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create post - ' + err.message,
        });
      },
    })
  }
}
