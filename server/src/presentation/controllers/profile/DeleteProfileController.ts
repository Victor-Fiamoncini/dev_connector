import { DeleteProfileUseCase } from '@domain/usecases'

import { Controller, HttpResponse, HttpResquest } from '@presentation/contracts'

namespace DeleteProfileController {
	export type Params = {
		user: {
			id: string
		}
	}
}

export class DeleteProfileController implements Controller {
	constructor(private readonly deleteProfileUseCase: DeleteProfileUseCase) {}

	async handle(httpResquest: HttpResquest<DeleteProfileController.Params>) {
		try {
			const { body } = httpResquest

			await this.deleteProfileUseCase.deleteProfile(body.user.id)

			return HttpResponse.noContent()
		} catch (err) {
			return HttpResponse.serverError(err)
		}
	}
}
