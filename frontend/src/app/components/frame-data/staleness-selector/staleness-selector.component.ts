import { Component, output } from '@angular/core';
import { ToggleButtonChangeEvent, ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-staleness-selector',
  imports: [ToggleButtonModule],
  templateUrl: './staleness-selector.component.html',
  styleUrl: './staleness-selector.component.scss',
  standalone: true,
})
export class StalenessSelectorComponent {
  stalenessChanged = output<number>();
  private staleness = 0;

  stalenessOptions = [
    { label: 1, value: 0.09 },
    { label: 2, value: 0.08 },
    { label: 3, value: 0.07 },
    { label: 4, value: 0.06 },
    { label: 5, value: 0.05 },
    { label: 6, value: 0.04 },
    { label: 7, value: 0.03 },
    { label: 8, value: 0.02 },
    { label: 9, value: 0.01 },
  ];

  changeStaleness(value: number, add: ToggleButtonChangeEvent) {
    this.staleness = add.checked ? this.staleness + value : this.staleness - value;
    this.stalenessChanged.emit(this.staleness);
  }
}
