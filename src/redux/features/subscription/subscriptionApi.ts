import { baseApi } from "../../api/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdminSubscription: builder.query({
      query: () => {
        return {
          url: `/subscription/get-subscriptions`,
          method: "GET",
        };
      },
      providesTags: ["plan", "user"],
    }),
    getSubscribedUser: builder.query({
      query: () => ({
        url: `/subscription/subscribed-user`,
        method: "GET",
      }),
      providesTags: ["plan", "user"],
    }),

    createSubscription: builder.mutation({
      query: (data) => {
        return {
          url: "/subscription/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["plan"],
    }),

    updateSubscription: builder.mutation({
      query: (data) => {
        return {
          url: `/subscription/upgrade`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["plan"],
    }),
    downgradeSubscription: builder.mutation({
      query: (data) => {
        return {
          url: `/subscription/downgrade`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["plan"],
    }),
    cancelSubscription: builder.mutation({
      query: () => {
        return {
          url: `/subscription/cancel`,
          method: "POST",
        };
      },
      invalidatesTags: ["plan"],
    }),
    mySubscription: builder.query({
      query: () => {
        return {
          url: `/subscription/my-subscription`,
          method: "GET",
        };
      },
      providesTags: ["plan", "user"],
    }),
  }),
});

export const {
  useGetAllAdminSubscriptionQuery,
  useGetSubscribedUserQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useCancelSubscriptionMutation,
  useMySubscriptionQuery,
  useDowngradeSubscriptionMutation,
} = subscriptionApi;
