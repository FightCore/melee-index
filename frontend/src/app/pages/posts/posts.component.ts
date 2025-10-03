import { Component, inject, OnInit } from '@angular/core';
import { SelectAuthorComponent } from '@/app/components/authors/select-author/select-author.component';
import { Author } from '@/models/post/blocks/author';
import { SelectCharacterComponent } from '@/app/components/characters/select-character/select-character.component';
import { Character } from '@/models/post/character';
import { SelectCategoryComponent } from '@/app/components/categories/select-category/select-category.component';
import { Category } from '@/models/post/category';
import { PostService } from '@/app/services/post/post.service';
import { Article } from '@/models/post/article';
import { PostCardComponent } from '@/app/components/post/post-card/post-card.component';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-posts',
  imports: [
    SelectAuthorComponent,
    SelectCharacterComponent,
    SelectCategoryComponent,
    PostCardComponent,
    ToolbarModule,
    InputTextModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  posts: Article[] = [];
  private readonly postService = inject(PostService);

  onSelectedAuthor(author: Author | null): void {
    console.log('Selected author:', author);
  }
  onSelectedCharacter(character: Character | null): void {
    console.log('Selected character:', character);
  }
  onSelectedCategory(category: Category | null): void {
    console.log('Selected category:', category);
  }

  ngOnInit(): void {
    this.postService.getPaginated().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
