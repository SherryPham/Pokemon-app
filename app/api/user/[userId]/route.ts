import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
    }

    const user = await prisma?.user.findUnique({
      where: { auth0Id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log("Error in linking or Bookmarking", error);
    return NextResponse.json(
      { message: "Error in linking or Bookmarking" },
      { status: 500 }
    );
  }
}
