import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionsState} from "@/lib/create-safe-action";

import { UpdateCard } from "./schema";

export type InputType = z.infer<typeof UpdateCard>;
export type ReturnType = ActionsState<InputType, Card>;