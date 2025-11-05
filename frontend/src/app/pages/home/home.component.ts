import { Component, inject } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { CarouselModule } from 'primeng/carousel';
import { ListboxModule } from 'primeng/listbox';
import { LatestPostsComponent } from '@/app/components/post/latest-posts/latest-posts.component';
import { Article } from '@/models/post/article';
import { PostService } from '@/app/services/post/post.service';
import { Meta, Title } from '@angular/platform-browser';
import { WebsiteSectionCardComponent } from '@/app/components/hero/website-section-card/website-section-card.component';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, MessageModule, ListboxModule, LatestPostsComponent, WebsiteSectionCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly postService = inject(PostService);
  private readonly metaService = inject(Meta);
  private readonly titleService = inject(Title);
  latestPosts: Article[] = [];

  heroSections = [
    {
      title: 'Starter guide',
      description: 'Learn to get started with setting up your copy of Super Smash Bros Melee.',
      link: '/frame-data',
      author: 'Melee Index Team',
    },
    {
      title: 'Fundamentals',
      description: 'Learn movement, spacing, and the core mechanics.',
      link: '/collections/skill-levels',
      author: 'Melee Index Team',
    },
    {
      title: 'Advanced Tech',
      description: 'Dive into advanced matchup knowledge, tech skill, and strategies to elevate your gameplay.',
      link: '/collections/weapons',
      author: 'Melee Index Team',
    },
    {
      title: 'Frame data',
      description: 'Dive into the frame data of every move and learn how to gain the edge over your opponent.',
      link: '/frame-data',
      author: 'Fightcore Team',
    },
  ];

  constructor() {
    this.postService.getLatest().subscribe((posts) => {
      this.latestPosts = posts;
    });

    this.titleService.setTitle('Home - Melee Index');
    this.metaService.addTags([
      { name: 'description', content: 'Stay updated with the latest articles and news about Super Smash Bros. Melee.' },
      { name: 'keywords', content: 'Super Smash Bros. Melee, Melee, Articles, News, Updates' },
    ]);
  }
}
