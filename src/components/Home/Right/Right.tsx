import { useParams } from "react-router-dom";

import Center, { CenterSkl } from "./components/Center";
import Top, { TopSkl } from "./components/Top";
import { useLazyGetChatDetailsQuery } from "@/redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { isChatISOpen, newMessageZero } from "@/redux/reducers/chats";
import Bottom from "./components/Bottom";
import { ChatDetails } from "@/types/Request";


export default function Chat() {
  const { id} = useParams()
  const dispatch = useDispatch();
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [bio, setBio] = useState('')
  // const {isLoading, data} = useGetChatDetailsQuery({chatId: id as string, populate:"true"}, {skip: !id})
  const [getChatDetails,] = useLazyGetChatDetailsQuery()
  const formobile = useSelector((state : RootState) => state.auth.forMobile)

  useEffect(()=>{
    // todo add loading and try catch
    setIsLoading(true)
    const getChatDetailsFun = async ()=>{
      try {
        const res = await getChatDetails({chatId: id as string, populate:"true"})
        setData(res.data.data)
        setBio(res.data.data.bio)
        dispatch(newMessageZero(id as string))
      } catch (error) {
        console.warn("error", error);
      } finally {
        setIsLoading(false)
      }
      
    }

    getChatDetailsFun()
  }, [getChatDetails, id])


  useEffect(()=>{
    dispatch(isChatISOpen(false))
  }, [])
  


  return !isLoading? (
    <div className={` ${!formobile ? "hidden" : "" } sm:flex  relative  min-h-[50vh] flex-col rounded-xl bg-muted/50  `}>
      <Top bio={bio} />
      <Center chatDetails={data as unknown as ChatDetails} />
      <Bottom data={data} islooding={isLoading}/>
    </div>
  ):(
    <div className="  hidden sm:flex  relative   min-h-[50vh] flex-col rounded-xl bg-muted/50  ">
      <TopSkl/>
      <CenterSkl/>
      <Bottom data={undefined} islooding={isLoading}/>
    </div>
  )


}

export function Defult() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(isChatISOpen(true))
  }, [])
  return (
    <div className="  relative  hidden sm:flex  min-h-[50vh] flex-col rounded-xl bg-muted/50  ">

    </div>
  )
}
