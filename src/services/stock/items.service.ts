import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/lib/api-client';
import type {
  ItemEntryResponse,
  ItemExitResponse,
  ItemMovementsQuery,
  ItemMovementsResponse,
  ItemResponse,
  ItemsResponse,
  ItemTransferResponse,
  RegisterItemEntryRequest,
  RegisterItemExitRequest,
  TransferItemRequest,
} from '@/types/stock';

export const itemsService = {
  // GET /v1/items
  async listItems(): Promise<ItemsResponse> {
    return apiClient.get<ItemsResponse>(API_ENDPOINTS.ITEMS.LIST);
  },

  // GET /v1/items/:itemId
  async getItem(itemId: string): Promise<ItemResponse> {
    return apiClient.get<ItemResponse>(API_ENDPOINTS.ITEMS.GET(itemId));
  },

  // POST /v1/items/entry
  async registerEntry(
    data: RegisterItemEntryRequest
  ): Promise<ItemEntryResponse> {
    return apiClient.post<ItemEntryResponse>(API_ENDPOINTS.ITEMS.ENTRY, data);
  },

  // POST /v1/items/exit
  async registerExit(data: RegisterItemExitRequest): Promise<ItemExitResponse> {
    return apiClient.post<ItemExitResponse>(API_ENDPOINTS.ITEMS.EXIT, data);
  },

  // POST /v1/items/transfer
  async transferItem(data: TransferItemRequest): Promise<ItemTransferResponse> {
    return apiClient.post<ItemTransferResponse>(
      API_ENDPOINTS.ITEMS.TRANSFER,
      data
    );
  },
};

export const itemMovementsService = {
  // GET /v1/item-movements
  async listMovements(
    query?: ItemMovementsQuery
  ): Promise<ItemMovementsResponse> {
    return apiClient.get<ItemMovementsResponse>(
      API_ENDPOINTS.ITEM_MOVEMENTS.LIST,
      { params: query as Record<string, string> }
    );
  },
};
