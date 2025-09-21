import { KnowledgeCheckBlock } from '@/models/post/blocks/knowledge-check-block';
import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-knowledge-check',
  imports: [CardModule, CheckboxModule],
  templateUrl: './knowledge-check.component.html',
  styleUrl: './knowledge-check.component.scss',
})
export class KnowledgeCheckComponent {
  readonly block = input.required<KnowledgeCheckBlock>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onOptionChange(event: CheckboxChangeEvent) {
    console.log(event);
  }
}
