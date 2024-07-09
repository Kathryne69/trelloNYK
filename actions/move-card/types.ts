import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionsState } from "@/lib/create-safe-action";

import { MoveCard } from "./schema";

export type InputType = z.infer<typeof MoveCard>;
export type ReturnType = ActionsState<InputType, Card[]>;
