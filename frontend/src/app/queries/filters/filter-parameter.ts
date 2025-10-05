export interface FilterParameter {
  author?: AuthorFilter;
  characters?: CharacterFilter;
  category?: CategoryFilter;
  title?: { contains: string };
}

export interface StringFilter {
  eq?: string;
}

export interface OrFilter<TFilter> {
  or: TFilter[];
}

export interface AndFilter<TFilter> {
  and: TFilter[];
}

export interface ArrayFilter {
  some: CharacterFilter;
}

export interface CharacterFilter {
  name?: StringFilter;
  slug?: StringFilter;
  or?: OrFilter<CharacterFilter>;
  and?: AndFilter<CharacterFilter>;
}

export interface CategoryFilter {
  name?: StringFilter;
  slug?: StringFilter;
  or?: OrFilter<CategoryFilter>;
  and?: AndFilter<CategoryFilter>;
}

export interface AuthorFilter {
  name?: StringFilter;
  slug?: StringFilter;
  or?: OrFilter<AuthorFilter>;
  and?: AndFilter<AuthorFilter>;
}
