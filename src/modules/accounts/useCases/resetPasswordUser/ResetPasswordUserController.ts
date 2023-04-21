import { Request, Response, json } from "express";
import { container } from "tsyringe";
import { ResetePasswordUserUseCase } from "./ResetPasswordUserUseCase";



class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query
    const { password } = request.body
    const resetPasswordUserUseCase = container.resolve(
      ResetePasswordUserUseCase
    )

    await resetPasswordUserUseCase.execute({ token: String(token), password });

    return response.send()
  }
}

export { ResetPasswordUserController }