import { Article } from '@/models/post/article';
import { Component, computed, inject, input, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { BookmarkService } from '@/app/services/bookmarks/bookmark.service';
import { ALIGN_FOOTER_CARD_WITH_HEADER_PT } from '@/app/utilities/passthroughs/card-passthroughs';

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
  readonly compact = input<boolean>(false);

  private readonly internalPost = signal<Article | null>(null);

  displayPost = computed(() => {
    const fromInput = this.post();
    const fromInternal = this.internalPost();
    return fromInternal || fromInput;
  });
  cardPtOptions = ALIGN_FOOTER_CARD_WITH_HEADER_PT;

  toggleBookmark(): void {
    if (this.post().bookmarked) {
      this.updateBookmarked(false);
      this.bookmarkService.remove(this.post().documentId).subscribe({
        error: () => {
          this.updateBookmarked(true);
        },
      });
    } else {
      this.updateBookmarked(true);
      this.bookmarkService.add(this.post().documentId).subscribe({
        error: () => {
          this.updateBookmarked(false);
        },
      });
    }
  }

  private updateBookmarked(bookmarked: boolean): void {
    this.internalPost.update((post) => {
      if (!post) {
        // Clone the input post as mutating inputs is not allowed
        post = structuredClone(this.post());
      }
      post.bookmarked = bookmarked;
      return post;
    });
  }
}
