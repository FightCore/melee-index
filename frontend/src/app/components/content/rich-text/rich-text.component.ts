import { RichTextBlock } from '@/app/services/articles/articles.service';
import { Component, input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrl: './rich-text.component.scss',
  imports: [MarkdownComponent],
  standalone: true,
})
export class RichTextComponent {
  readonly block = input.required<RichTextBlock>();
}
