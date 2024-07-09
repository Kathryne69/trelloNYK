import { z } from "zod";
import { Comment } from "@prisma/client";

import { ActionsState } from "@/lib/create-safe-action";

import { CreateComment } from "./schema";

export type InputType = z.infer<typeof CreateComment>;
export type ReturnType = ActionsState<InputType, Comment>;
