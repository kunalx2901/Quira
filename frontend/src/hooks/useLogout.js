import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";


export const useLogout = ()=>{
    const queryClient = useQueryClient();
    const {mutate:logoutMutation , isPending, error} = useMutation({
        mutationFn:logout,
        onSuccess:async()=>{
        await queryClient.invalidateQueries({queryKey:['authUser']});
        toast.success("Logged Out !");
        }
    })

    return {logoutMutation, isPending, error};

}