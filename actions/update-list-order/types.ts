import { z } from "zod";
import { List } from "@prisma/client";

import { ActionsState } from "@/lib/create-safe-action";

import { UpdateListOrder } from "./schema";

export type InputType = z.infer<typeof UpdateListOrder>;
export type ReturnType = ActionsState<InputType, List[]>;