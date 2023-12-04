import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import districtsApi from "../../api/districtsApi";

const moduleName = "districts";

export const getAllAction = createAsyncThunk(
    `${moduleName}/list`,
    async (params, { rejectWithValue }) => {
      try {
        // call Api
        const response = await districtsApi.getAll({params:params});
        const res = response.data;
        if (res.result) {
          const results = {
            data : res.data
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
    }
  );




const districtsSlice = createSlice({
  name: "districts",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    //get all
    builder
      .addCase(getAllAction.pending, (state) => {
        state.loading = true;
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(getAllAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(getAllAction.rejected, (state, action) => {
        state.loading = false;
        state.appError = action?.payload;
        state.serverError = action?.error?.message;
      });
  },
});
export const selectDistricts = (state) => state?.districts;

export default districtsSlice.reducer;
