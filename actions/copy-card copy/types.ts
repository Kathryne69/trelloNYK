import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionsState } from "@/lib/create-safe-action";

import { CopyCard } from "../copy-card/schema";
export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = ActionsState<InputType, Card>;