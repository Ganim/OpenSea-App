/**
 * Request Template Page
 * Página para usuários comuns solicitarem novos templates aos managers
 */

'use client';

import { PageHeader } from '@/components/stock/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/auth-context';
import { FileText, Send, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RequestTemplatePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [category, setCategory] = useState('');
  const [justification, setJustification] = useState('');
  const [examples, setExamples] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateName.trim() || !justification.trim()) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    try {
      setIsLoading(true);

      // TODO: Implementar API de requisições
      const request = {
        templateName: templateName.trim(),
        category: category.trim(),
        justification: justification.trim(),
        examples: examples.trim(),
        requestedBy: user?.id,
        requestedAt: new Date().toISOString(),
        status: 'pending',
      };

      console.log('📝 Requisição criada:', request);

      // Simular chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Requisição enviada com sucesso!', {
        description: 'Um gerente irá analisar sua solicitação em breve.',
      });

      // Limpar formulário
      setTemplateName('');
      setCategory('');
      setJustification('');
      setExamples('');
    } catch (error) {
      console.error('❌ Erro ao enviar requisição:', error);
      toast.error('Erro ao enviar requisição', {
        description: 'Tente novamente mais tarde.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-8">
      <PageHeader
        title="Solicitar Template"
        description="Solicite a criação de um novo template para gerenciar seus produtos"
        showBackButton={true}
      />

      {/* Info Card */}
      <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Como funciona?
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Preencha o formulário abaixo com as informações sobre o template
              que você precisa. Um gerente irá analisar sua solicitação e criar
              o template, notificando você quando estiver pronto.
            </p>
          </div>
        </div>
      </div>

      {/* Request Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <User className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-lg font-semibold">
              Informações da Solicitação
            </h2>
          </div>

          <div className="space-y-4">
            {/* Nome do Template */}
            <div className="space-y-2">
              <Label htmlFor="templateName">
                Nome do Template <span className="text-red-500">*</span>
              </Label>
              <Input
                id="templateName"
                placeholder="Ex: Eletrônicos, Roupas, Alimentos..."
                value={templateName}
                onChange={e => setTemplateName(e.target.value)}
                required
                className="h-11"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Nome descritivo para o tipo de produto
              </p>
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <Label htmlFor="category">Categoria (Opcional)</Label>
              <Input
                id="category"
                placeholder="Ex: Tecnologia, Vestuário, Alimentação..."
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="h-11"
              />
            </div>

            {/* Justificativa */}
            <div className="space-y-2">
              <Label htmlFor="justification">
                Justificativa <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="justification"
                placeholder="Explique por que você precisa deste template e como ele será utilizado..."
                value={justification}
                onChange={e => setJustification(e.target.value)}
                required
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Descreva o contexto e a necessidade deste template
              </p>
            </div>

            {/* Exemplos */}
            <div className="space-y-2">
              <Label htmlFor="examples">Exemplos de Produtos (Opcional)</Label>
              <Textarea
                id="examples"
                placeholder="Liste alguns exemplos de produtos que usarão este template..."
                value={examples}
                onChange={e => setExamples(e.target.value)}
                rows={3}
                className="resize-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Ajuda o gerente a entender melhor sua necessidade
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={
              !templateName.trim() || !justification.trim() || isLoading
            }
            className="bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Send className="w-4 h-4 mr-2" />
            {isLoading ? 'Enviando...' : 'Enviar Solicitação'}
          </Button>
        </div>
      </form>

      {/* Help Section */}
      <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold mb-2">Dicas para uma boa solicitação:</h3>
        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Seja específico sobre o tipo de produto</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Explique como o template será usado no dia a dia</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>
              Liste atributos que você acha importantes (cor, tamanho, peso,
              etc)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Forneça exemplos concretos de produtos</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
