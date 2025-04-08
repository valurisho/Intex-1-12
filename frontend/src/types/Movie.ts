export interface Movie {
  show_id: string;
  title: string;
  type: string;
  director: string;
  cast: string;
  country: string;
  release_year: number;
  rating: string;
  duration: string;
  description: string;
  categories: string[]; // <-- new!
}
