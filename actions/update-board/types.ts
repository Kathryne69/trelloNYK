import { z } from "zod";
import { Board } from "@prisma/client";

import { ActionsState } from "@/lib/create-safe-action";

import {UpdateBoard} from "./schema";

export type InputType = z.infer<typeof UpdateBoard>;
export type ReturnType = ActionsState<InputType, Board>;