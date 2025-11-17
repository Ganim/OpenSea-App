/**
 * Traduções de mensagens de erro da API
 * Mapeia mensagens em inglês para português
 */
export const errorMessages: Record<string, string> = {
  // Erros de autenticação
  'Invalid credentials': 'Credenciais inválidas',
  'User not found': 'Usuário não encontrado',
  'Invalid password': 'Senha incorreta',
  'Email already exists': 'Este e-mail já está cadastrado',
  'Username already exists': 'Este nome de usuário já está em uso',
  'Invalid email': 'E-mail inválido',
  'Invalid username': 'Nome de usuário inválido',

  // Erros de recuperação de senha
  'Invalid reset code': 'Código de recuperação inválido',
  'Reset code expired': 'Código de recuperação expirado',
  'Email not found': 'E-mail não encontrado',
  'Failed to send email': 'Falha ao enviar e-mail',

  // Erros de validação
  'Password too short': 'Senha muito curta',
  'Password too weak': 'Senha muito fraca',
  'Passwords do not match': 'As senhas não coincidem',
  'Field is required': 'Campo obrigatório',
  'Invalid format': 'Formato inválido',

  // Erros genéricos
  'Something went wrong': 'Algo deu errado',
  'Network error': 'Erro de conexão',
  'Server error': 'Erro no servidor',
  Unauthorized: 'Não autorizado',
  Forbidden: 'Acesso negado',
  'Not found': 'Não encontrado',
  'Request timeout': 'Tempo de requisição esgotado',

  // Erros HTTP comuns
  'Bad Request': 'Requisição inválida',
  'Internal Server Error': 'Erro interno do servidor',
  'Service Unavailable': 'Serviço indisponível',
};

/**
 * Traduz uma mensagem de erro do inglês para português
 * @param error - Mensagem de erro ou objeto de erro
 * @returns Mensagem traduzida ou mensagem original se não houver tradução
 */
export function translateError(error: string | Error | unknown): string {
  if (!error) {
    return 'Ocorreu um erro desconhecido';
  }

  // Se for um objeto Error
  if (error instanceof Error) {
    const message = error.message;
    return errorMessages[message] || message || 'Ocorreu um erro desconhecido';
  }

  // Se for uma string
  if (typeof error === 'string') {
    return errorMessages[error] || error || 'Ocorreu um erro desconhecido';
  }

  // Se for um objeto com propriedade message
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message: string }).message;
    return errorMessages[message] || message || 'Ocorreu um erro desconhecido';
  }

  return 'Ocorreu um erro desconhecido';
}

/**
 * Adiciona uma nova tradução de erro
 * @param key - Chave da mensagem em inglês
 * @param value - Tradução em português
 */
export function addErrorTranslation(key: string, value: string): void {
  errorMessages[key] = value;
}
