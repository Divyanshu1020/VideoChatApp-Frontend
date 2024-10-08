import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

  
interface ErrorObject<T> {
  isError: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: T | any;
  fallback?: () => void;

}

export default function useErrors<T>(errors: ErrorObject<T>[] = []) {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) {
          fallback();
        } else {
          toast({
            title: "Error",
            description: error?.data?.message || "Something went wrong",
            variant: "destructive",
          });
        }
      }
    });
  }, [errors]);
}
