import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const authToken = process.env.SMARTWATER_API_AUTH_TOKEN;

  if (!authToken) {
    return NextResponse.json(
      { error: "Missing API authorization token" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const response = await fetch(
    `${process.env.SMARTWATER_API_BASE_URL}/clients/register`,
    {
      method: "POST",
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
