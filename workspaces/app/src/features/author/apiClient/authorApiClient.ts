import { inject } from "regexparam";

import type { GetAuthorListRequestQuery } from "@wsh-2024/schema/src/api/authors/GetAuthorListRequestQuery";
import type { GetAuthorListResponse } from "@wsh-2024/schema/src/api/authors/GetAuthorListResponse";
import type { GetAuthorRequestParams } from "@wsh-2024/schema/src/api/authors/GetAuthorRequestParams";
import type { GetAuthorResponse } from "@wsh-2024/schema/src/api/authors/GetAuthorResponse";

import type { DomainSpecificApiClientInterface } from "../../../lib/api/DomainSpecificApiClientInterface";
import { apiClient } from "../../../lib/api/apiClient";

type AuthorApiClient = DomainSpecificApiClientInterface<{
	fetch: [{ params: GetAuthorRequestParams }, GetAuthorResponse];
	fetchList: [{ query: GetAuthorListRequestQuery }, GetAuthorListResponse];
}>;

export const authorApiClient: AuthorApiClient = {
	fetch: async ({ params }) => {
		const data = await apiClient(inject("/api/v1/authors/:authorId", params));
		return data as GetAuthorResponse;
	},
	fetch$$key: (options) => ({
		requestUrl: "/api/v1/authors/:authorId",
		...options,
	}),
	fetchList: async ({ query }) => {
		const data = await apiClient("/api/v1/authors", { method: "GET" }, query);
		return data as GetAuthorListResponse;
	},
	fetchList$$key: (options) => ({
		requestUrl: "/api/v1/authors",
		...options,
	}),
};
