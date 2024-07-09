import { z } from "zod";

export const CreateComment = z.object({
  text: z.string(),
  boardId: z.string(),
  entityId: z.string(),
});
