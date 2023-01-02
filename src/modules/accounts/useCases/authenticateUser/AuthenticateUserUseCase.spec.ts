import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", ()=> {
  beforeEach(()=> {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("Should be able to authenticate an user", async ()=> {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test"
    };
    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token")
  })

  it("Should not be able to authenticate an nonexistent user", ()=> {
    expect(async ()=> {
      await authenticateUserUseCase.execute({
        email: "false@gmaiol.com",
        password: "11234"
      });
    }).rejects.toBeInstanceOf(AppError)
  })

  it("Should not be able to authenticate with incorrect password", ()=>{
    expect(async ()=> {
      const user: ICreateUserDTO = {
        driver_license: "000123",
        email: "test@test.com",
        password: "12345",
        name: "User Test Error"
      };
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "12333"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})