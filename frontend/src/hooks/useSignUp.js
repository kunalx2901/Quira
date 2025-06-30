import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";

export const useSignup = () => {
    
    const queryClient = useQueryClient();  
    const {mutate:signupMutation, isPending, error} = useMutation({
        mutationFn: (formData) =>{ signup(formData)},
        onSuccess: async()=> {
        await queryClient.invalidateQueries({queryKey:['authUser']});
        },
        onError: (error) =>{
        toast.error("Error Occured !");
        }

    })

    return {signupMutation, isPending: isPending, error: error};
}