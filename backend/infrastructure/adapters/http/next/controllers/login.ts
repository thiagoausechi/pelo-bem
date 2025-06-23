import { loginForm } from "@core/contracts/forms/login";
import { HttpStatus } from "@core/http";
import { getSession } from "@core/session";
import { db } from "@server/infrastructure/persistence/drizzle";
import { users } from "@server/infrastructure/persistence/drizzle/models/users";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import type { NextRequest, NextResponse } from "next/server";
import { NextJsController } from "./base";

export class NextJsUsersController extends NextJsController {
  async handleLogin(request: NextRequest): Promise<NextResponse> {
    return this.handleRequest(async () => {
      const { username, password } = await this.parseRequest(
        loginForm,
        request,
      );

      /**
       * Conexão direta com o banco no Controller não é uma boa prática.
       * TODO: Refatorar para usar um UseCase que encapsule a lógica de autenticação.
       */
      const user = (
        await db
          .select()
          .from(users)
          .where(eq(users.username, username))
          .limit(1)
      )[0];

      if (!user) return HttpStatus.BAD_REQUEST("Credenciais inválidas.");

      if (!(await bcrypt.compare(password, user.password)))
        return HttpStatus.BAD_REQUEST("Credenciais inválidas.");

      const session = await getSession();
      session.username = user.username;
      session.isLoggedIn = true;
      await session.save();

      return HttpStatus.OK("Login bem-sucedido!");
    });
  }

  async handleLogout(_: NextRequest): Promise<NextResponse> {
    return this.handleRequest(async () => {
      const session = await getSession();

      session.username = undefined;
      session.isLoggedIn = false;
      await session.save();

      return HttpStatus.OK("Logout bem-sucedido!");
    });
  }
}
