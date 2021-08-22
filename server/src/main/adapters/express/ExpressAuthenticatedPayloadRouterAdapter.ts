import { Request, Response } from 'express'

import { Controller } from '@presentation/contracts'

export class ExpressAuthenticatedPayloadRouterAdapter {
	static adapt(controller: Controller) {
		return async (req: Request, res: Response): Promise<Response> => {
			const httpResponse = await controller.handle({
				body: {
					...req.body,
					user: req.authPayload,
				},
				params: req.params,
			})

			return res.status(httpResponse.statusCode).json(httpResponse.data)
		}
	}
}