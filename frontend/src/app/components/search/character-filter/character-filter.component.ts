import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FloatLabel } from 'primeng/floatlabel';
import { SearchBarService } from '../../../services/search-bar/search-bar.service';

@Component({
  selector: 'app-character-filter',
  imports: [MultiSelectModule, FormsModule, FloatLabel, ReactiveFormsModule],
  templateUrl: './character-filter.component.html',
  styleUrl: './character-filter.component.scss',
})
export class CharacterFilterComponent implements OnInit {
  characters = [
    {
      label: 'Characters',
      value: 'characters',
      items: [
        { label: 'Fox', value: 'fox' },
        { label: 'Marth', value: 'marth' },
        { label: 'Falco', value: 'falco' },
        {
          label: 'Jigglypuff',
          value: 'jigglypuff',
        },
        { label: 'Sheik', value: 'sheik' },
        {
          label: 'Captain Falcon',
          value: 'captain-falcon',
        },
        { label: 'Peach', value: 'peach', imageName: 'Princess Peach' },
        { label: 'Ice Climbers', value: 'ice-climbers' },
        { label: 'Pikachu', value: 'pikachu' },
        { label: 'Yoshi', value: 'yoshi' },
        { label: 'Samus', value: 'samus' },
        { label: 'Luigi', value: 'luigi' },
        { label: 'Dr. Mario', value: 'dr-mario' },
        { label: 'Ganondorf', value: 'ganondorf' },
        { label: 'Mario', value: 'mario' },
        { label: 'Young Link', value: 'young-link' },
        { label: 'Donkey Kong', value: 'donkey-kong' },
        { label: 'Link', value: 'link' },
        {
          label: 'Mr. Game & Watch',
          value: 'mr-game-watch',
        },
        { label: 'Mewtwo', value: 'mewtwo' },
        { label: 'Roy', value: 'roy' },
        { label: 'Ness', value: 'ness' },
        { label: 'Pichu', value: 'pichu' },
        { label: 'Zelda', value: 'zelda', imageName: 'Princess Zelda' },
        { label: 'Kirby', value: 'kirby' },
        { label: 'Bowser', value: 'bowser' },
      ],
    },
    {
      label: 'Special characters',
      value: 'special',
      items: [
        {
          label: 'Master Hand',
          value: 'master-hand',
          imageName: 'Bowser',
        },
        {
          label: 'Crazy Hand',
          value: 'crazy-hand',
          imageName: 'Bowser',
        },
        {
          label: 'Sandbag',
          value: 'sandbag',
          imageName: 'Bowser',
        },
        {
          label: 'Female Wireframe',
          value: 'female-wireframe',
          imageName: 'Bowser',
        },
        {
          label: 'Male Wireframe',
          value: 'male-wireframe',
          imageName: 'Bowser',
        },
        {
          label: 'Giga Bowser',
          value: 'giga-bowser',
          imageName: 'Bowser',
        },
      ],
    },
  ];
  formControl = new FormControl<string[] | null>([]);

  constructor(private searchBarService: SearchBarService) {}

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe((newValue) => {
      if (newValue === null || newValue.length === 0) {
        this.searchBarService.setFilter('character-filter', null);
        return;
      }

      this.searchBarService.setFilter('character-filter', {
        tags: {
          some: {
            in: newValue,
          },
        },
      });
    });
  }
}
