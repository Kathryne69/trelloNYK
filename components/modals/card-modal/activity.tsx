"use client";
import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityItem } from "@/components/activity-item";

interface ActivityProps {
  items: AuditLog[];
}

export const Activity = ({ items }: ActivityProps) => {
  return (
    <div className="flex flex-col items-start gap-y-3 w-full">
      <div className="flex items-center gap-x-3 w-full">
        <div className="w-full">
          <div className="flex gap-2">
            <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700" />
            <p className="font-semibold text-neutral-700 mb-2">Activity</p>
          </div>
          <ol className="mt-2 space-y-4 max-h-40 overflow-y-auto">
            {items.map((item) => (
              <ActivityItem key={item.id} data={item} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-10 bg-neutral-200" />
      </div>
    </div>
  );
};
