import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionsState } from "@/lib/create-safe-action";

import { UpdateCardOrder } from "./schema";

export type InputType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionsState<InputType, Card[]>;