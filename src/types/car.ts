export enum BodyType {
  Sedan = "Sedan",
  GrandTourer = "Grand Tourer",
  SUV = "SUV",
  Hatchback = "Hatchback",
  Crossover = "Crossover",
}

export enum Brand {
  Tesla = "Tesla",
  Kia = "Kia",
  Toyota = "Toyota",
  RangeRover = "Range Rover",
  Lamborgini = "Lamborgini",
  Chevrlet = "Chevrolet",
  Volkswagen = "Volkswagen",
  Porsche = "Porsche",
}

export type Car = {
  id: string;
  brand: Brand;
  model: string;
  image: string;
  price: number;
  year: number;
  bodyType: BodyType;
};
