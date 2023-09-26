import { NextResponse } from "next/server";
import Todo from "../../../../models/todoModel";

export async function POST(request) {
  try {
    const { title, description } = await request.json();
    await Todo.create({
      title,
      description
    });
    return NextResponse.json({ message: "Todo Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const todos = await Todo.findAll({});
    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
