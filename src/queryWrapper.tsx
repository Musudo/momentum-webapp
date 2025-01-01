import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { queryClient } from "./utils/queryClient";

const QueryWrapper = ({ children }: { children: ReactNode }) => {
  // const someSelector = useSelector(
  //   (state: RootState) => state.someSelector
  // );

  // useEffect(() => {
  //   queryClient.invalidateQueries({ queryKey: ["refetchKey"] });
  // }, [someSelector]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryWrapper;
