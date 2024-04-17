import { useQuery } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ENDPOINT_API } from "./constants/constants";

export const queryClient = new QueryClient();

const fetchSuggestions = async (input) => {
  const response = await fetch(`${ENDPOINT_API}?search=${input}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useAutocomplete = (input) => {
  return useQuery({
    queryKey: ["autocomplete", input],
    queryFn: () => fetchSuggestions(input),
    enabled: input.length > 0,
  });
};
