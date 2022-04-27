import { useEffect } from "react";
import { QueryStatus, useQuery } from "react-query";
import { RecoilState, useSetRecoilState } from "recoil";

export function useRecoilQuery<T>(
  statusAtom: RecoilState<QueryStatus>,
  dataAtom: RecoilState<T>,
  url: string,
  fetcher: any,
  disabled?: boolean
) {
  const setStatus = useSetRecoilState(statusAtom);
  const setData = useSetRecoilState(dataAtom);
  const { status, data } = useQuery(url, fetcher, {
    enabled: disabled ? false : true,
  });

  useEffect(() => {
    setStatus(status);
  }, [status, setStatus]);

  useEffect(() => {
    if (status === "success") {
      setData(data as T);
    }
  }, [data, setData, status]);

  return { status, data };
}
