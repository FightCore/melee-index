import { CharacterService } from '@/app/services/characters/character.service';
import { Character } from '@/models/post/character';
import { Component, inject, OnInit, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-character-selection-bar',
  imports: [ButtonModule],
  templateUrl: './character-selection-bar.component.html',
  styleUrl: './character-selection-bar.component.scss',
  standalone: true,
})
export class CharacterSelectionBarComponent implements OnInit {
  private readonly characterService = inject(CharacterService);
  characters: Character[] = [];
  selectedCharacter = output<Character | null>();
  internalSelectedCharacter: Character | null = null;

  ngOnInit(): void {
    this.characterService.getAll().subscribe((characters) => {
      this.characters = [...characters].sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  onClickCharacter(character: Character) {
    if (this.internalSelectedCharacter === character) {
      this.internalSelectedCharacter = null;
      this.selectedCharacter.emit(this.internalSelectedCharacter);
      return;
    }

    this.internalSelectedCharacter = character;
    this.selectedCharacter.emit(this.internalSelectedCharacter);
  }
}
