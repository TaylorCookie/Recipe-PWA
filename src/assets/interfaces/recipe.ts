export interface Recipe {
  id: number;
  title: string;
  time: number;
  primaryTag: string;
  serves: number;
  imageSrc: string;
  favorite: boolean;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  notes: string[];
}
