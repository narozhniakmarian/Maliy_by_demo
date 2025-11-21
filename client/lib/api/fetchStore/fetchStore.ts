import { Product } from "@/lib/types/type";
import apiUrl from "../api";
import axios from "axios";

export interface StoreResponse {
  data: Product[];
}

async function fetchStore(): Promise<StoreResponse> {
  const storeUrl = `${apiUrl}/store`;

  const response = await axios.get<StoreResponse>(storeUrl);
  console.log("Raw response:", response.data);

  return response.data;
}
export default fetchStore;
