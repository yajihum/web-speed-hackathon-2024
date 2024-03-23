import type { GetRankingListRequestQuery } from '@wsh-2024/schema/src/api/rankings/GetRankingListRequestQuery';
import type { GetRankingListResponse } from '@wsh-2024/schema/src/api/rankings/GetRankingListResponse';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';
import { apiClient } from '../../../lib/api/apiClient';

type RankingApiClient = DomainSpecificApiClientInterface<{
  fetchList: [{ query: GetRankingListRequestQuery }, GetRankingListResponse];
}>;

export const rankingApiClient: RankingApiClient = {
  fetchList: async ({ query }) => {
    const data = await apiClient('/api/v1/rankings', { method: 'GET' }, query);
    return data as GetRankingListResponse;
  },
  fetchList$$key: (options) => ({
    requestUrl: '/api/v1/rankings',
    ...options,
  }),
};
