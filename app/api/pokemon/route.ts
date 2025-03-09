import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect";

export async function POST(req: NextRequest) {
  try {
    const { userId, pokemon, action } = await req.json();

    // validate the action

    if (!["bookmark", "like"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    // find or create a new user
    let user = await prisma.user.findUnique({
      where: { auth0Id: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          auth0Id: userId,
          bookmarks: [],
          liked: [],
        },
      }); // create a new user
    }

    // determine the action to take
    const fieldToUpdate = action === "bookmark" ? "bookmarks" : "liked";
    const currentItems = user[fieldToUpdate];

    // toogle logic
    let updateditems;

    if (currentItems.includes(pokemon)) {
      // remove the item if it exists
      updateditems = currentItems.filter((item) => item !== pokemon);
    } else {
      // add the item if it does not exist
      updateditems = [...currentItems, pokemon];
    }

    // update the user
    await prisma.user.update({
      where: { auth0Id: userId },
      data: {
        [fieldToUpdate]: updateditems,
      },
    });

    return NextResponse.json({
      toggledOff: currentItems.includes(pokemon),
      success: true,
      message: `Successfully ${action}ed ${pokemon}`,
    });
  } catch (error) {
    console.log("Error in linking or Bookmarking", error);

    return NextResponse.json(
      { message: "An error coccured while processing your request" },
      { status: 500 }
    );
  }
}
