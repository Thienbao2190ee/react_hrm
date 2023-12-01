import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAPi from '../../api/authApi';

const moduleName = 'auth';

//get all data, search, paging
export const registerAction = createAsyncThunk(`${moduleName}/register`, async (data, { rejectWithValue }) => {
    try {
        // call Api
        const response = await authAPi.register(data);
        const res = response.data
        console.log('res',res);
        if (res.result) {
            const results = {
                msg : res.msg
            };
            return results;
        } else {
            return rejectWithValue(res.error[0]);
        }
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});

//get all data, search, paging
export const loginAction = createAsyncThunk(`${moduleName}/login`, async (data, { rejectWithValue }) => {
    try {
        // call Api
        const response = await authAPi.login(data);
        const res = response.data
        console.log(res);
        if (res.result) {
            const results = {
                msg : res.msg,
                user : res.data
            };
            const expired = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
            document.cookie = `refreshToken = ${res.data?.refreshToken};expires = ${new Date(expired)}`;
            document.cookie = `userInfo = ${res.data?.accessToken};expires = ${new Date(expired)}`;
            document.cookie = `userId = ${res.data?.id};expires = ${new Date(expired)}`;
            return results;
        } else {
            return rejectWithValue(res.error[0]);
        }
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});

export const checkCodeAction = createAsyncThunk(`${moduleName}/checkCode`, async (data, { rejectWithValue }) => {
    try {
        // call Api
        const response = await authAPi.checkCode(data);
        const res = response.data
        console.log('res',res);
        if (res.result) {
            const results = {
                msg : res.msg,
                user: res.newData[0]
            };
            const expired = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
            document.cookie = `refreshToken = ${res.newData[0]?.refreshToken};expires = ${new Date(expired)}`;
            document.cookie = `userInfo = ${res.newData[0]?.accessToken};expires = ${new Date(expired)}`;
            document.cookie = `userId = ${res.newData[0]?.id};expires = ${new Date(expired)}`;
            return results;
        } else {
            return rejectWithValue(res.error[0]);
        }
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
});


const authSlices = createSlice({
    name: 'auth',
    initialState: {
        data: [],
        user:[]
    },
    extraReducers: (builder) => {
        //get all
        builder
            .addCase(registerAction.pending, (state) => {
                state.loading = true;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(registerAction.fulfilled, (state, action) => {
                state.loading = false;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(registerAction.rejected, (state, action) => {
                state.loading = false;
                state.appError = action?.payload;
                state.serverError = action?.error?.message;
            });
        builder
            .addCase(checkCodeAction.pending, (state) => {
                state.loading = true;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(checkCodeAction.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(checkCodeAction.rejected, (state, action) => {
                state.loading = false;
                state.appError = action?.payload;
                state.serverError = action?.error?.message;
            });
        builder
            .addCase(loginAction.pending, (state) => {
                state.loading = true;
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user
                state.appError = undefined;
                state.serverError = undefined;
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false;
                state.appError = action?.payload;
                state.serverError = action?.error?.message;
            });
    },
});
export const selectAuth = (state) => state?.auth;

export default authSlices.reducer;