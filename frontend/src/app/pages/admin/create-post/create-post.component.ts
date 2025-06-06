import { Component } from '@angular/core';
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
import { TagsService } from '../../../services/tags/tags.service';
import { AuthorService } from '../../../services/author/author.service';
import { SourceService } from '../../../services/source/source.service';
import { PostService } from '../../../services/post/post.service';
import { CreatePost } from '../../../../models/admin/create-post';
import { CategoryService } from '../../../services/categories/category.service';
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
export class CreatePostComponent {
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

  constructor(
    private readonly tagService: TagsService,
    private readonly authorService: AuthorService,
    private readonly sourceService: SourceService,
    private readonly categoryService: CategoryService,
    private readonly postService: PostService,
    private readonly router: Router,
    private readonly messageService: MessageService,
  ) {}

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
