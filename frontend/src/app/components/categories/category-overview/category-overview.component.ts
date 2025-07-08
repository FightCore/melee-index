import { Component, viewChild, inject } from '@angular/core';
import { Category } from '@/models/category';
import { Table, TableModule } from 'primeng/table';
import { CategoryService } from '@/app/services/categories/category.service';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-overview',
  imports: [ReactiveFormsModule, FormsModule, TableModule, ButtonModule, DynamicDialogModule, ColorPickerModule],
  templateUrl: './category-overview.component.html',
  styleUrl: './category-overview.component.scss',
  standalone: true,
})
export class CategoryOverviewComponent {
  private readonly categoryService = inject(CategoryService);

  categories: Category[] = [];
  table = viewChild(Table);

  constructor() {
    this.refreshCategories();
  }

  refreshCategories(): void {
    this.categoryService.getAll(false).subscribe((categories) => {
      this.categories = [...categories];
    });
  }

  deleteCategory(id: string): void {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.refreshCategories();
      },
      error: (err) => console.error('Error deleting category', err),
    });
  }
}
