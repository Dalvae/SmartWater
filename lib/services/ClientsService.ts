// lib/services/ClientsService.ts

import { get, post, put, del } from "@/lib/api-client";

export const loadClients = async () => {
  try {
    const data = await get("/clients?pageSize=3000");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getClientById = async (id: string) => {
  try {
    const data = await get(`/clients/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveClient = async (client: any) => {
  try {
    await post("/clients/register", client);
    return { status: 200 };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateClient = async (id: string, client: any) => {
  try {
    await put(`/clients/${id}`, client);
    return { status: 200 };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteClient = async (id: string) => {
  try {
    await del(`/clients/${id}`);
    return { status: 200 };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
