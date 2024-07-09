"use client";

import Link from "next/link";
import { Check, CheckCheck, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react"; 
import { cn } from "@/lib/utils";
import { unsplash } from "@/lib/unsplash";
import { defaultImages } from "@/config/constants/image";
import Image from "next/image";

import { useFormStatus } from "react-dom";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({
    id, 
    errors,
}: FormPickerProps ) => {
    const { pending } = useFormStatus();
    const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [hoveredImageId, setHoveredImageId] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ["317099"],
                    count: 9,
                });
                if (result && result.response) {
                    const newImages = result.response as Array<Record<string, any>>;
                    setImages(newImages);
                } else {
                    console.error("Failed to get images from Unsplash");
                }
            } catch (error) {
                console.log(error);
                setImages(defaultImages);
            } finally {
                setIsLoading(false);
            }
        };
        fetchImages();
    }, []);

    if (isLoading) {
        return (
            <div className= "p-6 flex items-center justify-center">
                <Loader2 className= "h-6 w-6 text-sky-700 animate-spin"/>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-2 mb-2">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className={cn(
                            "relative aspect-video group hover:opacity-75 transition bg-muted",
                            pending && "opacity-50 hover:opacity-50 cursor-auto"
                        )}
                        onMouseEnter={() => setHoveredImageId(image.id)}
                        onMouseLeave={() => setHoveredImageId(null)}
                        onClick={() => {
                            if (pending) return;
                            
                            setSelectedImageId(image.id);
                        }}
                    >
                        <input 
                        type="radio"
                        id={id}
                        name= {id}
                        className="hi"
                        checked={selectedImageId === image.id}
                        disabled={pending}
                        value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}
                        |${image.user.name}`}
                        />

                        <Image 
                            src={image.urls.thumb} 
                            alt="Unsplash image"
                            className="object-cover rounded-sm"
                            fill
                        />
                        {selectedImageId === image.id && (
    <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
        <Check className="h-4 w-4 text-white" />
    </div>
)}
                        {hoveredImageId === image.id && (
                            <Link
                                href={image.links.html}
                                target="_blank"
                                className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
                            >
                                {image.user.name}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
            <FormErrors 

            id="image"
            errors={errors}
            
            />
        </div>
    );
};
