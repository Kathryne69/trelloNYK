import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useCardModal } from "@/hooks/use-card-modal";
import { Comment } from "@prisma/client";
import { format } from "date-fns";

type CommentListProps = {
  data: Comment;
  onDelete: (id: string) => void;
};

function CommentList({ data, onDelete }: CommentListProps) {
  return (
    <li className="flex gap-x-2 w-full items-start">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <div className="text-sm text-muted-foreground flex gap-2 items-center">
          <span className="font-semibold lowercase text-neutral-700">
            {data.userName}
          </span>
          <p className="text-xs text-muted-foreground">
            {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        <div className="bg-white rounded-md border border-zinc-200 shadow-md w-full p-1">
          <p className="text-[13px]">{data.text}</p>
        </div>
        <div>
          <button
            onClick={() => onDelete(data.id)}
            className="text-zinc-500 text-xs underline"
          >
            delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default CommentList;
