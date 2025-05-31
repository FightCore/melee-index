import { Component, viewChild } from '@angular/core';
import { SourceOverviewComponent } from '../../../components/sources/source-overview/source-overview.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CreateSourceComponent } from "../../../components/sources/create-source/create-source.component";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Source } from '../../../../models/source';

@Component({
  selector: 'app-list-sources',
  imports: [SourceOverviewComponent, ButtonModule, DialogModule],
  templateUrl: './list-sources.component.html',
  styleUrl: './list-sources.component.scss',
  providers: [DialogService],
})
export class ListSourcesComponent {
  private ref: DynamicDialogRef | undefined;
  private subscription: Subscription | undefined;
  sourceOverviewComponent = viewChild(SourceOverviewComponent);

  constructor(private readonly dialogService: DialogService) {}

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showCreateDialog() {
    this.ref = this.dialogService.open(CreateSourceComponent, {
      header: 'Create a source',
      width: '50vw',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    });

    this.subscription = this.ref.onClose.subscribe((source: Source) => {
      if (source) {
        // Refresh the overview's sources
        this.sourceOverviewComponent()?.refreshSources();
      }
    });
  }
}
