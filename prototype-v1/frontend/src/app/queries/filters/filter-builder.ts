import { FilterParameter } from './filter-parameter';
import { FilterState } from './filter-state';

export class FilterBuilder {
  static build(filterState: FilterState): FilterParameter {
    const filterParameter: FilterParameter = {};

    if (filterState.authors && filterState.authors.length > 0) {
      const authorFilters = filterState.authors.map((authorName) => ({ name: { eq: authorName } }));
      if (authorFilters.length === 1) {
        Object.assign(filterParameter, { author: authorFilters[0] });
      } else {
        Object.assign(filterParameter, { author: { or: authorFilters } });
      }
    }

    if (filterState.characters && filterState.characters.length > 0) {
      const characterFilters = filterState.characters.map((characterName) => ({
        some: { name: { eq: characterName } },
      }));
      if (characterFilters.length === 1) {
        Object.assign(filterParameter, { characters: characterFilters[0] });
      } else {
        Object.assign(filterParameter, { characters: { or: characterFilters } });
      }
    }

    if (filterState.categories && filterState.categories.length > 0) {
      const categoryFilters = filterState.categories.map((categoryName) => ({ name: { eq: categoryName } }));
      if (categoryFilters.length === 1) {
        Object.assign(filterParameter, { category: categoryFilters[0] });
      } else {
        Object.assign(filterParameter, { category: { or: categoryFilters } });
      }
    }

    return filterParameter;
  }
}
