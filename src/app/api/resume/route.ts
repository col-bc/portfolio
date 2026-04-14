import { verifySession } from "@/app/lib/handleAuth";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

/**
 * API route for handling resume retrieval
 * GET: Serves the resume PDF file with appropriate headers to prevent indexing and allow inline display.
 */
export async function GET() {
    const filePath = path.join(
        process.cwd(),
        "private_assets",
        "Colby_Cooper_Resume.pdf",
    );

    try {
        const fileBuffer = await fs.readFile(filePath);

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition":
                    'inline; filename="Colby_Cooper_Resume.pdf"',
                "X-Robots-Tag": "noindex, nofollow",
            },
        });
    } catch (error) {
        console.error("Error reading resume file:", error);
        return new NextResponse("Resume not found", { status: 404 });
    }
}

/**
 * API route for handling resume updates
 * POST: Accepts a PDF file upload, validates it, and saves it to the server. Requires authentication.
 */
export async function POST(request: Request) {
    const session = await verifySession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get("resume") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 },
            );
        }

        //  Validate MIME Type
        if (file.type !== "application/pdf") {
            return NextResponse.json(
                { error: "Invalid file type. Only PDFs are allowed." },
                { status: 415 },
            );
        }

        // Validate File Size (5MB limit)
        const MAX_FILE_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: "File is too large. Maximum size is 5MB." },
                { status: 413 },
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), "private_assets");
        const filePath = path.join(uploadDir, "Colby_Cooper_Resume.pdf");

        await fs.mkdir(uploadDir, { recursive: true });
        await fs.writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            message: "Resume updated successfully.",
        });
    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
