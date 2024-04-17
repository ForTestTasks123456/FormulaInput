import { useQuery } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ENDPOINT_API } from "../constants/constants";
import { useStore } from "../store/store";

export const queryClient = new QueryClient();

const fetchSuggestions = async (input) => {
  const response = await fetch(`${ENDPOINT_API}?search=${input}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useAutocomplete = () => {
  const { inputValue } = useStore();
  const lastInput = inputValue
    ?.split(" ")
    .slice(-1)[0]
    .trim()
    .replace(/[^a-zA-Z0-9а-яА-ЯёЁ]/g, "");
  return useQuery({
    queryKey: ["autocomplete", lastInput],
    queryFn: () => fetchSuggestions(lastInput),
    enabled: lastInput?.length > 0,
  });
};
