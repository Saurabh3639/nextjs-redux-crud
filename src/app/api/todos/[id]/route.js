import { NextResponse } from "next/server";
import Todo from "../../../../../models/todoModel";

// Get todo using id
export async function GET(request) {
  const id = request.url.split("/todos/")[1];
  try {
    const todo = await Todo.findOne({
      where: { id: id },
    });
    if (todo) {
      return NextResponse.json({ todo }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update todo by id
export async function PUT(request) {
  try {
    const id = request.url.split("/todos/")[1];
    const { title, description } = await request.json();
    const updatedTodo = await Todo.update(
      {
        title,
        description,
      },
      { where: { id: id } }
    );

    if (!updatedTodo) {
      throw new Error("Could not update todo");
    }

    return NextResponse.json(
      { message: "Todo Updated Successfully", updatedTodo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete todo using id
export async function DELETE(request) {
  const id = request.url.split("/todos/")[1];
  try {
    const todo = await Todo.destroy({ where: { id: id } });
    if (todo) {
      return NextResponse.json(
        { message: "Todo Deleted Successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
