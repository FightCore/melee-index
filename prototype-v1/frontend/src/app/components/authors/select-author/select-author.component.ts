import { AuthorService } from '@/app/services/authors/author.service';
import { Author } from '@/models/post/blocks/author';
import { Component, inject, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-select-author',
  imports: [SelectModule, FormsModule, AvatarModule],
  templateUrl: './select-author.component.html',
  styleUrl: './select-author.component.scss',
  standalone: true,
})
export class SelectAuthorComponent implements OnInit {
  authors: Author[] = [];
  selectedAuthor = output<Author | null>();

  private readonly authorService = inject(AuthorService);

  ngOnInit(): void {
    this.authorService.getAll().subscribe((authors) => {
      this.authors = [...authors].sort((a, b) => a.name.localeCompare(b.name));
    });
  }
}
