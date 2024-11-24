import { NextResponse } from "next/server";
import data from '@/mock/projects.json'

export async function GET() {
    return NextResponse.json(data)
}