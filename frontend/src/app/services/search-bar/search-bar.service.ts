/* eslint-disable @typescript-eslint/no-explicit-any */
// This file is written to support dynamic filters and because of that heavily uses `any` types.
// This is done to allow for flexibility in the filters used across different components.
import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  // Stateful service to handle the different filters from the search bar.
  // Saves for each component what their filter is and merges it together for the main table.
  private readonly filterMap: Map<string, any> = new Map<string, any>();
  private readonly filters = signal<{ filters: { and: any[] } }>({
    filters: { and: [] },
  });

  // Getter to access the current state of filters
  get filters$(): Signal<any> {
    return this.filters.asReadonly();
  }

  setFilter(owner: string, filter: any): void {
    if (filter === null) {
      this.filterMap.delete(owner);
    } else {
      this.filterMap.set(owner, filter);
    }

    this.updateFilters();
  }

  private updateFilters(): void {
    const newFilters: { and: any[] } = { and: [] };
    for (const [_, value] of this.filterMap) {
      newFilters.and.push(value);
    }
    this.filters.set({ filters: newFilters });
  }
}
