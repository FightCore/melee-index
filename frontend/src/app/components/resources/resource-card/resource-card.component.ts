import { Resource } from '@/models/resources/resource';
import { Component, input } from '@angular/core';
import { Card } from 'primeng/card';
import { BaseIcon } from 'primeng/icons/baseicon';
import { ButtonModule } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { CharacterIconComponent } from '../../generic/character-icon/character-icon.component';

@Component({
  selector: 'app-resource-card',
  imports: [Card, BaseIcon, ButtonModule, Avatar, CharacterIconComponent],
  templateUrl: './resource-card.component.html',
  styleUrl: './resource-card.component.scss',
})
export class ResourceCardComponent {
  readonly resource = input.required<Resource>();
}
