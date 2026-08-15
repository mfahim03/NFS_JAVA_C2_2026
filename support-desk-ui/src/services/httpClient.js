export async function apiRequest(path, options = {}) {
  const { token, body, headers, ...requestOptions } = options
  const hasJsonBody = body !== undefined && body !== null

  const response = await fetch(path, {
    ...requestOptions,
    headers: {
      ...(hasJsonBody ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: hasJsonBody && typeof body !== 'string' ? JSON.stringify(body) : body,
  })

  const contentType = response.headers.get('content-type') ?? ''
  const responseBody = contentType.includes('application/json')
    ? await response.json()
    : null

  if (!response.ok) {
    throw new Error(responseBody?.message || responseBody?.error || `Request failed (${response.status}).`)
  }

  return responseBody
}
