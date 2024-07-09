"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";

import { MoveCard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId, listIdDestination, items } = data;
  let updatedCards;

  try {
    const cardToMove = await db.card.findUnique({
      where: {
        id: id,
      },
    });

    if (!cardToMove) {
      return { error: "Card cannot be found." };
    }

    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );

    updatedCards = await db.$transaction(transaction);

    const source = await db.list.findUnique({
      where: {
        id: cardToMove.listId,
      },
    });

    const destination = await db.list.findUnique({
      where: {
        id: listIdDestination,
      },
    });

    Promise.all(
      updatedCards.map(async (card) => {
        await createAuditLog({
          entityTitle: card.title,
          entityId: card.id,
          entityType: ENTITY_TYPE.CARD,
          action: ACTION.MOVE,
          destinationListId: destination?.title,
          sourceListId: source?.title,
        });
      })
    );
  } catch (error) {
    return {
      error: "Failed to move.",
    };
  }

  // Revalidate path to update cache
  revalidatePath(`/board/${boardId}`);
  return { data: updatedCards };
};

export const moveCard = createSafeAction(MoveCard, handler);
