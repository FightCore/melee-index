import { Component, effect } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { Apollo } from 'apollo-angular';
import { SearchBarService } from '../../services/search-bar/search-bar.service';
import { CarouselModule } from 'primeng/carousel';
import { ListboxModule } from 'primeng/listbox';
import { FeaturedPostCarouselComponent } from "../../components/posts/featured-post-carousel/featured-post-carousel.component";
import { LatestPostCarouselComponent } from "../../components/posts/latest-post-carousel/latest-post-carousel.component";
import { FeaturedCollectionsComponent } from "../../components/collections/featured-collections/featured-collections.component";

@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    MessageModule,
    ListboxModule,
    FeaturedPostCarouselComponent,
    LatestPostCarouselComponent,
    FeaturedCollectionsComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  filter: any = {};
  featuredPosts: any[] = [];
  latestPosts: any[] = [];
  constructor(
    private readonly apollo: Apollo,
    private searchBarService: SearchBarService
  ) {
    effect(() => {
      this.filter = this.searchBarService.filters$().filters;
    });
  }
}
