import { verify } from 'jsonwebtoken'

export default (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(401).json({ error: 'No authorization provided' })
	}

	const parts = authorization.split(' ')

	if (parts.length !== 2) {
		return res.status(401).json({ error: 'Invalid token' })
	}

	const [scheme, token] = parts

	if (!/^Bearer$/i.test(scheme)) {
		return res.status(401).json({ error: 'Invalid token' })
	}

	try {
		const { id } = verify(token, process.env.JWT_AUTH_SECRET)

		req.userId = String(id)
		return next()
	} catch (err) {
		return res.status(401).json({ error: 'Unauthorized' })
	}
}
