import { useQuery } from "react-query";
import { apiClient } from "./api";

export function useItems(){
    return useQuery(['items'],() => apiClient.get('items').then(res => res.data))
}