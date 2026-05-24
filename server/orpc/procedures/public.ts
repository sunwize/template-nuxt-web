import { os } from "@orpc/server";

import type { OrpcContext } from "../context";

export const publicProcedure = os.$context<OrpcContext>();
