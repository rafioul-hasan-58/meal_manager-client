import { CreateReflextionPayload, CreateReflextionResponse } from "@/types/reflextion.types";
import { baseApi } from "../../api/baseApi";

const ReflextionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReflextion: builder.query({
      query: () => ({
        url: `/reflextion/get-all`,
        method: "GET",
      }),
      providesTags: ["reflextion"],
    }),
    getUserReflextion: builder.query({
      query: () => {
        return {
          url: `/reflextion/get-my`,
          method: "GET",
        };
      },
      providesTags: ["reflextion"],
    }),
    getSingleReflextion: builder.query({
      query: (id) => ({
        url: `/reflextion/details/${id}`,
        method: "GET",
      }),
      providesTags: ["reflextion"],
    }),

    createReflextion: builder.mutation<CreateReflextionResponse, CreateReflextionPayload>({
      query: (data) => {
        return {
          url: `/reflextion/create`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["reflextion"],
    }),

    updateReflextion: builder.mutation({
      query: (data) => {
        const { id, ...bodyData } = data;
        return {
          url: `/reflextion/update/${id}`,
          method: "PATCH",
          body: bodyData,
        };
      },
      invalidatesTags: ["reflextion"],
    }),
    deleteReflextion: builder.mutation({
      query: (id) => {
        return {
          url: `/reflextion/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["reflextion"],
    }),
  }),
});

export const {
  useGetAllReflextionQuery,
  useGetSingleReflextionQuery,
  useCreateReflextionMutation,
  useUpdateReflextionMutation,
  useDeleteReflextionMutation,
  useGetUserReflextionQuery,
} = ReflextionApi;
