// app/api/v2/projects/route.ts

import { CreateProjectV2Dto } from "@/lib/dtos";
import { NextResponse } from "next/server";
// import { CreateProjectDto } from "@/lib/dtos/v2/projects.dto";

export async function POST(req: Request) {
  const body = await req.json();
  const parseResult = CreateProjectV2Dto.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json({ error: parseResult.error.errors }, { status: 400 });
  }

  // const data = parseResult.data;

  // Aquí guardarías en MongoDB con el nuevo modelo
  // await ProjectModelV2.create(data);

  return NextResponse.json({ message: "Project created successfully" }, { status: 201 });
}
