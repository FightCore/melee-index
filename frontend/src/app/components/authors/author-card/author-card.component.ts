import { Author } from '@/models/post/blocks/author';
import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-author-card',
  imports: [CardModule, AvatarModule, ButtonModule, DatePipe],
  templateUrl: './author-card.component.html',
  styleUrl: './author-card.component.scss',
  standalone: true,
})
export class AuthorCardComponent {
  readonly author = input.required<Author>();
}
