export const getQueryParamsObj = (searchParams: URLSearchParams) => {
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};
