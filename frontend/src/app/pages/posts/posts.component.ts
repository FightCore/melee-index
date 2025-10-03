import { Component } from '@angular/core';
import { SelectAuthorComponent } from '@/app/components/authors/select-author/select-author.component';
import { Author } from '@/models/post/blocks/author';

@Component({
  selector: 'app-posts',
  imports: [SelectAuthorComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  onSelectedAuthor(author: Author | null): void {
    console.log('Selected author:', author);
  }
}
