// redux/features/auth/authApi.ts
import { API_ENDPOINTS } from "@/src/config/api";
import { baseApi } from "../../api/baseApi";
import { IRegisterPayload, IRegisterResponse } from "@/src/types/register";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Login with email/password
        register: builder.mutation<IRegisterResponse,IRegisterPayload>({
            query: (body) => ({
                url: API_ENDPOINTS.USER.REGISTER,
                method: "POST",
                body,
            }),
            invalidatesTags: ["user"],
        })
    }),
});

export const {
    useRegisterMutation,
} = userApi;

export default userApi;
