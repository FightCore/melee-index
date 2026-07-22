import { KnowledgeCheckBlock } from '@/models/post/blocks/knowledge-check-block';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-knowledge-check',
  imports: [CardModule, RadioButtonModule, FormsModule, ButtonModule],
  templateUrl: './knowledge-check.component.html',
  styleUrl: './knowledge-check.component.scss',
})
export class KnowledgeCheckComponent {
  readonly block = input.required<KnowledgeCheckBlock>();
  isCorrect: boolean | null = null;
  selectedOption: string | undefined = undefined;

  submit(): void {
    this.isCorrect = this.selectedOption === this.block().correctAnswer;
  }
}
