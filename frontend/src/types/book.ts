export interface Book {
  id: string;
  title: string;
  genre: string;
  author: string;
  image: string;
  description: string;
  summary: string;
  total_copies: number;
  available_copies: number;
  created_at: Date;
  updated_at: Date;
}
