import { Component, inject, OnInit } from '@angular/core';
import { CharacterSelectionBarComponent } from '@/app/components/characters/character-selection-bar/character-selection-bar.component';
import { PostService } from '@/app/services/post/post.service';
import { Article } from '@/models/post/article';
import { PostCardComponent } from '@/app/components/post/post-card/post-card.component';
import { ResourceService } from '@/app/services/resources/resource.service';
import { Resource } from '@/models/resources/resource';
import { ResourceCardComponent } from '@/app/components/resources/resource-card/resource-card.component';
import { Character } from '@/models/post/character';

@Component({
  selector: 'app-characters',
  imports: [CharacterSelectionBarComponent, PostCardComponent, ResourceCardComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit {
  private readonly postService = inject(PostService);
  private readonly resourceService = inject(ResourceService);
  latestPosts: Article[] = [];
  resources: Resource[] = [];

  ngOnInit(): void {
    this.postService.getPaginated({ characters: { any: true } }).subscribe((posts) => {
      this.latestPosts = posts;
    });

    this.resourceService.getAll().subscribe((resources) => {
      this.resources = resources;
    });
  }

  onCharacterSelected(character: Character | null) {
    if (character === null) {
      this.resourceService.getAll().subscribe((resources) => {
        this.resources = resources;
      });
      return;
    } else {
      this.resourceService.getAll().subscribe((resources) => {
        this.resources = resources.filter((resource) => resource.characters.some((c) => c.slug === character.slug));
      });
    }
  }
}
