import { FrameDataCharacter } from '@/models/frame-data/frame-data-character';
import { Move } from '@/models/frame-data/move';
import { Component, input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-frame-data-breadcrumbs',
  imports: [RouterModule],
  templateUrl: './frame-data-breadcrumbs.component.html',
  styleUrl: './frame-data-breadcrumbs.component.scss',
  standalone: true,
})
export class FrameDataBreadcrumbsComponent implements OnInit {
  readonly character = input<FrameDataCharacter>();
  readonly move = input<Move>();

  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  ngOnInit(): void {
    this.items = [{ label: 'Frame Data', routerLink: '/frame-data' }];
    const character = this.character();
    if (character) {
      this.items.push({
        label: character.name,
        routerLink: `/frame-data/${character.fightCoreId}/${character.name}`,
      });
    }

    const move = this.move();
    if (move) {
      this.items.push({
        label: move.name!,
        routerLink: `/frame-data/${character?.fightCoreId}/${character?.name}/moves/${move.id}/${move.name}`,
      });
    }

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
}
