import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType, destinationListId, sourceListId } =
    log;

  console.log(destinationListId, sourceListId);

  switch (action) {
    case ACTION.CREATE:
      return `created ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `updated ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.DELETE:
      return `deleted ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTION.COPY:
      return `copied ${entityType.toLowerCase()} "${entityTitle}" `;
    case ACTION.MOVE:
      return `moved ${entityType.toLowerCase()} "${entityTitle}" from ${sourceListId} to ${destinationListId}`;
    default:
      return `unknown action ${entityType.toLowerCase()} "${entityTitle}"`;
  }
};
