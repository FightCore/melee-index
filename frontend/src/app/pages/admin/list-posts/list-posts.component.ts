import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PostService } from '@/app/services/post/post.service';
import { Post } from '@/models/post';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-posts',
  imports: [ButtonModule, TableModule, RouterModule, DatePipe],
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.scss'
})
export class ListPostsComponent {
  private readonly postService = inject(PostService);

  posts: Post[] = [];

  constructor() {
    this.refreshPosts();
  }

  refreshPosts(): void {
    this.postService.getAll(false).subscribe((posts) => {
      this.posts = posts;
    });
  }

  deletePost(id: string): void {
    this.postService.delete(id).subscribe({
      next: () => {
        this.refreshPosts();
      },
      error: (err) => console.error('Error deleting source', err),
    });
  }
}
