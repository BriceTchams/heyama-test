import axios from "axios";
// import { CreateObjectPayload } from "@/types/object";

const apiClient = axios.create({
  baseURL: "https://api-heyama-nestjs.vercel.app/",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleApiError = (error :any) => {
  if (error.response) {

    throw error.response.data;
  } 
  else if (error.request) {
    throw { message: "Le serveur ne répond pas. Vérifiez votre connexion." };
  } 
  else {
    throw { message: error.message };
  }
};

export const objectService = {
  /**
   * 1. Créer un objet
   */
  create: async (formData: FormData) => {
    try {
      const response = await apiClient.post("/objects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * 2. Récupérer tous les objets
   */
  getAll: async () => {
    try {
      const response = await apiClient.get("/objects");
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * 3. Récupérer un seul objet
   */
  getOne: async (id: string) => {
    try {
      const response = await apiClient.get(`/objects/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * 4. Supprimer un objet
   */
  remove: async (id: string) => {
    try {
      const response = await apiClient.delete(`/objects/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};