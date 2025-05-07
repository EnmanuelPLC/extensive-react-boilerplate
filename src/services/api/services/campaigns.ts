import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { RequestConfigType } from "./types/request-config";
import { Campaign as Entity } from "../types/campaign";

export type GetCampaignsRequest = {
  page: number;
  limit: number;
};

export type GetCampaignsResponse = InfinityPaginationType<Entity>;

export function useGetCampaignsService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetCampaignsRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/campaigns`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetCampaignsResponse>);
    },
    [fetch]
  );
}

export type GetCampaignRequest = {
  id: Entity["id"];
};

export type GetCampaignResponse = Entity;

export function useGetCampaignService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetCampaignRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/campaigns/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetCampaignResponse>);
    },
    [fetch]
  );
}

export type CreateCampaignRequest = Omit<
  Entity,
  "id" | "createdAt" | "updatedAt"
>;

export type CreateCampaignResponse = Entity;

export function useCreateCampaignService() {
  const fetch = useFetch();

  return useCallback(
    (data: CreateCampaignRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/campaigns`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CreateCampaignResponse>);
    },
    [fetch]
  );
}

export type EditCampaignRequest = {
  id: Entity["id"];
  data: Partial<Omit<Entity, "id" | "createdAt" | "updatedAt">>;
};

export type EditCampaignResponse = Entity;

export function useEditCampaignService() {
  const fetch = useFetch();

  return useCallback(
    (data: EditCampaignRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/campaigns/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<EditCampaignResponse>);
    },
    [fetch]
  );
}

export type DeleteCampaignRequest = {
  id: Entity["id"];
};

export type DeleteCampaignResponse = undefined;

export function useDeleteCampaignService() {
  const fetch = useFetch();

  return useCallback(
    (data: DeleteCampaignRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/campaigns/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<DeleteCampaignResponse>);
    },
    [fetch]
  );
}
