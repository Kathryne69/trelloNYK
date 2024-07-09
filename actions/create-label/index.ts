"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { CreateComment } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId } = auth();
  const user = await currentUser();

  if (!user || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { text, boardId, entityId } = data;
  let card;

  try {
    card = await db.card.findUnique({
      where: {
        id: entityId,
      },
    });

    if (!card) {
      return {
        error: "Card not found",
      };
    }

    card = await db.comment.create({
      data: {
        text,
        entityId,
        entityType: ENTITY_TYPE.CARD,
        userId: user.id,
        userImage: user.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createComment = createSafeAction(CreateComment, handler);
