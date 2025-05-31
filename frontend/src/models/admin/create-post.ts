export interface CreatePost {
  title: string;
  url: string;
  summary: string;
  created: Date;
  modified: Date;
  author: string;
  source: string;
  tags: string[];
}
