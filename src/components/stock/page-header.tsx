/**
 * Page Header Component
 * Header padrão para páginas de estoque com título e ações
 * Mobile-first: botões com ícones no mobile, com texto no desktop
 */

'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, HelpCircle, Plus, Upload, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PageHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  backUrl?: string; // URL para onde o botão voltar deve navegar
  onAdd?: () => void;
  onQuickAdd?: () => void;
  onImport?: () => void;
  onHelp?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  addLabel?: string;
  saveLabel?: string;
  editLabel?: string;
  duplicateLabel?: string;
  deleteLabel?: string;
  isLoading?: boolean;
  saveDisabled?: boolean;
}

export function PageHeader({
  title,
  description,
  showBackButton = true,
  backUrl,
  onAdd,
  onQuickAdd,
  onImport,
  onHelp,
  onCancel,
  onSave,
  onEdit,
  onDuplicate,
  onDelete,
  addLabel = 'Adicionar',
  saveLabel = 'Salvar',
  editLabel = 'Editar',
  duplicateLabel = 'Duplicar',
  deleteLabel = 'Excluir',
  isLoading = false,
  saveDisabled = false,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-6">
      {/* Header Principal */}
      <div className="flex  gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Título e Descrição */}
        <div className="flex items-start gap-3 flex-1">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => (backUrl ? router.push(backUrl) : router.back())}
              className="mt-1 shrink-0 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            {description && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 hidden sm:flex">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile: Somente ícones */}
          <div className="flex sm:hidden items-center gap-2">
            {onHelp && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onHelp}
                className="h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5"
                title="Ajuda"
              >
                <HelpCircle className="w-5 h-5" />
              </Button>
            )}
            {onQuickAdd && (
              <Button
                variant="outline"
                size="icon"
                onClick={onQuickAdd}
                className="h-10 w-10 rounded-xl border-gray-200/50 dark:border-white/10"
                title="Criação Rápida"
              >
                <Zap className="w-5 h-5 text-yellow-500" />
              </Button>
            )}
            {onImport && (
              <Button
                variant="outline"
                size="icon"
                onClick={onImport}
                className="h-10 w-10 rounded-xl border-gray-200/50 dark:border-white/10"
                title="Importar"
              >
                <Upload className="w-5 h-5" />
              </Button>
            )}
            {onAdd && (
              <Button
                variant="default"
                size="icon"
                onClick={onAdd}
                className="h-10 w-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
                title={addLabel}
              >
                <Plus className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Desktop: Botões com texto */}
          <div className="hidden sm:flex items-center gap-2">
            {onHelp && (
              <Button
                variant="ghost"
                size="default"
                onClick={onHelp}
                className="h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
              </Button>
            )}
            {onQuickAdd && (
              <Button
                variant="outline"
                size="default"
                onClick={onQuickAdd}
                className="h-10 rounded-xl border-gray-200/50 dark:border-white/10"
              >
                <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                Rápido
              </Button>
            )}
            {onImport && (
              <Button
                variant="outline"
                size="default"
                onClick={onImport}
                className="h-10 rounded-xl border-gray-200/50 dark:border-white/10"
              >
                <Upload className="w-4 h-4 mr-2" />
                Importar
              </Button>
            )}
            {onDuplicate && (
              <Button
                variant="outline"
                size="default"
                onClick={onDuplicate}
                disabled={isLoading}
                className="h-10 rounded-xl border-gray-200/50 dark:border-white/10"
              >
                {duplicateLabel}
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="default"
                onClick={onDelete}
                disabled={isLoading}
                className="h-10 rounded-xl border-red-200/50 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
              >
                {deleteLabel}
              </Button>
            )}
            {onCancel && (
              <Button
                variant="outline"
                size="default"
                onClick={onCancel}
                disabled={isLoading}
                className="h-10 rounded-xl border-gray-200/50 dark:border-white/10"
              >
                Cancelar
              </Button>
            )}
            {onEdit && (
              <Button
                variant="default"
                size="default"
                onClick={onEdit}
                disabled={isLoading}
                className="h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
              >
                {editLabel}
              </Button>
            )}
            {onSave && (
              <Button
                variant="default"
                size="default"
                onClick={onSave}
                disabled={saveDisabled || isLoading}
                className="h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
              >
                {isLoading ? saveLabel + '...' : saveLabel}
              </Button>
            )}
            {onAdd && (
              <Button
                variant="default"
                size="default"
                onClick={onAdd}
                className="h-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                {addLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
