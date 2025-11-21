export interface Gallery {
  _id: string;
  image: string;
  description: string;
}

export interface Product {
    _id: string;
  title: string;
    description: string;    
    price: number;
    image: string[];
      "length": number;
            "height": number;
            "width": number;
            "weight": number;
            "colors": string[
            ];

}
