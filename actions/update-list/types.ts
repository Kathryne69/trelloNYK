import { z } from "zod";
import { List } from "@prisma/client";

import { ActionsState } from "@/lib/create-safe-action";

import {UpdateList} from "./schema";

export type InputType = z.infer<typeof UpdateList>;
export type ReturnType = ActionsState<InputType, List>;