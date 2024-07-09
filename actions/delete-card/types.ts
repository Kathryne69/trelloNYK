import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionsState } from "@/lib/create-safe-action";

import { DeleteCard } from "./schema";

export type InputType = z.infer<typeof DeleteCard>;
export type ReturnType = ActionsState<InputType, Card>;