// app/api/clients/[id]/route.ts

import { NextResponse } from "next/server";
import {
  getClientById,
  updateClient,
  deleteClient,
} from "@/lib/services/ClientsService";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await getClientById(params.id);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }
    return NextResponse.json(client);
  } catch (error) {
    console.error("Error loading client:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatedClient = await request.json();
    await updateClient(params.id, updatedClient);
    return NextResponse.json({ message: "Client updated successfully" });
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteClient(params.id);
    return NextResponse.json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
