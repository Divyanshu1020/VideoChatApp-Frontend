// import { useState } from "react";
// import { toast } from "./use-toast";

// export default function useAsyncMutation(mutationHook) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState(null);
  
//   const [mutate] = mutationHook();

//   const executeMutation = async (toastMessage, ...args) => {

//     setIsLoading(true);

//     try {
//       const res = await mutate(...args);
//       if (res.data) {
//         toast({
//           title: res.data.message || "success",
//           variant: "default",
//         })
//         setData(res.data.data);
//       }else{
//         toast({
//           title: res?.error?.data?.message,
//           variant: "default",
//         })
//       }
//     } catch (error) {
//       console.log("error", error);
//       toast({
//         title: "Error",
//         description: "Something went wrong. Please try again later.",
//         variant: "destructive",
//       })
//     } finally(() => {
//       setIsLoading(false);
//     })
//   }  

// }
