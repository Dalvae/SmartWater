// lib/services/ClientsService.ts

export const loadClients = async () => {
  try {
    const response = await fetch("/api/clients?pageSize=3000");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getClientById = async (id: string) => {
  try {
    const response = await fetch(`/api/clients/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveClient = async (client: any) => {
  try {
    const response = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });

    if (!response.ok) {
      throw new Error("Error saving client");
    }

    return { status: response.status };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateClient = async (id: string, client: any) => {
  try {
    const response = await fetch(`/api/clients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });

    if (!response.ok) {
      throw new Error("Error updating client");
    }

    return { status: response.status };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteClient = async (clientId: string) => {
  const response = await fetch(`/api/clients/${clientId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el cliente");
  }

  return response.json();
};
