import { UserDataModel } from '@data/models'

export interface CreateUserDTO {
	name: string
	email: string
	password: string
	avatar: string
}

export interface CreateUserRepository {
	createUser(userData: CreateUserDTO): Promise<UserDataModel>
}