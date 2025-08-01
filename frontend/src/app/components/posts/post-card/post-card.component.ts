import { Component, input } from '@angular/core';
import { Post } from '@/models/post';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DatePipe } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-post-card',
  imports: [CardModule, ButtonModule, ChipModule, DatePipe, AvatarModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  readonly post = input.required<Post>();
}
