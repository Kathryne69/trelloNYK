import { z } from "zod";
import { Board } from "@prisma/client";

import { ActionsState } from "@/lib/create-safe-action";

import {DeleteBoard} from "./schema";

export type InputType = z.infer<typeof DeleteBoard>;
export type ReturnType = ActionsState<InputType, Board>;