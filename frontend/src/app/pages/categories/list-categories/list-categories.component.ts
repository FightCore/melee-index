import { Component, viewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CategoryOverviewComponent } from '../../../components/categories/category-overview/category-overview.component';
import { CreateCategoryComponent } from '../../../components/categories/create-category/create-category.component';
import { Category } from '../../../../models/category';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-list-categories',
  imports: [CategoryOverviewComponent, ButtonModule, DialogModule],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.scss',
  standalone: true,
  providers: [DialogService],
})
export class ListCategoriesComponent {
  private ref: DynamicDialogRef | undefined;
  private subscription: Subscription | undefined;
  categoryOverviewComponent = viewChild(CategoryOverviewComponent);

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
    this.ref = this.dialogService.open(CreateCategoryComponent, {
      header: 'Create a category',
      width: '50vw',
      closable: true,
      modal: true,
      dismissableMask: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      style: {
        'min-height': '400px',
        'max-height': '90vh',
      },
      contentStyle: {
        "height": "100%",
      }
    });

    this.subscription = this.ref.onClose.subscribe((author: Category) => {
      if (author) {
        // Refresh the overview's categories
        this.categoryOverviewComponent()?.refreshCategories();
      }
    });
  }
}
