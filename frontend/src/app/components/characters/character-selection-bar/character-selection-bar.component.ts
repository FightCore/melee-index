import { CharacterService } from '@/app/services/characters/character.service';
import { Character } from '@/models/post/character';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-selection-bar',
  imports: [],
  templateUrl: './character-selection-bar.component.html',
  styleUrl: './character-selection-bar.component.scss',
  standalone: true,
})
export class CharacterSelectionBarComponent implements OnInit {
  private readonly characterService = inject(CharacterService);
  characters: Character[] = [];

  ngOnInit(): void {
        this.characterService.getAll().subscribe((characters) => {
      this.characters = [...characters].sort((a, b) => a.name.localeCompare(b.name));
    });
  }
}
