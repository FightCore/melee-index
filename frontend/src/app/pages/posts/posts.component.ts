import { Component } from '@angular/core';
import { SelectAuthorComponent } from '@/app/components/authors/select-author/select-author.component';
import { Author } from '@/models/post/blocks/author';
import { SelectCharacterComponent } from '@/app/components/characters/select-character/select-character.component';
import { Character } from '@/models/post/character';

@Component({
  selector: 'app-posts',
  imports: [SelectAuthorComponent, SelectCharacterComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  onSelectedAuthor(author: Author | null): void {
    console.log('Selected author:', author);
  }
  onSelectedCharacter(character: Character | null): void {
    console.log('Selected character:', character);
  }
}
