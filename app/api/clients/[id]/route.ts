import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authToken = process.env.SMARTWATER_API_AUTH_TOKEN;

  if (!authToken) {
    return NextResponse.json(
      { error: "Missing API authorization token" },
      { status: 500 }
    );
  }

  const response = await fetch(
    `${process.env.SMARTWATER_API_BASE_URL}/clients/${params.id}`,
    {
      headers: {
        Authorization: authToken,
      },
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authToken = process.env.SMARTWATER_API_AUTH_TOKEN;

  if (!authToken) {
    return NextResponse.json(
      { error: "Missing API authorization token" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const response = await fetch(
    `${process.env.SMARTWATER_API_BASE_URL}/clients/${params.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authToken = process.env.SMARTWATER_API_AUTH_TOKEN;

  if (!authToken) {
    return NextResponse.json(
      { error: "Missing API authorization token" },
      { status: 500 }
    );
  }

  const response = await fetch(
    `${process.env.SMARTWATER_API_BASE_URL}/clients/${params.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: authToken,
      },
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}
