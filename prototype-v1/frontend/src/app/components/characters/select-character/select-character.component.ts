import { CharacterService } from '@/app/services/characters/character.service';
import { Character } from '@/models/post/character';
import { Component, inject, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { SelectModule } from 'primeng/select';
import { ChipModule } from 'primeng/chip';
import { CharacterIconComponent } from '@/app/components/generic/character-icon/character-icon.component';

@Component({
  selector: 'app-select-character',
  imports: [SelectModule, FormsModule, AvatarModule, ChipModule, CharacterIconComponent],
  templateUrl: './select-character.component.html',
  styleUrl: './select-character.component.scss',
  standalone: true,
})
export class SelectCharacterComponent implements OnInit {
  characters: Character[] = [];
  selectedCharacter = output<Character | null>();

  private readonly characterService = inject(CharacterService);

  ngOnInit(): void {
    this.characterService.getAll().subscribe((characters) => {
      this.characters = [...characters].sort((a, b) => a.name.localeCompare(b.name));
    });
  }
}
