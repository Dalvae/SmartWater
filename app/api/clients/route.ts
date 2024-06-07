import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authToken = process.env.SMARTWATER_API_AUTH_TOKEN;

  if (!authToken) {
    return NextResponse.json(
      { error: "Missing API authorization token" },
      { status: 500 }
    );
  }

  const response = await fetch(
    `${process.env.SMARTWATER_API_BASE_URL}/clients`,
    {
      headers: {
        Authorization: authToken,
      },
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}
