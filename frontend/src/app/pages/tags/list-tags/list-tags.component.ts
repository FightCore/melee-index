import { Component, viewChild, inject, OnDestroy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { TagsOverviewComponent } from '@/app/components/tags/tags-overview/tags-overview.component';
import { CreateTagComponent } from '@/app/components/tags/create-tag/create-tag.component';

@Component({
  selector: 'app-list-tags',
  imports: [TagsOverviewComponent, ButtonModule, DialogModule],
  templateUrl: './list-tags.component.html',
  styleUrl: './list-tags.component.scss',
  providers: [DialogService],
})
export class ListTagsComponent implements OnDestroy {
  private readonly dialogService = inject(DialogService);

  private ref: DynamicDialogRef | undefined;
  private subscription: Subscription | undefined;
  tagsOverviewComponent = viewChild(TagsOverviewComponent);

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showCreateDialog() {
    this.ref = this.dialogService.open(CreateTagComponent, {
      header: 'Create a tag',
      width: '50vw',
      modal: true,
      closable: true,
      dismissableMask: true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    });

    this.subscription = this.ref.onClose.subscribe((tag: string) => {
      if (tag) {
        // Refresh the overview's tags
        this.tagsOverviewComponent()?.refreshTags();
      }
    });
  }
}
