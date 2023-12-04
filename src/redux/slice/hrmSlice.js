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
          data: res.newData,
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
      const response = await hrmAPi.getbyid(id);
      const res = response.data;
      if (res.result) {
        const results = {
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

export const UpdateByIdAction = createAsyncThunk(
  `${moduleName}/updateById`,
  async ({ id, data }, { rejectWithValue }) => {
    try {
      // call Api
      const response = await hrmAPi.updatebyid(id, data);
      const res = response.data;
      if (res.result) {
        const results = {
          id: id,
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
          id: id,
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
        state.data = action.payload.data;
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(getAllAction.rejected, (state, action) => {
        state.loading = false;
        state.appError = action?.payload;
        state.serverError = action?.error?.message;
      });

    builder
      .addCase(UpdateByIdAction.pending, (state) => {
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(UpdateByIdAction.fulfilled, (state, action) => {
        const checkIndex = state.data.findIndex(
          (row) => parseInt(row.id) === parseInt(action?.payload?.id)
        );
        if (checkIndex >= 0) {
          state.data[checkIndex] = action?.payload?.data[0];
        }
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(UpdateByIdAction.rejected, (state, action) => {
        state.appError = action?.payload;
        state.serverError = action?.error?.message;
      });

    builder
      .addCase(registerAction.pending, (state) => {
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.data = [...action.payload?.data, ...state.data];
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.appError = action?.payload;
        state.serverError = action?.error?.message;
      });
    
    builder
      .addCase(getByIdAction.pending, (state) => {
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(getByIdAction.fulfilled, (state, action) => {
        state.dataUpdate = action.payload?.data;
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(getByIdAction.rejected, (state, action) => {
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
        state.data = state.data.filter(
          (arrow) => arrow.id !== action.payload.id
        );
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
