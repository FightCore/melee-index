import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AuthorService } from '../../../services/author/author.service';
import { Author } from '../../../../models/author';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-author-overview',
  imports: [TableModule, ButtonModule],
  templateUrl: './author-overview.component.html',
  styleUrl: './author-overview.component.scss'
})
export class AuthorOverviewComponent {
  authors: Author[] = [];

  constructor(private readonly authorService: AuthorService) {
    this.refreshAuthors();
  }

  refreshAuthors(): void {
    this.authorService.getAll(false).subscribe((authors) => {
      this.authors = authors;
    });
  }

  deleteSource(id: string): void {
    this.authorService.delete(id).subscribe({
      next: () => {
        this.refreshAuthors();
      },
      error: (err) => console.error('Error deleting source', err),
    });
  }
}
