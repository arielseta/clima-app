export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};
