import { z } from "zod";
import { List } from "@prisma/client";

import { ActionsState } from "@/lib/create-safe-action";

import { DeleteList } from "./schema";

export type InputType = z.infer<typeof DeleteList>;
export type ReturnType = ActionsState<InputType, List>;