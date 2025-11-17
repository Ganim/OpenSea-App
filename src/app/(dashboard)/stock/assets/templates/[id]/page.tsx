/**
 * Template View Page
 * Página de visualização detalhada de um template
 */

'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { PageHeader } from '@/components/stock/page-header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCreateTemplate, useTemplate } from '@/hooks/stock';
import type { CreateTemplateRequest } from '@/types/stock';
import { Layers, Settings } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface AttributeDefinition {
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}

export default function ViewTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params.id as string;

  const { data: template, isLoading, error } = useTemplate(templateId);
  const createTemplateMutation = useCreateTemplate();

  const handleEdit = () => {
    router.push(`/stock/assets/templates/${templateId}/edit`);
  };

  const handleDuplicate = async () => {
    if (!template) return;

    try {
      const data: CreateTemplateRequest = {
        name: `${template.name} (Cópia)`,
        productAttributes: template.productAttributes || {},
        variantAttributes: template.variantAttributes || {},
        itemAttributes: template.itemAttributes || {},
      };

      const newTemplate = await createTemplateMutation.mutateAsync(data);
      toast.success('Template duplicado com sucesso!');
      router.push(`/stock/assets/templates/${newTemplate.id}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';
      const errorDetails = JSON.stringify(
        {
          error: message,
          templateId,
          templateName: template.name,
          timestamp: new Date().toISOString(),
        },
        null,
        2
      );

      toast.error('Erro ao duplicar template', {
        description: message,
        action: {
          label: 'Copiar erro',
          onClick: () => {
            navigator.clipboard.writeText(errorDetails);
            toast.success('Erro copiado para área de transferência');
          },
        },
      });
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute requiredRole="MANAGER">
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Carregando template...
            </p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !template) {
    return (
      <ProtectedRoute requiredRole="MANAGER">
        <div className="flex items-center justify-center h-96">
          <div className="text-center space-y-4">
            <p className="text-red-600 dark:text-red-400">
              Erro ao carregar template
            </p>
            <Button onClick={() => router.push('/stock/assets/templates')}>
              Voltar
            </Button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const productAttributes = template.productAttributes as Record<
    string,
    AttributeDefinition
  > | null;
  const variantAttributes = template.variantAttributes as Record<
    string,
    AttributeDefinition
  > | null;
  const itemAttributes = template.itemAttributes as Record<
    string,
    AttributeDefinition
  > | null;

  return (
    <ProtectedRoute requiredRole="MANAGER">
      <div className="pb-8">
        <PageHeader
          title={template.name}
          description={`Criado em ${new Date(template.createdAt).toLocaleDateString('pt-BR')}`}
          showBackButton={true}
          backUrl="/stock/assets/templates"
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          editLabel="Editar"
          duplicateLabel="Duplicar"
        />

        <Tabs defaultValue="product" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="product" className="gap-2">
              <Layers className="w-4 h-4" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="variant" className="gap-2">
              <Layers className="w-4 h-4" />
              Variantes
            </TabsTrigger>
            <TabsTrigger value="item" className="gap-2">
              <Settings className="w-4 h-4" />
              Itens
            </TabsTrigger>
          </TabsList>

          {/* Tab: Atributos de Produtos */}
          <TabsContent value="product" className="space-y-4 mt-6">
            <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold">Atributos de Produtos</h2>
              </div>

              {!productAttributes ||
              Object.keys(productAttributes).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhum atributo de produto configurado.
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.entries(productAttributes).map(([key, attr]) => (
                    <div
                      key={key}
                      className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Chave
                          </p>
                          <p className="font-medium">{key}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Rótulo
                          </p>
                          <p className="font-medium">{attr.label}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Tipo
                          </p>
                          <p className="font-medium capitalize">{attr.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Status
                          </p>
                          <p
                            className={`font-medium ${
                              attr.required
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-green-600 dark:text-green-400'
                            }`}
                          >
                            {attr.required ? 'Obrigatório' : 'Opcional'}
                          </p>
                        </div>
                        {attr.type === 'select' && attr.options && (
                          <div className="col-span-full">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              Opções
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {attr.options.map((option, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                                >
                                  {option}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Tab: Atributos de Variantes */}
          <TabsContent value="variant" className="space-y-4 mt-6">
            <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-purple-500" />
                <h2 className="text-lg font-semibold">
                  Atributos de Variantes
                </h2>
              </div>

              {!variantAttributes ||
              Object.keys(variantAttributes).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhum atributo de variante configurado.
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.entries(variantAttributes).map(([key, attr]) => (
                    <div
                      key={key}
                      className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Chave
                          </p>
                          <p className="font-medium">{key}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Rótulo
                          </p>
                          <p className="font-medium">{attr.label}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Tipo
                          </p>
                          <p className="font-medium capitalize">{attr.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Status
                          </p>
                          <p
                            className={`font-medium ${
                              attr.required
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-green-600 dark:text-green-400'
                            }`}
                          >
                            {attr.required ? 'Obrigatório' : 'Opcional'}
                          </p>
                        </div>
                        {attr.type === 'select' && attr.options && (
                          <div className="col-span-full">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              Opções
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {attr.options.map((option, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                                >
                                  {option}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Tab: Atributos de Itens */}
          <TabsContent value="item" className="space-y-4 mt-6">
            <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-green-500" />
                <h2 className="text-lg font-semibold">Atributos de Itens</h2>
              </div>

              {!itemAttributes || Object.keys(itemAttributes).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Nenhum atributo de item configurado.
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.entries(itemAttributes).map(([key, attr]) => (
                    <div
                      key={key}
                      className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Chave
                          </p>
                          <p className="font-medium">{key}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Rótulo
                          </p>
                          <p className="font-medium">{attr.label}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Tipo
                          </p>
                          <p className="font-medium capitalize">{attr.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Status
                          </p>
                          <p
                            className={`font-medium ${
                              attr.required
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-green-600 dark:text-green-400'
                            }`}
                          >
                            {attr.required ? 'Obrigatório' : 'Opcional'}
                          </p>
                        </div>
                        {attr.type === 'select' && attr.options && (
                          <div className="col-span-full">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              Opções
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {attr.options.map((option, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                                >
                                  {option}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
