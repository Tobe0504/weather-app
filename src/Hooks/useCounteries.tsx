import useGetHook from "./useGetHooks";

export const useCounteries = () => {
  return useGetHook(
    `https://restcountries.com/v3.1/all?fields=name,capital,currencies,latlng,flags`
  );
};
