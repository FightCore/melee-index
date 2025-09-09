import { YoutubeVideoEmbedBlock } from '@/app/services/articles/articles.service';
import { Component, input } from '@angular/core';
import { YOUTUBE_PLAYER_CONFIG, YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-youtube-embed',
  imports: [YouTubePlayer],
  providers: [
    {
      provide: YOUTUBE_PLAYER_CONFIG,
      useValue: {
        disablePlaceholder: true,
      },
    },
  ],
  templateUrl: './youtube-embed.component.html',
  styleUrl: './youtube-embed.component.scss',
})
export class YoutubeEmbedComponent {
  readonly block = input.required<YoutubeVideoEmbedBlock>();
}
