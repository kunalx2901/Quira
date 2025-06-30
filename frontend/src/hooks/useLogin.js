import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";

export const useLogin = ()=>{
    const queryClient = useQueryClient();
    const { mutate:loginMutation, isPending, error } = useMutation({
        mutationFn: (formData)=>login(formData),
        onSuccess: async() => {
        await queryClient.invalidateQueries({queryKey:['authUser']});
        },
    });

    return {loginMutation, isPending:isPending, error:error};
}