import { Component, input } from '@angular/core';
import { Link } from '../../models/link';
import { Badge } from '../../ui/badge/badge';

@Component({
  selector: 'app-link-table',
  imports: [Badge],
  templateUrl: './link-table.html',
  styleUrl: './link-table.css',
})
export class LinkTable {
  links = input.required<Link[]>();
}
