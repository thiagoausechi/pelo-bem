import { NextJsUsersController } from "@server/infrastructure/adapters/http/next/controllers";
import type { NextRequest } from "next/server";

const controller = new NextJsUsersController();

export async function POST(request: NextRequest) {
  return controller.handleLogout(request);
}
