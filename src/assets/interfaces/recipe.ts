export interface Recipe {
  id: number;
  title: string;
  time: number;
  tags: string[];
  primaryTag: string;
  serves: number;
  imageSrc: string;
  favorite: boolean;
  ingredients: string[];
  instructions: string[];
  notes: string[];
}
