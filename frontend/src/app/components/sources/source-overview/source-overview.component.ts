import { AsyncPipe } from '@angular/common';
import { Component, viewChild, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { Source } from '@/models/source';
import { SourceService } from '@/app/services/source/source.service';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-source-overview',
  imports: [TableModule, AsyncPipe, ButtonModule, DynamicDialogModule],
  templateUrl: './source-overview.component.html',
  styleUrl: './source-overview.component.scss',
  standalone: true,
})
export class SourceOverviewComponent {
  private readonly sourceService = inject(SourceService);

  sources: Source[] = [];
  table = viewChild(Table);

  constructor() {
    this.refreshSources();
  }

  refreshSources(): void {
    this.sourceService.getAll(false).subscribe((sources) => {
      this.sources = [...sources];
    });
  }

  deleteSource(id: string): void {
    this.sourceService.delete(id).subscribe({
      next: () => {
        this.refreshSources();
      },
      error: (err) => console.error('Error deleting source', err),
    });
  }
}
