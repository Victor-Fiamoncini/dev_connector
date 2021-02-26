export type HttpResponse<T = unknown> = {
	statusCode: number
	data: T
}

export const serverError = (err: Error): HttpResponse<any> => ({
	statusCode: 500,
	data: err.message,
})

export const ok = (data: unknown): HttpResponse<any> => ({
	statusCode: 200,
	data,
})

export const created = (data: unknown): HttpResponse<any> => ({
	statusCode: 201,
	data,
})
