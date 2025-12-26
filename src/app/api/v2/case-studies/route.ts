import { caseStudies } from "@/mocks/caseStudies.mock";
import { NextResponse } from "next/server";
// import caseStudies from "@/mocks/caseStudies.mock";

export async function GET() {
  return NextResponse.json({
    data: caseStudies,
  });
}
