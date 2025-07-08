import { Component, viewChild, inject, OnDestroy } from '@angular/core';
import { AuthorOverviewComponent } from "@/app/components/authors/author-overview/author-overview.component";
import { CreateAuthorComponent } from "@/app/admin/create-author/create-author.component";
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Author } from '@/models/author';

@Component({
  selector: 'app-list-authors',
  imports: [AuthorOverviewComponent, ButtonModule, DialogModule],
  standalone: true,
  templateUrl: './list-authors.component.html',
  styleUrl: './list-authors.component.scss',
  providers: [DialogService],
})
export class ListAuthorsComponent implements OnDestroy {
  private readonly dialogService = inject(DialogService);

  private ref: DynamicDialogRef | undefined;
  private subscription: Subscription | undefined;
  authorOverviewComponent = viewChild(AuthorOverviewComponent);

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
      header: 'Create an author',
      width: '50vw',
      closable: true,
      modal: true,
      dismissableMask: true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
    });

    this.subscription = this.ref.onClose.subscribe((author: Author) => {
      if (author) {
        // Refresh the overview's authors
        this.authorOverviewComponent()?.refreshAuthors();
      }
    });
  }
}
