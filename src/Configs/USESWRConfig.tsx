import axios, { AxiosResponse } from "axios";
import { SWRConfig } from "swr";

type UseSWRConfigProps = {
  children: React.ReactNode;
};

type Fetcher = (
  ...args: Parameters<typeof axios.get>
) => Promise<AxiosResponse<any>>;

const fetcher: Fetcher = async (url, config) => {
  const headers = {
    ...config?.headers,
  };

  return axios.get(url, { ...config, headers }).then((res) => res);
};

const UseSWRConfigProvider = ({ children }: UseSWRConfigProps) => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};

export default UseSWRConfigProvider;
