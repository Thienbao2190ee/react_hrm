import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import newApi from "../../api/newApi";

const moduleName = "new";

export const getAllAction = createAsyncThunk(
  `${moduleName}/list`,
  async (params, { rejectWithValue }) => {
    try {
      // call Api
      const response = await newApi.getAll({params:params});
      const res = response.data;
      console.log("res", res);
      if (res.result) {
        const results = {
          data: res.newData,
          totalPage:res.totalPage
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
      const response = await newApi.register(data);
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
      const response = await newApi.getbyid(id);
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
      const response = await newApi.updatebyid(id, data);
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

export const UpdateActiveAction = createAsyncThunk(
  `${moduleName}/UpdateActive`,
  async ({ id, data }, { rejectWithValue }) => {
    try {
      // call Api
      console.log(data);
      const response = await newApi.updateActive(id, data);
      const res = response.data;
      if (res.result) {
        const results = {
          id: id,
          msg: res?.msg,
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
      const response = await newApi.delete(id);
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

export const clearData = createAsyncThunk('clear', async (data) => {
  return data
})

const newSlices = createSlice({
  name: "new",
  initialState: {
    data: [],
    totalPage:''
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(clearData.fulfilled, (state, action) => {
        state.loading = false;
        state.appError = undefined;
        state.serverError = undefined;
      })
      
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
        state.totalPage = action.payload.totalPage
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
          const createdAt = state.data[checkIndex].createdAt
          state.data[checkIndex] = action?.payload?.data[0];
          state.data[checkIndex].createdAt = createdAt

        }

        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(UpdateByIdAction.rejected, (state, action) => {
        state.appError = action?.payload;
        state.serverError = action?.error?.message;
      });

      builder
      .addCase(UpdateActiveAction.pending, (state) => {
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(UpdateActiveAction.fulfilled, (state, action) => {
        const checkIndex = state.data.findIndex(
          (row) => parseInt(row.id) === parseInt(action?.payload?.id)
        );
        if (checkIndex >= 0) {
          const active = Number(state.data[checkIndex].active) == 0 ? 1 : 0;
          state.data[checkIndex].active = active
        }
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(UpdateActiveAction.rejected, (state, action) => {
        state.appError = action?.payload;
        state.serverError = action?.error?.message;
      });

    builder
      .addCase(registerAction.pending, (state) => {
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        // state.data = [...action.payload?.data, ...state.data];
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
        // state.data = state.data.filter(
        //   (arrow) => arrow.id !== action.payload.id
        // );
        state.appError = undefined;
        state.serverError = undefined;
      })
      .addCase(deleteAction.rejected, (state, action) => {
        state.appError = action?.payload;
        state.serverError = action?.error?.message;
      });
  },
});
export const selectNew = (state) => state?.new;

export default newSlices.reducer;
