import User from "@/model/User";
import connectDB from "@/app/lib/connectDB";
import { NextResponse } from "next/server";
import data from "@/mock/projects.json";

export async function GET() {
  console.log("GET");
  return NextResponse.json(data);
}

export async function POST(req) {
  console.log("POST");

  try {
    // Conectar a la base de datos
    await connectDB();
    console.log("Conexión a MongoDB exitosa");

    // Leer los datos enviados en la solicitud
    const body = await req.json(); // Asegúrate de usar req.json()
    const { name, age } = body;

    // Crear y guardar un nuevo usuario
    const person = new User({
      name: name,
      age: age,
    });

    console.log('Person: ', person)

    await person.save();
    console.log("Usuario guardado en MongoDB", name, age);

    // Respuesta de éxito
    return NextResponse.json({ done: true }, { status: 200 });
  } catch (error) {
    console.error("Error al guardar en MongoDB:", error);

    // Respuesta de error
    return NextResponse.json(
      { done: false, error: error.message },
      { status: 500 }
    );
  }
}