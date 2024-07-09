import { z } from "zod";

export const MoveCard = z.object({
  id: z.string(),
  listIdDestination: z.string(),
  boardId: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      listId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});
