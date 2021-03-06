import { Router } from 'express'

import * as controllers from './app/controllers'
import * as middlewares from './app/middlewares'
import * as validators from './app/validators'

const router = Router()

/**
 * Public sessions
 */
router.post(
	'/sessions',
	validators.SessionValidator.store,
	middlewares.async(controllers.SessionController.store)
)
router.get(
	'/sessions',
	middlewares.auth,
	middlewares.async(controllers.SessionController.refresh)
)

/**
 * Public users
 */
router.post(
	'/users',
	validators.UserValidator.store,
	middlewares.async(controllers.UserController.store)
)

/**
 * Public profiles
 */
router.get('/profiles', middlewares.async(controllers.ProfileController.index))
router.get(
	'/profiles/:id',
	middlewares.async(controllers.ProfileController.show)
)

/**
 * Other public routes
 */
router.get(
	'/github/:username',
	middlewares.async(controllers.ProfileController.getUserRepos)
)

/**
 * Private routes
 */
router.use(middlewares.auth)

/**
 * Private profiles
 */
router.post(
	'/profiles',
	validators.ProfileValidator.updateOrStore,
	middlewares.async(controllers.ProfileController.store)
)
router.get(
	'/profiles/user/me',
	middlewares.async(controllers.ProfileController.getUserProfile)
)
router.delete(
	'/profiles',
	middlewares.async(controllers.ProfileController.destroy)
)
router.put(
	'/profiles/experience',
	validators.ProfileValidator.storeExperience,
	middlewares.async(controllers.ProfileController.storeExperience)
)
router.delete(
	'/profiles/experience/:id',
	middlewares.async(controllers.ProfileController.destroyExperience)
)
router.put(
	'/profiles/education',
	validators.ProfileValidator.storeEducation,
	middlewares.async(controllers.ProfileController.storeEducation)
)
router.delete(
	'/profiles/education/:id',
	middlewares.async(controllers.ProfileController.destroyEducation)
)

/**
 * Private posts
 */
router.get('/posts', middlewares.async(controllers.PostController.index))
router.get('/posts/:id', middlewares.async(controllers.PostController.show))
router.post(
	'/posts',
	validators.PostValidator.store,
	middlewares.async(controllers.PostController.store)
)
router.delete(
	'/posts/:id',
	middlewares.async(controllers.PostController.destroy)
)
router.put(
	'/posts/like/:id',
	middlewares.async(controllers.PostController.like)
)
router.put(
	'/posts/unlike/:id',
	middlewares.async(controllers.PostController.unlike)
)
router.post(
	'/posts/comment/:id',
	validators.PostValidator.storeComment,
	middlewares.async(controllers.PostController.comment)
)
router.delete(
	'/posts/comment/:id/:comment_id',
	middlewares.async(controllers.PostController.destroyComment)
)

export default router
