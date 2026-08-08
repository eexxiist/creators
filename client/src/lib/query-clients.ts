import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()









// 📦 кэш запросов;
// ⏳ состояние загрузки (isLoading);
// ❌ ошибки (isError);
// 🔄 повторные запросы (retry);
// ⌛ время жизни данных (staleTime, gcTime);
// 🔁 обновление данных.