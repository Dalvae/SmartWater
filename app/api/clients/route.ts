// app/api/clients/route.ts

import { NextResponse } from "next/server";
import { loadClients, saveClient } from "@/lib/services/ClientsService";

export async function GET() {
  try {
    const clients = await loadClients();
    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error loading clients:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await request.json();
    await saveClient(client);
    return NextResponse.json(
      { message: "Client created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving client:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
