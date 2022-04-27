import { api_ } from "./axios";

export const fetcher = ({ queryKey }: any) => {
  return api_.get(queryKey[0]).then(({ data }) => data);
};
