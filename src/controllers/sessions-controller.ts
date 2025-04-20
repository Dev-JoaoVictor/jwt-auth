import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { authConfig } from "@/configs/auth";
import { sign } from "jsonwebtoken";

class SessionsController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const userFake = {
      id: "1",
      username: "Joao",
      password: "1234",
      role: "sale",
    };

    if (username !== userFake.username || password !== userFake.password) {
      throw new AppError("E-mail e/ou senha incorreto!", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: userFake.role }, secret, {
      expiresIn,
      subject: String(userFake.id),
    });

    return response.json({ token });
  }
}

export { SessionsController };
