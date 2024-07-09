"use client";

import { Comment } from "@prisma/client";
import CommentList from "./comments-list";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { SetStateAction, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { createComment } from "@/actions/create-comment/";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/use-card-modal";
import { useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "@/actions/delete-comment";

type CommentProps = {
  items: Comment[];
};

export const Comments = ({ items }: CommentProps) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const queryClient = useQueryClient();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentFocused, setIsCommentFocused] = useState(false); // State to track comment focus
  const params = useParams();
  const id = useCardModal((state) => state.id);

  const isEditorEmpty = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateText = contentState.getPlainText().trim();
    return contentStateText === "";
  };

  const { execute: executeCreateComment } = useAction(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", id],
      });
      toast.success(`Comment created`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeDeleteComment } = useAction(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", id],
      });
      toast.success(`Comment deleted`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
  };

  const getPlainText = () => {
    const contentState = editorState.getCurrentContent();
    return contentState.getPlainText(); // This will give you the plain text
  };

  const onSubmit = () => {
    const text = getPlainText();
    const boardId = params.boardId as string;

    if (!id) return;

    executeCreateComment({
      boardId,
      entityId: id,
      text,
    }).then(() => {
      setEditorState(EditorState.createEmpty());
    });
  };

  const onDelete = (id: string) => {
    const boardId = params.boardId as string;

    executeDeleteComment({
      boardId,
      id,
    });
  };

  return (
    <>
      <div className="flex flex-col items-start gap-y-3 w-full">
        <div className="flex items-center gap-x-3 w-full">
          <div className="w-full">
            <div className="flex gap-2">
              <MessageSquare className="h-5 w-5 mt-0.5 text-neutral-700" />
              <p className="font-semibold text-neutral-700 mb-2">Comments</p>
            </div>
            <div className="w-full">
              <Editor
                editorState={editorState}
                wrapperClassName="border border-gray-300 rounded-md"
                editorClassName="px-3"
                toolbarClassName="bg-white border-t border-gray-300"
                onEditorStateChange={handleEditorChange}
                placeholder="Write a comment..."
                onFocus={() => setIsCommentFocused(true)} // Set focus state to true when comment editor is focused
                onBlur={() => setIsCommentFocused(false)} // Set focus state to false when comment editor is blurred
              />
              {(isCommentFocused ||
                editorState.getCurrentContent().getPlainText().length !==
                  0) && (
                <button
                  onClick={onSubmit}
                  disabled={isEditorEmpty()}
                  className={`px-4 py-2 rounded-md mt-2 ${
                    !isEditorEmpty() ? "" : "opacity-50 cursor-not-allowed"
                  } bg-blue-500 text-white`}
                >
                  Save
                </button>
              )}
            </div>
            <div className="w-full">
              <ul className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                {items.map((item) => (
                  <CommentList key={item.id} data={item} onDelete={onDelete} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Comments.Skeleton = function ActivitySkeleton() {
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
