import { z } from "zod";

export type FieldErrors<T> = {
    [K in keyof T]?: string[];
};

export type ActionsState<TInput, TOutput> = {
    fieldErrors?: FieldErrors<TInput>;
    error?: string | null;
    data?: TOutput;
};

export const createSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>, // Remove extraneous ")"
    handler: (validatedData: TInput) => Promise<ActionsState<TInput, TOutput>>
) => {
    return async (data: TInput): Promise<ActionsState<TInput, TOutput>> => {
        const validationResult = schema.safeParse(data);
        if (!validationResult.success) {
            return {
                fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>,
            };
        }

        return handler(validationResult.data);
    };
};
