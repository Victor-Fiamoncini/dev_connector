import {
	ExpressAuthenticatedPayloadRouterAdapter,
	ExpressAuthenticationMiddlewareAdapter,
	ExpressRouterAdapter,
	ExpressValidatorAdapter,
} from '@main/adapters'
import {
	CreateOrUpdateProfileControllerFactory,
	DeleteProfileControllerFactory,
	FetchProfilesControllerFactory,
	TokenAuthenticationMiddlewareFactory,
} from '@main/factories'
import { CreateOrUpdateProfileValidator } from '@utils/implementations/validators'
import { Router } from 'express'

const profileRoutes = (router: Router): void => {
	router.post(
		'/profiles',
		ExpressValidatorAdapter.adapt(new CreateOrUpdateProfileValidator()),
		ExpressAuthenticationMiddlewareAdapter.adapt(
			TokenAuthenticationMiddlewareFactory.make()
		),
		ExpressAuthenticatedPayloadRouterAdapter.adapt(
			CreateOrUpdateProfileControllerFactory.make()
		)
	)

	router.get(
		'/profiles',
		ExpressAuthenticationMiddlewareAdapter.adapt(
			TokenAuthenticationMiddlewareFactory.make()
		),
		ExpressRouterAdapter.adapt(FetchProfilesControllerFactory.make())
	)

	router.delete(
		'/profiles',
		ExpressAuthenticationMiddlewareAdapter.adapt(
			TokenAuthenticationMiddlewareFactory.make()
		),
		ExpressAuthenticatedPayloadRouterAdapter.adapt(
			DeleteProfileControllerFactory.make()
		)
	)
}

export default profileRoutes
