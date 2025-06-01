import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-tag-filter',
  imports: [MultiSelectModule, FormsModule, FloatLabel],
  templateUrl: './tag-filter.component.html',
  styleUrl: './tag-filter.component.scss',
})
export class TagFilterComponent {
  tags = [
    {
      label: 'Concepts',
      value: 'concepts',
      items: ['bible', 'cookbook'],
    },
    {
      label: 'Techniques',
      value: 'tech',
      items: ['tech-skill', 'dash-dancing', 'ledge-dash'],
    },
  ];

  selectedTags: string[] = [];
}
