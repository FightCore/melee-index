import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-featured-collections',
  imports: [CardModule, ButtonModule],
  templateUrl: './featured-collections.component.html',
  styleUrl: './featured-collections.component.scss'
})
export class FeaturedCollectionsComponent {

}
