import { productsService } from '@/services/stock';
import type { CreateProductRequest, UpdateProductRequest } from '@/types/stock';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const QUERY_KEYS = {
  PRODUCTS: ['products'],
  PRODUCT: (id: string) => ['products', id],
} as const;

// GET /v1/products - Lista todos os produtos
export function useProducts() {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS,
    queryFn: () => productsService.listProducts(),
  });
}

// GET /v1/products/:productId - Busca um produto específico
export function useProduct(productId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCT(productId),
    queryFn: () => productsService.getProduct(productId),
    enabled: !!productId,
  });
}

// POST /v1/products - Cria um novo produto
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) =>
      productsService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
    },
  });
}

// PATCH /v1/products/:productId - Atualiza um produto
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      data,
    }: {
      productId: string;
      data: UpdateProductRequest;
    }) => productsService.updateProduct(productId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PRODUCT(variables.productId),
      });
    },
  });
}

// DELETE /v1/products/:productId - Deleta um produto
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => productsService.deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
    },
  });
}
