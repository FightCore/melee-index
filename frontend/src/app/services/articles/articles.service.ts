import { environment } from '@/environments/environment';
import { Article } from '@/models/post/article';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly httpClient = inject(HttpClient);

  article(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${environment.apiUrl}/posts/${id}`);
  }
}
