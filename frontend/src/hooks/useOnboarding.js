import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completingOnboarding } from "../lib/api";


export const useOnboarding = ()=>{
    const queryClient = useQueryClient();
    const { mutate: onBoardingMutation, isPending } = useMutation({
        mutationFn: completingOnboarding,
        onSuccess: async () => {
        toast.success('Profile is Completed!');
        await queryClient.invalidateQueries({ queryKey: ['authUser'] });
        },
        onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
        }
    });

    return {onBoardingMutation, isPending};
}