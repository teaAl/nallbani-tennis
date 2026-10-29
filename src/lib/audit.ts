import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

/** One line in the audit log for every change made from the admin. */
export function audit(
  actorId: string,
  action: string,
  entity: string,
  entityId?: string | null,
  data?: Prisma.InputJsonValue,
) {
  return prisma.auditLog.create({
    data: { actorId, action, entity, entityId: entityId ?? null, data },
  });
}
