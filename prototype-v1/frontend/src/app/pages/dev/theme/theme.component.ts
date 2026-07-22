import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-theme',
  imports: [ButtonModule, InputTextModule, PasswordModule, CardModule, TableModule, PaginatorModule],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss',
  standalone: true,
})
export class ThemeComponent {
  users = [
    { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob', email: 'bob@example.com', role: 'Editor' },
    { name: 'Charlie', email: 'charlie@example.com', role: 'Viewer' },
    { name: 'Diana', email: 'diana@example.com', role: 'Admin' },
    { name: 'Eve', email: 'eve@example.com', role: 'Editor' },
    { name: 'Frank', email: 'frank@example.com', role: 'Viewer' },
  ];
}
