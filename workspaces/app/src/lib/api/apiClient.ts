const createFetchInstance = () => {
	const instance = async (
		url: string,
		options?: RequestInit,
		query?: Record<string, string | number>,
	) => {
		const params = new URLSearchParams(
			Object.fromEntries(
				Object.entries(query || {}).map(([key, value]) => [key, String(value)]),
			),
		).toString();
		const fullUrl = params
			? `${process.env["API_URL"]}${url}?${params}`
			: `${process.env["API_URL"]}${url}`;

		const response = await fetch(fullUrl || "/", {
			headers: {
				"Content-Type": "application/json",
			},
			...options,
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	};

	return instance;
};

export const apiClient = createFetchInstance();
