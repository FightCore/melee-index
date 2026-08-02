import { Component, signal } from '@angular/core';
import { Link } from '../../models/link';
import { LinkTable } from '../../components/link-table/link-table';
import { FeaturedLinks } from '../../components/featured-links/featured-links';
import { Region } from '../../ui/region/region';

@Component({
  selector: 'app-home',
  imports: [LinkTable, FeaturedLinks, Region],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
