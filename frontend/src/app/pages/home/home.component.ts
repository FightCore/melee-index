import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { CarouselModule } from 'primeng/carousel';
import { ListboxModule } from 'primeng/listbox';
import { FeaturedCollectionsComponent } from '@/app/components/collections/featured-collections/featured-collections.component';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, MessageModule, ListboxModule, FeaturedCollectionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
