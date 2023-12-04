import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import hrmAPi from "../../api/hrmApi";

const moduleName = "hrm";

export const getAllAction = createAsyncThunk(
    `${moduleName}/list`,
    async (params, { rejectWithValue }) => {
      try {
        // call Api
        const response = await hrmAPi.getAll(params);
        const res = response.data;
        console.log("res", res);
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

export const registerAction = createAsyncThunk(
  `${moduleName}/register`,
  async (data, { rejectWithValue }) => {
    try {
      // call Api
      const response = await hrmAPi.register(data);
      const res = response.data;
      if (res.result) {
        const results = {
          msg: res?.msg,
          data: res?.newData,
        };
        return results;
      } else {
        return rejectWithValue(res?.error[0]);
      }
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getByIdAction = createAsyncThunk(
    `${moduleName}/getById`,
    async (id, { rejectWithValue }) => {
      try {
        // call Api
        const response = await hrmAPi.register(id);
        const res = response.data;
        if (res.result) {
          const results = {
            msg: res?.msg,
            data: res?.newData,
          };
          return results;
        } else {
          return rejectWithValue(res?.error[0]);
        }
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );


export const deleteAction = createAsyncThunk(
    `${moduleName}/delete`,
    async (id, { rejectWithValue }) => {
      try {
        // call Api
        const response = await hrmAPi.delete(id);
        const res = response.data;
        if (res.result) {
          const results = {
            msg: res?.msg,
            id:id
          };
          return results;
        } else {
          return rejectWithValue(res?.error[0]);
        }
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );




const hrmSlices = createSlice({
  name: "hrm",
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
    
    builder
      .addCase(registerAction.pending, (state) => {
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.data = [...action.payload?.data,...state.data]
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.appError = action?.payload;
        state.serverError = action?.error?.message;
      });
      builder
      .addCase(deleteAction.pending, (state) => {
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(deleteAction.fulfilled, (state, action) => {
        state.data = state.data.filter((arrow) => arrow.id !== action.payload.id);
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(deleteAction.rejected, (state, action) => {
        state.appError = action?.payload;
        state.serverError = action?.error?.message;
      });
  },
});
export const selectHrm = (state) => state?.hrm;

export default hrmSlices.reducer;
