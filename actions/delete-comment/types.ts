import { z } from "zod";
import { Comment } from "@prisma/client";

import { ActionsState } from "@/lib/create-safe-action";

import { DeleteComment } from "./schema";

export type InputType = z.infer<typeof DeleteComment>;
export type ReturnType = ActionsState<InputType, Comment>;
