import { QuoteBlock } from '@/models/post/blocks/quote-block';
import { Component, computed, input } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-quote',
  imports: [MessageModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
})
export class QuoteComponent {
  readonly block = input.required<QuoteBlock>();
  readonly icon = computed(() => {
    const severity = this.block().type;
    switch (severity) {
      case 'info': {
        return PrimeIcons.INFO_CIRCLE;
      }
    }

    return undefined;
  });
}
