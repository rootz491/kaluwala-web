import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const secret = req.headers.get("x-revalidate-secret");

    const validSecret = process.env.REVALIDATE_SECRET;

    if (!validSecret) {
      return NextResponse.json(
        { error: "Server not configured (missing REVALIDATE_SECRET)" },
        { status: 500 }
      );
    }

    // Validate secret
    if (!secret || secret !== validSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body to determine what to revalidate
    let body: { paths?: string[] } = {};
    try {
      body = await req.json();
    } catch {
      // empty body is ok, will revalidate defaults
    }

    // If specific paths provided, revalidate those; otherwise revalidate all blog paths
    const pathsToRevalidate =
      body.paths && body.paths.length > 0
        ? body.paths
        : [
            "/blog",
            "/blog/all",
            // Note: individual post pages [slug] are revalidated by tag if using dynamic routes
          ];

    // Revalidate each path
    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    return NextResponse.json(
      {
        success: true,
        message: `Revalidated ${pathsToRevalidate.length} path(s)`,
        paths: pathsToRevalidate,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Revalidation failed: ${String(err)}` },
      { status: 500 }
    );
  }
}
