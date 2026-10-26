import { QueryClientProvider as QCP } from "@tanstack/react-query";

import { queryClient } from "@shared/lib";

type Props = {
  children: React.ReactNode;
};

export const QueryClientProvider = ({ children }: Props) => {
  return <QCP client={queryClient}>{children}</QCP>;
};
