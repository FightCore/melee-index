import { PostCardComponent } from '@/app/components/post/post-card/post-card.component';
import { BookmarkService } from '@/app/services/bookmarks/bookmark.service';
import { Article } from '@/models/post/article';
import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TitleBarComponent } from '@/app/components/layout/title-bar/title-bar.component';

@Component({
  selector: 'app-bookmarks',
  imports: [PostCardComponent, TitleBarComponent],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
})
export class BookmarksComponent implements OnInit {
  bookmarkedPosts: Article[] = [];
  private readonly bookmarkService = inject(BookmarkService);
  private readonly metaService = inject(Meta);
  private readonly titleService = inject(Title);

  ngOnInit(): void {
    this.bookmarkService.get().subscribe((posts) => {
      this.bookmarkedPosts = posts;
    });
  }
  constructor() {
    this.titleService.setTitle('Bookmarks - Melee Index');
    this.metaService.addTags([
      {
        name: 'description',
        content: 'View and manage your bookmarked articles about Super Smash Bros. Melee.',
      },
      { name: 'keywords', content: 'Super Smash Bros. Melee, Melee, Bookmarks, Articles' },
    ]);
  }
}
