import { Product } from "@/lib/types/type";
import apiUrl from "../api";
import axios from "axios";
import { log } from "console";

export interface StoreResponse {
  data: Product[];
}

async function fetchStore(): Promise<StoreResponse> {
  const storeUrl = `${apiUrl}/store`;
  console.log(storeUrl);
  const response = await axios.get<StoreResponse>(storeUrl);
  console.log("Raw response:", response.data);

  return response.data;
}
export default fetchStore;
