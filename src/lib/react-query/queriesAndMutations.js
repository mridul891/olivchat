import {
    useQuery // used  for fetching the data from the server
    ,useMutation, // used for modifying the data 
    useQueryClient,
    useInfiniteQuery
} from "@tanstack/react-query"
import {createUserAccount ,signInAccount } from '../appwrite/api'
export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn: (user) => createUserAccount(user)
    })
}
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user) => signInAccount(user),
    })
}