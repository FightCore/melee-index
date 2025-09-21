import { Article } from '@/models/post/article';
import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-post-card',
  imports: [CardModule, ButtonModule, RouterModule, AvatarModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
  standalone: true,
})
export class PostCardComponent {
  readonly post = input.required<Article>();
}
