
"use client";
import React, { ElementRef, useRef } from "react";
import { X } from "lucide-react";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import {
    Popover, 
    PopoverContent,
    PopoverTrigger,
    PopoverClose, 
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { FormPicker } from './form-picker';



interface FormPopoverProps {
    children: React.ReactNode; 
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end"; // Corrected prop name
    sideOffset?: number;
}; 

export const FormPopover = ({
    children,
    side = "bottom",
    align, // Corrected prop name
    sideOffset = 0,
}: FormPopoverProps) => {
    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null);

    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            toast.success("Board created!");
            closeRef.current?.click();
            router.push(`/board/${data.id}`);
        },
        onError: (error) => {
            console.log({ error }); 
            toast.error(error);
        }
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const image = formData.get("image") as string;
        
         execute ({ title, image }); 

    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                className="w-80 pt-3"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create Board
                </div>
                <PopoverClose ref= {closeRef} asChild>
                    <Button
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost" // Ensure the variant is correct
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <FormPicker
                    id ="image"
                    errors={fieldErrors}
                    />
                    <div className="space-y-4">
                        <FormInput 
                            id="title"
                            label="Board title"
                            type="text"
                            errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit className="w-full">
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
