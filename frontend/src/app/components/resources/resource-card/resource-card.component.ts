import { Resource } from '@/models/resources/resource';
import { Component, input } from '@angular/core';
import { Card } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { CharacterIconComponent } from '@/app/components/generic/character-icon/character-icon.component';

@Component({
  selector: 'app-resource-card',
  imports: [Card, ButtonModule, Avatar, CharacterIconComponent],
  templateUrl: './resource-card.component.html',
  styleUrl: './resource-card.component.scss',
})
export class ResourceCardComponent {
  readonly resource = input.required<Resource>();
}
