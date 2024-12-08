import connectDB from "@/lib/connectDB";
import Technology from "@/model/Technology";
import { NextResponse } from "next/server";

// Interfaces
export interface TechnologyBody {
  name: string;
  category: string;
  logoUrl: string;
}

interface ErrorTry{
  code: number;
  keyValue: object;
}

// Connect to the database with error handling
async function ensureDBConnection() {
  try {
    await connectDB();
  } catch (err) {
    console.error("Database connection error:", err);
    throw new Error("Failed to connect to the database.");
  }
}

// GET: Fetch all technologies
export async function GET() {
  try {
    await ensureDBConnection();
    const technologies = await Technology.find();
    return NextResponse.json(technologies, { status: 200 });
  } catch (err) {
    console.error("Error fetching technologies:", err);
    return NextResponse.json(
      { error: "Failed to fetch technologies." },
      { status: 500 }
    );
  }
}

// POST: Create a new technology
export async function POST(req: Request) {
  try {
    await ensureDBConnection();
    const body: TechnologyBody = await req.json();

    // Validate required fields
    if (!body.name || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields: 'name' and 'category'." },
        { status: 400 }
      );
    }

    const technology = new Technology(body);

    await technology.save();
    return NextResponse.json(
      { message: "Technology created successfully.", technology },
      { status: 201 }
    );
  } catch (e) {
    const err = e as ErrorTry;
    if (err.code === 11000) {
      // Handle duplicate entries
      return NextResponse.json(
        {
          error: "Duplicate entry detected.",
          duplicateKey: err.keyValue,
        },
        { status: 409 }
      );
    }

    console.error("Error creating technology:", err);
    return NextResponse.json(
      { error: "Failed to create technology." },
      { status: 500 }
    );
  }
}

// PUT: Update an existing technology
export async function PUT(req: Request) {
  try {
    await ensureDBConnection();
    const { searchParams } = new URL(req.url);
    const technologyId = searchParams.get("technologyId");

    if (!technologyId) {
      return NextResponse.json(
        { error: "Missing parameter 'technologyId'." },
        { status: 400 }
      );
    }

    const body: Partial<TechnologyBody> = await req.json();

    const updatedTechnology = await Technology.findByIdAndUpdate(
      technologyId,
      body,
      { new: true }
    );

    if (!updatedTechnology) {
      return NextResponse.json(
        { error: "Technology not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Technology updated successfully.", updatedTechnology },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating technology:", err);
    return NextResponse.json(
      { error: "Failed to update technology." },
      { status: 500 }
    );
  }
}

// DELETE: Remove a technology
export async function DELETE(req: Request) {
  try {
    await ensureDBConnection();
    const { searchParams } = new URL(req.url);
    const technologyId = searchParams.get("technologyId");

    if (!technologyId) {
      return NextResponse.json(
        { error: "Missing parameter 'technologyId'." },
        { status: 400 }
      );
    }

    const deletedTechnology = await Technology.findByIdAndDelete(technologyId);

    if (!deletedTechnology) {
      return NextResponse.json(
        { error: "Technology not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Technology deleted successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting technology:", err);
    return NextResponse.json(
      { error: "Failed to delete technology." },
      { status: 500 }
    );
  }
}