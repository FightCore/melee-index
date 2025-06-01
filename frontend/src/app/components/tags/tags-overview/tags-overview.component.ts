import { AsyncPipe } from '@angular/common';
import { Component, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TagsService } from '../../../services/tags/tags.service';

@Component({
  selector: 'app-tags-overview',
  imports: [TableModule, ButtonModule, DynamicDialogModule],
  templateUrl: './tags-overview.component.html',
  styleUrl: './tags-overview.component.scss',
  standalone: true,
})
export class TagsOverviewComponent {
  tags: string[] = [];
  table = viewChild(Table);

  constructor(private readonly tagService: TagsService) {
    this.refreshTags();
  }

  refreshTags(): void {
    this.tagService.getAll(false).subscribe((tags) => {
      this.tags = [...tags];
    });
  }

  deleteTag(name: string): void {
    this.tagService.delete(name).subscribe({
      next: () => {
        this.refreshTags();
      },
      error: (err) => console.error('Error deleting source', err),
    });
  }
}
