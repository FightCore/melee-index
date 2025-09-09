import { SliderBlock } from '@/app/services/articles/articles.service';
import { Component, input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-slider',
  imports: [CarouselModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  readonly block = input.required<SliderBlock>();
}
