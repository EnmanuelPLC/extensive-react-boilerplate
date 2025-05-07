"use client";

import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { createQueryKeys } from "@/services/react-query/query-key-factory";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  GetCampaignRequest,
  useGetCampaignService,
  useGetCampaignsService,
} from "@/services/api/services/campaigns";

export const campaignsQueryKeys = createQueryKeys(["campaigns"], {
  list: () => ({
    key: [],
  }),
  byId: (id: string) => ({
    key: [id],
  }),
});

export const useGetCampaignsQuery = () => {
  const fetch = useGetCampaignsService();

  const query = useInfiniteQuery({
    queryKey: campaignsQueryKeys.list().key,
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit: 10,
        },
        {
          signal,
        }
      );

      if (status === HTTP_CODES_ENUM.OK) {
        return {
          data: data.data,
          nextPage: data.hasNextPage ? pageParam + 1 : undefined,
        };
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage;
    },
  });

  return query;
};

export const useGetCampaignQuery = ({ id }: GetCampaignRequest) => {
  const fetch = useGetCampaignService();

  return useQuery({
    queryKey: campaignsQueryKeys.byId(id).key,
    queryFn: async ({ signal }) => {
      const { status, data } = await fetch(
        {
          id,
        },
        {
          signal,
        }
      );

      if (status === HTTP_CODES_ENUM.OK) {
        return {
          data,
        };
      }
    },
  });
};
