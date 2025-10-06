import { Article } from '@/models/post/article';
import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { BookmarkService } from '@/app/services/bookmarks/bookmark.service';

@Component({
  selector: 'app-post-card',
  imports: [CardModule, ButtonModule, RouterModule, AvatarModule, ChipModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
  standalone: true,
})
export class PostCardComponent {
  private readonly bookmarkService = inject(BookmarkService);

  readonly post = input.required<Article>();

  toggleBookmark(): void {
    if (this.post().bookmarked) {
      this.post().bookmarked = false;
      this.bookmarkService.remove(this.post().documentId).subscribe({
        error: () => {
          this.post().bookmarked = true;
        },
      });
    } else {
      this.post().bookmarked = true;
      this.bookmarkService.add(this.post().documentId).subscribe({
        error: () => {
          this.post().bookmarked = false;
        },
      });
    }
  }
}
