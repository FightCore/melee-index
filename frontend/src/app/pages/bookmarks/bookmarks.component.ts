import { PostCardComponent } from '@/app/components/post/post-card/post-card.component';
import { BookmarkService } from '@/app/services/bookmarks/bookmark.service';
import { Article } from '@/models/post/article';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmarks',
  imports: [PostCardComponent],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
})
export class BookmarksComponent implements OnInit {
  bookmarkedPosts: Article[] = [];
  private readonly bookmarkService = inject(BookmarkService);

  ngOnInit(): void {
    this.bookmarkService.get().subscribe((posts) => {
      this.bookmarkedPosts = posts;
    });
  }
}
