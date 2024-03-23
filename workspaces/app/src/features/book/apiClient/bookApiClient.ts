import { inject } from "regexparam";

import type { GetBookListRequestQuery } from "@wsh-2024/schema/src/api/books/GetBookListRequestQuery";
import type { GetBookListResponse } from "@wsh-2024/schema/src/api/books/GetBookListResponse";
import type { GetBookRequestParams } from "@wsh-2024/schema/src/api/books/GetBookRequestParams";
import type { GetBookResponse } from "@wsh-2024/schema/src/api/books/GetBookResponse";

import type { DomainSpecificApiClientInterface } from "../../../lib/api/DomainSpecificApiClientInterface";
import { apiClient } from "../../../lib/api/apiClient";

type BookApiClient = DomainSpecificApiClientInterface<{
	fetch: [{ params: GetBookRequestParams }, GetBookResponse];
	fetchList: [{ query: GetBookListRequestQuery }, GetBookListResponse];
}>;

export const bookApiClient: BookApiClient = {
	fetch: async ({ params }) => {
		const data = await apiClient(inject("/api/v1/books/:bookId", params));
		return data as GetBookResponse;
	},
	fetch$$key: (options) => ({
		requestUrl: "/api/v1/books/:bookId",
		...options,
	}),
	fetchList: async ({ query }) => {
		const data = await apiClient("/api/v1/books", { method: "GET" }, query);
		return data as GetBookListResponse;
	},
	fetchList$$key: (options) => ({
		requestUrl: "/api/v1/books",
		...options,
	}),
};
