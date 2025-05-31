import { Component, viewChild } from '@angular/core';
import { AuthorOverviewComponent } from "../../../components/authors/author-overview/author-overview.component";
import { CreateAuthorComponent } from "../../../admin/create-author/create-author.component";
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Author } from '../../../../models/author';

@Component({
  selector: 'app-list-authors',
  imports: [AuthorOverviewComponent, ButtonModule, DialogModule],
  standalone: true,
  templateUrl: './list-authors.component.html',
  styleUrl: './list-authors.component.scss',
  providers: [DialogService],
})
export class ListAuthorsComponent {
  private ref: DynamicDialogRef | undefined;
  private subscription: Subscription | undefined;
  authorOverviewComponent = viewChild(AuthorOverviewComponent);

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
    this.ref = this.dialogService.open(CreateAuthorComponent, {
      header: 'Create a source',
      width: '50vw',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    });

    this.subscription = this.ref.onClose.subscribe((author: Author) => {
      if (author) {
        // Refresh the overview's sources
        this.authorOverviewComponent()?.refreshAuthors();
      }
    });
  }
}
