import { CategoryService } from '@/app/services/categories/category.service';
import { Category } from '@/models/post/category';
import { Component, inject, OnInit, output } from '@angular/core';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-select-category',
  imports: [SelectModule],
  templateUrl: './select-category.component.html',
  styleUrl: './select-category.component.scss',
  standalone: true,
})
export class SelectCategoryComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory = output<Category | null>();

  private readonly categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = [...categories].sort((a, b) => a.name.localeCompare(b.name));
    });
  }
}
