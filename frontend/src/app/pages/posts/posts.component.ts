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
import { FilterState } from '@/app/queries/filters/filter-state';
import { FilterBuilder } from '@/app/queries/filters/filter-builder';

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
  private readonly filterState = new FilterState();

  onSelectedAuthor(author: Author | null): void {
    this.filterState.authors = author ? [author.name] : undefined;
    this.executeQuery();
  }
  onSelectedCharacter(character: Character | null): void {
    this.filterState.characters = character ? [character.name] : undefined;
    console.log(this.filterState);
    this.executeQuery();
  }
  onSelectedCategory(category: Category | null): void {
    this.filterState.categories = category ? [category.name] : undefined;
    this.executeQuery();
  }

  ngOnInit(): void {
    this.executeQuery();
  }

  executeQuery(): void {
    const filterParameter = FilterBuilder.build(this.filterState);
    this.postService.getPaginated(filterParameter).subscribe((posts) => {
      this.posts = posts;
    });
  }
}
