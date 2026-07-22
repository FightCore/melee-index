import { environment } from '@/environments/environment';
import { Article } from '@/models/post/article';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private readonly http = inject(HttpClient);

  add(postId: string): Observable<unknown> {
    return this.http.post<unknown>(`${environment.apiUrl}/posts/${postId}/bookmark`, {});
  }
  remove(postId: string): Observable<unknown> {
    return this.http.delete<unknown>(`${environment.apiUrl}/posts/${postId}/bookmark`, {});
  }

  get(): Observable<Article[]> {
    return this.http.get<Article[]>(`${environment.apiUrl}/bookmarks`);
  }
}
