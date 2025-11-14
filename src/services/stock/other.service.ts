import { API_ENDPOINTS } from '@/config/api';
import { apiClient } from '@/lib/api-client';
import type {
  CategoriesResponse,
  CategoryResponse,
  CreateCategoryRequest,
  CreateLocationRequest,
  CreateManufacturerRequest,
  CreatePurchaseOrderRequest,
  CreateSupplierRequest,
  CreateTagRequest,
  CreateTemplateRequest,
  LocationResponse,
  LocationsResponse,
  ManufacturerResponse,
  ManufacturersResponse,
  PurchaseOrderResponse,
  PurchaseOrdersResponse,
  SupplierResponse,
  SuppliersResponse,
  TagResponse,
  TagsResponse,
  TemplateResponse,
  TemplatesResponse,
  UpdateCategoryRequest,
  UpdateLocationRequest,
  UpdateManufacturerRequest,
  UpdatePurchaseOrderStatusRequest,
  UpdateSupplierRequest,
  UpdateTagRequest,
  UpdateTemplateRequest,
} from '@/types/stock';

// Categories Service
export const categoriesService = {
  async listCategories(): Promise<CategoriesResponse> {
    return apiClient.get<CategoriesResponse>(API_ENDPOINTS.CATEGORIES.LIST);
  },

  async getCategory(id: string): Promise<CategoryResponse> {
    return apiClient.get<CategoryResponse>(API_ENDPOINTS.CATEGORIES.GET(id));
  },

  async createCategory(data: CreateCategoryRequest): Promise<CategoryResponse> {
    return apiClient.post<CategoryResponse>(
      API_ENDPOINTS.CATEGORIES.CREATE,
      data
    );
  },

  async updateCategory(
    id: string,
    data: UpdateCategoryRequest
  ): Promise<CategoryResponse> {
    return apiClient.patch<CategoryResponse>(
      API_ENDPOINTS.CATEGORIES.UPDATE(id),
      data
    );
  },

  async deleteCategory(id: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.CATEGORIES.DELETE(id));
  },
};

// Manufacturers Service
export const manufacturersService = {
  async listManufacturers(): Promise<ManufacturersResponse> {
    return apiClient.get<ManufacturersResponse>(
      API_ENDPOINTS.MANUFACTURERS.LIST
    );
  },

  async getManufacturer(id: string): Promise<ManufacturerResponse> {
    return apiClient.get<ManufacturerResponse>(
      API_ENDPOINTS.MANUFACTURERS.GET(id)
    );
  },

  async createManufacturer(
    data: CreateManufacturerRequest
  ): Promise<ManufacturerResponse> {
    return apiClient.post<ManufacturerResponse>(
      API_ENDPOINTS.MANUFACTURERS.CREATE,
      data
    );
  },

  async updateManufacturer(
    id: string,
    data: UpdateManufacturerRequest
  ): Promise<ManufacturerResponse> {
    return apiClient.patch<ManufacturerResponse>(
      API_ENDPOINTS.MANUFACTURERS.UPDATE(id),
      data
    );
  },

  async deleteManufacturer(id: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.MANUFACTURERS.DELETE(id));
  },
};

// Suppliers Service
export const suppliersService = {
  async listSuppliers(): Promise<SuppliersResponse> {
    return apiClient.get<SuppliersResponse>(API_ENDPOINTS.SUPPLIERS.LIST);
  },

  async getSupplier(id: string): Promise<SupplierResponse> {
    return apiClient.get<SupplierResponse>(API_ENDPOINTS.SUPPLIERS.GET(id));
  },

  async createSupplier(data: CreateSupplierRequest): Promise<SupplierResponse> {
    return apiClient.post<SupplierResponse>(
      API_ENDPOINTS.SUPPLIERS.CREATE,
      data
    );
  },

  async updateSupplier(
    id: string,
    data: UpdateSupplierRequest
  ): Promise<SupplierResponse> {
    return apiClient.patch<SupplierResponse>(
      API_ENDPOINTS.SUPPLIERS.UPDATE(id),
      data
    );
  },

  async deleteSupplier(id: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.SUPPLIERS.DELETE(id));
  },
};

// Locations Service
export const locationsService = {
  async listLocations(): Promise<LocationsResponse> {
    return apiClient.get<LocationsResponse>(API_ENDPOINTS.LOCATIONS.LIST);
  },

  async getLocation(id: string): Promise<LocationResponse> {
    return apiClient.get<LocationResponse>(API_ENDPOINTS.LOCATIONS.GET(id));
  },

  async createLocation(data: CreateLocationRequest): Promise<LocationResponse> {
    return apiClient.post<LocationResponse>(
      API_ENDPOINTS.LOCATIONS.CREATE,
      data
    );
  },

  async updateLocation(
    id: string,
    data: UpdateLocationRequest
  ): Promise<LocationResponse> {
    return apiClient.patch<LocationResponse>(
      API_ENDPOINTS.LOCATIONS.UPDATE(id),
      data
    );
  },

  async deleteLocation(id: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.LOCATIONS.DELETE(id));
  },
};

// Tags Service
export const tagsService = {
  async listTags(): Promise<TagsResponse> {
    return apiClient.get<TagsResponse>(API_ENDPOINTS.TAGS.LIST);
  },

  async getTag(id: string): Promise<TagResponse> {
    return apiClient.get<TagResponse>(API_ENDPOINTS.TAGS.GET(id));
  },

  async createTag(data: CreateTagRequest): Promise<TagResponse> {
    return apiClient.post<TagResponse>(API_ENDPOINTS.TAGS.CREATE, data);
  },

  async updateTag(id: string, data: UpdateTagRequest): Promise<TagResponse> {
    return apiClient.patch<TagResponse>(API_ENDPOINTS.TAGS.UPDATE(id), data);
  },

  async deleteTag(id: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.TAGS.DELETE(id));
  },
};

// Templates Service
export const templatesService = {
  async listTemplates(): Promise<TemplatesResponse> {
    return apiClient.get<TemplatesResponse>(API_ENDPOINTS.TEMPLATES.LIST);
  },

  async getTemplate(id: string): Promise<TemplateResponse> {
    return apiClient.get<TemplateResponse>(API_ENDPOINTS.TEMPLATES.GET(id));
  },

  async createTemplate(data: CreateTemplateRequest): Promise<TemplateResponse> {
    return apiClient.post<TemplateResponse>(
      API_ENDPOINTS.TEMPLATES.CREATE,
      data
    );
  },

  async updateTemplate(
    id: string,
    data: UpdateTemplateRequest
  ): Promise<TemplateResponse> {
    return apiClient.patch<TemplateResponse>(
      API_ENDPOINTS.TEMPLATES.UPDATE(id),
      data
    );
  },

  async deleteTemplate(id: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.TEMPLATES.DELETE(id));
  },
};

// Purchase Orders Service
export const purchaseOrdersService = {
  async listPurchaseOrders(): Promise<PurchaseOrdersResponse> {
    return apiClient.get<PurchaseOrdersResponse>(
      API_ENDPOINTS.PURCHASE_ORDERS.LIST
    );
  },

  async getPurchaseOrder(id: string): Promise<PurchaseOrderResponse> {
    return apiClient.get<PurchaseOrderResponse>(
      API_ENDPOINTS.PURCHASE_ORDERS.GET(id)
    );
  },

  async createPurchaseOrder(
    data: CreatePurchaseOrderRequest
  ): Promise<PurchaseOrderResponse> {
    return apiClient.post<PurchaseOrderResponse>(
      API_ENDPOINTS.PURCHASE_ORDERS.CREATE,
      data
    );
  },

  async updatePurchaseOrderStatus(
    id: string,
    data: UpdatePurchaseOrderStatusRequest
  ): Promise<PurchaseOrderResponse> {
    return apiClient.patch<PurchaseOrderResponse>(
      API_ENDPOINTS.PURCHASE_ORDERS.UPDATE_STATUS(id),
      data
    );
  },
};
