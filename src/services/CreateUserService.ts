import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UserRepositories"

interface IUser {
  name: string
  email: string
  admin?: boolean
  password: string
}

class CreateUserService {
  async execute({
    name, 
    email, 
    admin = false, 
    password
  }: IUser) {
    const userRepositories = getCustomRepository(UsersRepositories)

    if (!email) {
      throw new Error('Email incorrect')
    }

    const userAlreadyExists = await userRepositories.findOne({email})

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const user = userRepositories.create({
      name,
      email,
      admin,
      password
    })

    await userRepositories.save(user);

    return user;
  }
}

export {CreateUserService}