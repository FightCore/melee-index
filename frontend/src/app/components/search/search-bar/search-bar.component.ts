import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { TagFilterComponent } from '../tag-filter/tag-filter.component';
import { ToolbarModule } from 'primeng/toolbar';
import { CharacterFilterComponent } from '../character-filter/character-filter.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';

@Component({
  selector: 'app-search-bar',
  imports: [
    PanelModule,
    TagFilterComponent,
    TagFilterComponent,
    ToolbarModule,
    CharacterFilterComponent,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {}
