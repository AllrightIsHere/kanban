export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "Ocorreu um erro inesperado";
};

export const logError = (error: unknown, context: string): void => {
  console.error(`[${context}]`, error);
};
