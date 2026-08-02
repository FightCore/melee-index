import { Component, signal } from '@angular/core';
import { LinkTable } from '../link-table/link-table';
import { Link } from '../../models/link';

@Component({
  selector: 'app-featured-links',
  imports: [LinkTable],
  templateUrl: './featured-links.html',
  styleUrl: './featured-links.css',
})
export class FeaturedLinks {
  links = signal<Link[]>([]);

  constructor() {
    this.links.set([
      {
        title: 'SSBWiki',
        description: 'Community-maintained encyclopedia covering every character, stage, and mechanic in Melee.',
        tags: ['wiki', 'reference'],
        characters: [],
        url: 'https://www.ssbwiki.com',
        submitted: new Date('2024-01-10'),
      },
      {
        title: 'Slippi',
        description: 'Netplay client and replay format that powers online Melee and modern stats tracking.',
        tags: ['netplay', 'tool'],
        characters: [],
        url: 'https://slippi.gg',
        submitted: new Date('2024-01-15'),
      },
      {
        title: 'Project Slippi (GitHub)',
        description: 'Open-source repository for the Slippi netplay and replay tooling.',
        tags: ['tool', 'open-source'],
        characters: [],
        url: 'https://github.com/project-slippi/project-slippi',
        submitted: new Date('2024-01-20'),
      },
      {
        title: 'Melee Frame Data',
        description: 'Searchable frame data for every character, including hitboxes and animation timing.',
        tags: ['frame-data', 'reference'],
        characters: [],
        url: 'https://meleeframedata.com',
        submitted: new Date('2024-02-01'),
      },
      {
        title: '20XX Training Hack Pack',
        description: 'ROM hack that adds training tools like hitbox display, save states, and CPU control.',
        tags: ['tool', 'training'],
        characters: [],
        url: 'https://20xx.me',
        submitted: new Date('2024-02-05'),
      },
      {
        title: 'r/SSBM',
        description: 'Main Melee subreddit for discussion, clips, tech, and community news.',
        tags: ['community', 'news'],
        characters: [],
        url: 'https://www.reddit.com/r/SSBM',
        submitted: new Date('2024-02-10'),
      },
      {
        title: 'Smashboards Melee Forum',
        description: 'Long-running forum with character-specific boards, matchup charts, and tech discussion.',
        tags: ['community', 'forum'],
        characters: [],
        url: 'https://smashboards.com/forums/melee.14/',
        submitted: new Date('2024-02-15'),
      },
      {
        title: 'Melee It On Me',
        description: 'News outlet covering Melee tournament results, rankings, and scene updates.',
        tags: ['news'],
        characters: [],
        url: 'https://www.meleeitonme.com',
        submitted: new Date('2024-02-20'),
      },
      {
        title: 'Liquipedia Melee',
        description: 'Tournament results, player profiles, and event history for competitive Melee.',
        tags: ['tournament', 'reference'],
        characters: [],
        url: 'https://liquipedia.net/smash/Melee',
        submitted: new Date('2024-03-01'),
      },
      {
        title: 'Panda Global Rankings',
        description: 'Official ranking body publishing the Panda Global Melee Rankings each season.',
        tags: ['ranking'],
        characters: [],
        url: 'https://www.pandaglobal.gg',
        submitted: new Date('2024-03-05'),
      },
      {
        title: 'Genesis',
        description: 'One of the largest annual Melee tournament series, based in Northern California.',
        tags: ['tournament'],
        characters: [],
        url: 'https://www.genesisgg.com',
        submitted: new Date('2024-03-10'),
      },
      {
        title: 'The Big House',
        description: 'Annual major Melee tournament held in Michigan.',
        tags: ['tournament'],
        characters: [],
        url: 'https://thebighouse.gg',
        submitted: new Date('2024-03-15'),
      },
      {
        title: 'VGBootCamp on Twitch',
        description: 'Streaming channel broadcasting major Melee tournaments and events.',
        tags: ['stream', 'tournament'],
        characters: [],
        url: 'https://www.twitch.tv/vgbootcamp',
        submitted: new Date('2024-03-20'),
      },
    ]);
  }
}
