import { QuoteBlock } from '@/app/services/articles/articles.service';
import { Component, input } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-quote',
  imports: [MessageModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
})
export class QuoteComponent {
  readonly block = input.required<QuoteBlock>();
}
