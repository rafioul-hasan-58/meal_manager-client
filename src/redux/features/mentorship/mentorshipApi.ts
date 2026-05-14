/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from "@/types/common";
import { baseApi } from "../../api/baseApi";

// ==================== TYPES (strict TS - no any) ====================
export interface MentorRequestPayload {
  mentorId: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
}

export interface AcceptDeclineRequestPayload {
  requestId: string;
  note?: string;
}

export interface SessionPayload {
  requestId: string;
  sessionDate: string;
  sessionTime: string;
  duration: number;
  meetingLink?: string;
}

export interface CompletionRequestPayload {
  requestId: string;
  actionItems: string[];
}

export interface AcceptCompletionPayload {
  completionId: string;
  actionItems: string[];
}

export interface PendingMentor {
  id: string;
  mentorName: string;
  role: string;
  company: string;
  experienceYears: number;
  isApproved: boolean;
  user: { id: string; profileImage: string };
}

export interface MentorProfileSetup {
  mentorName?: string;
  role?: string;
  company?: string;
  experienceYears?: number;
  mentorshipDetails?: string; // ← this is the "bio" field used by backend
  availability?: string;
  maxActiveMentees?: number;
  skills?: string[];
}

export interface MentorProfile extends MentorProfileSetup {
  id: string;
  userId: string;
  isApproved: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  embedding?: null | string;
  profileImage?: string;
}

// ==================== RTK QUERY - ALL MENTORSHIP ENDPOINTS FROM IMAGE ====================
const mentorshipApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** ==================== REQUEST ==================== */
    // 1. Send Request (Mentee)
    sendMentorRequest: builder.mutation<ApiResponse<any>, MentorRequestPayload>(
      {
        query: (body) => ({
          url: "/mentor/send-request",
          method: "POST",
          body,
        }),
        invalidatesTags: ["MentorRequest"],
      },
    ),

    // 2. My requests (Mentor)
    getMyRequests: builder.query<
      ApiResponse<any[]>,
      { page?: number; limit?: number; status?: string; searchTerm?: string }
    >({
      query: ({ page, limit, status, searchTerm }) => ({
        url: "/mentor/my-requests",
        method: "GET",
        params: {
          page,
          limit,
          status,
          searchTerm,
        },
      }),
      providesTags: ["MentorRequest"],
    }),

    // 3. Accept Request (Mentor)
    acceptMentorRequest: builder.mutation<
      ApiResponse<any>,
      AcceptDeclineRequestPayload
    >({
      query: (payload) => ({
        url: `/mentor/request/accept/${payload.requestId}`,
        method: "POST",
      }),
      invalidatesTags: ["MentorRequest"],
    }),

    // 4. Decline Request (Mentor)
    declineMentorRequest: builder.mutation({
      query: (requestId) => ({
        url: `/mentor/request/reject/${requestId}`,
        method: "POST",
      }),
      invalidatesTags: ["MentorRequest"],
    }),

    // 5. My mentors (Mentee)
    getMyMentors: builder.query({
      query: ({ status, page, limit, searchTerm }) => ({
        url: "/mentor/my",
        method: "GET",
        params: {
          status,
          page,
          limit,
          searchTerm,
        },
      }),
      providesTags: ["MentorRequest"],
    }),

    // 6. Request Details (Mentor & Mentee)
    getRequestDetails: builder.query<ApiResponse<any>, string>({
      query: (requestId) => ({
        url: `/mentor/request/details/${requestId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "MentorRequest", id }],
    }),

    /** ==================== SESSION ==================== */
    // 1. Send Request / Book Session (Mentee)
    sendSessionRequest: builder.mutation({
      query: (body) => ({
        url: "/session/send-request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MentorSession"],
    }),

    // 4. Accept Session (Mentor)
    acceptSession: builder.mutation<
      ApiResponse<any>,
      {
        sessionId: string;
        startDateTime?: string;
        endDateTime?: string;
        meetLink?: string;
      }
    >({
      query: (body) => ({
        url: "/session/accept",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MentorSession"],
    }),

    // 5. Decline Session (Mentor)
    declineSession: builder.mutation<
      ApiResponse<any>,
      { sessionId: string; note?: string }
    >({
      query: (body) => ({
        url: "/session/decline",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MentorSession"],
    }),

    /** ==================== MENTOR PROFILE ==================== */
    // 1. Setup profile (Mentor)
    createMentorProfile: builder.mutation<
      ApiResponse<any>,
      MentorProfileSetup | FormData
    >({
      query: (data) => ({
        url: "/mentor/setup-profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Mentor"],
    }),

    // GET Mentor Profile
    getMyMentorProfile: builder.query<ApiResponse<any>, void>({
      query: () => ({
        url: "/mentor/get-profile",
        method: "GET",
      }),
      providesTags: ["Mentor"],
    }),

    // GET Mentor Profile by ID
    getMentorProfileById: builder.query({
      query: (mentorId) => ({
        url: `/mentor/get-mentor/${mentorId}`,
        method: "GET",
      }),
      providesTags: ["Mentor"],
    }),

    // 2. Update Profile (Mentor)
    updateMentorProfile: builder.mutation<
      ApiResponse<any>,
      Partial<MentorProfileSetup> | FormData
    >({
      query: (data) => ({
        url: "/mentor/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Mentor"],
    }),

    // 3. Activate Profile (Mentor)
    activateMentorProfile: builder.mutation<ApiResponse<any>, void>({
      query: () => ({
        url: "/mentor/profile/activate",
        method: "PATCH",
      }),
      invalidatesTags: ["Mentor"],
    }),

    // 4. Deactivate Profile (Mentor)
    deactivateMentorProfile: builder.mutation<ApiResponse<any>, void>({
      query: () => ({
        url: "/mentor/profile/deactivate",
        method: "PATCH",
      }),
      invalidatesTags: ["Mentor"],
    }),

    /** ==================== ADMIN ACTIONS ==================== */
    // 2. Pending mentors (Admin)
    getPendingMentors: builder.query<
      ApiResponse<PendingMentor[]>,
      {
        searchTerm?: string;
        limit?: number;
        page?: number;
        isApproved?: boolean;
      }
    >({
      query: ({ searchTerm, limit, page, isApproved }) => ({
        url: "/mentor/get-all",
        method: "GET",
        params: {
          searchTerm,
          limit,
          page,
          isApproved,
        },
      }),
      providesTags: ["Mentor"],
    }),

    // 3. Approve mentor (Admin)
    approveMentor: builder.mutation<ApiResponse<any>, string>({
      query: (id) => ({
        url: `/mentor/approve/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Mentor"],
    }),

    // 1. Send Completion Request (Mentee)
    sendCompletionRequest: builder.mutation({
      query: (body) => ({
        url: "/mentor/send-completion",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Mentor"],
    }),

    // 2. Accept Completion (Mentor)
    acceptCompletion: builder.mutation<
      ApiResponse<any>,
      AcceptCompletionPayload
    >({
      query: (body) => ({
        url: "/mentor/accpet-completion",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Mentor"],
    }),

    // 3. Reject Completion (Mentor)
    rejectCompletion: builder.mutation<
      ApiResponse<any>,
      { id: string; feedback: string } // <-- was just `string`
    >({
      query: ({ id, feedback }) => ({
        url: `/mentor/reject-completion/${id}`,
        method: "POST",
        body: { feedback }, // <-- send feedback in POST body
      }),
      invalidatesTags: ["Mentor"],
    }),
  }),
});

export const {
  // Request
  useSendMentorRequestMutation,
  useGetMyRequestsQuery,
  useAcceptMentorRequestMutation,
  useDeclineMentorRequestMutation,
  useGetMyMentorsQuery,
  useGetRequestDetailsQuery,
  // Session
  useSendSessionRequestMutation,
  useAcceptSessionMutation,
  useDeclineSessionMutation,
  // Mentor Profile
  useCreateMentorProfileMutation,
  useGetMyMentorProfileQuery,
  useUpdateMentorProfileMutation,
  useActivateMentorProfileMutation,
  useDeactivateMentorProfileMutation,
  useGetMentorProfileByIdQuery,
  // Admin
  useGetPendingMentorsQuery,
  useApproveMentorMutation,
  useSendCompletionRequestMutation,
  useAcceptCompletionMutation,
  useRejectCompletionMutation,
} = mentorshipApi;
