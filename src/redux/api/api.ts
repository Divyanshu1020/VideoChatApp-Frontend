import env from "@/constants/env";
import url from "@/constants/url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: env.BASE_URL }),
  
  tagTypes: ["Chat", "User", "Message"],
  endpoints: (build) => ({
    getChats: build.query({
      query: () => ({
        url: url.allChats,
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    searchUser: build.query({
      query: (name: string) => ({
        url: `${url.userSearch}?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    sendFriendRequest: build.mutation({

      query: (data) => ({
        url: url.sendFriendRequest,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    acceptAndRejectFriendRequest: build.mutation({
        query: (data) => ({
          url: url.acceptOrDecline,
          method: "PUT",
          body: data,
          credentials: "include",
        }),
        invalidatesTags: ["Chat"],
      }),
    getNotifications: build.query({
      query: () => ({
        url: url.getNotification,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    getChatDetails: build.query({
      query: ({chatId, populate=false}) => {
        let apiUrl = `${url.chatDetails}${chatId}`;
        if(populate){
          apiUrl  = apiUrl + "?populate=true"
        }
        return{
        url: apiUrl,
        credentials: "include",
      }},
      keepUnusedDataFor: 0,
    }),
    getOldMessages: build.query({
      query: ({chatId, page}) => ({
        url: `${url.chatOldMessage}${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    sendAttchment: build.mutation({
      query: (data) => ({
        url: url.attachment,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    createNewGroup: build.mutation({
      query: (data) => ({
        url: url.createGroup,
        method: "POST",
        body: data,
        credentials: "include",
        prepareHeaders: (headers : Headers) => {
          headers.set("Content-Type", "multipart/form-data");
          return headers;
        },
      }),
    }),
    getMyFriends: build.mutation({
      query: () => ({
        url: url.friends,
        method: "POST",
        credentials: "include",
      }),
    }),
    getMyGroups: build.query({
      query: () => ({
        url: url.myGroup,
        credentials: "include",
      }),
    }),
    changeGroupName: build.mutation({
      query: (data) => ({
        url: url.renameGroup,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    addNewMemebersInGroup: build.mutation({
      query: (data) => ({
        url: url.addMemeberInGroup,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    removeMemebersInGroup: build.mutation({
      query: (data) => ({
        url: url.removeMemberInGroup,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),
    changeAvatarOfGroup: build.mutation({
      query: (data) => ({
        url: url.changeAvatarOfGroup,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export default api;

export const {
  useLazyGetChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useLazyGetNotificationsQuery,
  useAcceptAndRejectFriendRequestMutation,
  useLazyGetChatDetailsQuery,
  useLazyGetOldMessagesQuery,
  useSendAttchmentMutation,
  useCreateNewGroupMutation,
  useGetMyFriendsMutation,
  useLazyGetMyGroupsQuery,
  useChangeGroupNameMutation,
  useAddNewMemebersInGroupMutation,
  useRemoveMemebersInGroupMutation,
  useChangeAvatarOfGroupMutation,
} = api;
