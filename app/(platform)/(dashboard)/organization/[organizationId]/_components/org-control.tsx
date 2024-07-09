"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation"; // Corrected import from "next/navigation" to "next/router"
import { useOrganizationList } from "@clerk/nextjs";

export const OrgControl = () => {
    const params = useParams();
    const { setActive } = useOrganizationList();

    useEffect(() => {
        if (!setActive) return;

        setActive({ 
            organization: params.organizationId as string,
        });
    }, [setActive, params.organizationId]); // Corrected params.OrganizationIdLayout to params.organizationId
    // Removed unnecessary closing curly braces and parentheses
    return null;
};
