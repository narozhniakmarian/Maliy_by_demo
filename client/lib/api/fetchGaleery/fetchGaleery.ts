import apiUrl from "../api";
import { Gallery } from "../../types/type";
import axios from "axios";

export interface GalleryResponse {
  data: Gallery[];
}

async function fetchGallery(): Promise<GalleryResponse> {
  const galleryUrl = `${apiUrl}/gallery`;
  console.log(galleryUrl);
  const response = await axios.get<GalleryResponse>(galleryUrl);
  console.log("Raw response:", response.data);

  return response.data;
}
export default fetchGallery;
