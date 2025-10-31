import { NextResponse } from "next/server";

type Body = Record<string, unknown>;

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();

    // accept possible key variations
    const telegram_id = (body["telegram_id"] ??
      body["id"] ??
      body["userId"] ??
      body["telegramId"]) as number | string | undefined;
    const first_name = (body["first_name"] ?? body["firstName"]) as
      | string
      | undefined;
    const username = (body["username"] ??
      body["user_name"] ??
      body["userName"]) as string | undefined;

    if (!telegram_id) {
      return NextResponse.json(
        { error: "telegram_id is required" },
        { status: 400 }
      );
    }

    const secret = process.env.HTTP_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Server not configured (missing HTTP_SECRET)" },
        { status: 500 }
      );
    }

    const forwardUrl = process.env.WORKER_SUBSCRIBE_URL;
    if (!forwardUrl) {
      return NextResponse.json(
        { error: "Server not configured (missing WORKER_SUBSCRIBE_URL)" },
        { status: 500 }
      );
    }

    const payload = {
      telegram_id,
      first_name: first_name ?? null,
      username: username ?? null,
    };

    const resp = await fetch(`${forwardUrl}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": secret,
      },
      body: JSON.stringify(payload),
    });

    const text = await resp.text();
    const contentType = resp.headers.get("content-type") ?? "text/plain";

    // If remote returned JSON, parse and proxy it, otherwise forward as text
    if (contentType.includes("application/json")) {
      try {
        const data = JSON.parse(text);
        return NextResponse.json(data, { status: resp.status });
      } catch {
        // fallback to text
      }
    }

    return new Response(text, {
      status: resp.status,
      headers: { "Content-Type": contentType },
    });
  } catch (err) {
    // unexpected error
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
