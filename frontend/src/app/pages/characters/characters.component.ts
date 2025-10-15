import { Component, inject, OnInit } from '@angular/core';
import { CharacterSelectionBarComponent } from "@/app/components/characters/character-selection-bar/character-selection-bar.component";
import { PostService } from '@/app/services/post/post.service';
import { Article } from '@/models/post/article';
import { PostCardComponent } from "@/app/components/post/post-card/post-card.component";

@Component({
  selector: 'app-characters',
  imports: [CharacterSelectionBarComponent, PostCardComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  private readonly postService = inject(PostService);
  latestPosts: Article[] = [];

  ngOnInit(): void {
    this.postService.getPaginated({
      characters: {
        any: true
      }
    }).subscribe((posts) => {
      this.latestPosts = posts;
    });
  }
}
