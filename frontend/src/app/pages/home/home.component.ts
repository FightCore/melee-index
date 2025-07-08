import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { CarouselModule } from 'primeng/carousel';
import { ListboxModule } from 'primeng/listbox';
import { FeaturedPostCarouselComponent } from '@/app/components/posts/featured-post-carousel/featured-post-carousel.component';
import { FeaturedCollectionsComponent } from '@/app/components/collections/featured-collections/featured-collections.component';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, MessageModule, ListboxModule, FeaturedPostCarouselComponent, FeaturedCollectionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
