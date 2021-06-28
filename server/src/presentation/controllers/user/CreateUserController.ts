import { TokenGeneratorAdapter } from '@data/contracts'
import { CreateUserUseCase } from '@domain/usecases'
import { Controller, HttpResponse, HttpResquest } from '@presentation/contracts'
import { CreateUserModel } from '@presentation/models'

namespace CreateUserController {
	export type Params = {
		name: string
		email: string
		password: string
	}
}

export class CreateUserController implements Controller {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly tokenGeneratorAdapter: TokenGeneratorAdapter
	) {}

	async handle(
		httpRequest: HttpResquest<CreateUserController.Params>
	): Promise<HttpResponse<CreateUserModel>> {
		try {
			const { body } = httpRequest

			const user = await this.createUserUseCase.createUser({
				name: body.name,
				email: body.email,
				password: body.password,
			})

			const token = await this.tokenGeneratorAdapter.adapt({ id: user.id })

			return HttpResponse.created({
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					avatar: user.avatar,
				},
				token,
			} as CreateUserModel)
		} catch (err) {
			return HttpResponse.serverError(err)
		}
	}
}
