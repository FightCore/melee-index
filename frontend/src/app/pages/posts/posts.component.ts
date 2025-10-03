import { Component } from '@angular/core';
import { SelectAuthorComponent } from '@/app/components/authors/select-author/select-author.component';
import { Author } from '@/models/post/blocks/author';
import { SelectCharacterComponent } from '@/app/components/characters/select-character/select-character.component';
import { Character } from '@/models/post/character';
import { SelectCategoryComponent } from '@/app/components/categories/select-category/select-category.component';
import { Category } from '@/models/post/category';

@Component({
  selector: 'app-posts',
  imports: [SelectAuthorComponent, SelectCharacterComponent, SelectCategoryComponent],
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
  onSelectedCategory(category: Category | null): void {
    console.log('Selected category:', category);
  }
}
