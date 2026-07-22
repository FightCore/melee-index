import { Component } from '@angular/core';
import { TitleBarComponent } from '@/app/components/layout/title-bar/title-bar.component';

@Component({
  selector: 'app-about',
  imports: [TitleBarComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
