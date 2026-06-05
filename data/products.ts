export interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
}

export const products: Product[] = [
  {
    id: "yamaha-f310",
    name: "Yamaha F310",
    category: "Acoustic Guitar",
    price: 8990,
    image: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "fender-sonoran",
    name: "Fender Sonoran SCE",
    category: "Acoustic Guitar",
    price: 24999,
    image: "https://images.pexels.com/photos/1650977/pexels-photo-1650977.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "ibanez-grg170dx",
    name: "Ibanez GRG170DX",
    category: "Electric Guitar",
    price: 15490,
    image: "https://images.pexels.com/photos/1757702/pexels-photo-1757702.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "epiphone-les-paul",
    name: "Epiphone Les Paul Special",
    category: "Electric Guitar",
    price: 22990,
    image: "https://images.pexels.com/photos/345727/pexels-photo-345727.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "kadence-frontier",
    name: "Kadence Frontier Series",
    category: "Acoustic Guitar",
    price: 4490,
    image: "https://images.pexels.com/photos/3457624/pexels-photo-3457624.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "daddario-strings",
    name: "D'Addario EJ16 Phosphor",
    category: "Strings",
    price: 650,
    image: "https://images.pexels.com/photos/2744956/pexels-photo-2744956.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
]
