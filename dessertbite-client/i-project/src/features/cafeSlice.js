import { createSlice } from "@reduxjs/toolkit";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const initialState = {
  cafes: [],
  isLoading: false,
  errorMsg: "",
};

export const cafeSlice = createSlice({
  name: "cafe",
  initialState,
  reducers: {
    fetchPending(state) {
      state.isLoading = true;
      state.cafes = [];
      state.errorMsg = "";
    },
    fetchSuccess(state, action) {
      state.isLoading = false;
      state.cafes = action.payload;
      state.errorMsg = "";
    },
    fetchReject(state, action) {
      state.isLoading = false;
      state.cafes = [];
      state.errorMsg = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchReject } = cafeSlice.actions;

export const fetchCafesAsync = () => async (dispatch,) => {
  try {
    dispatch(fetchPending());

    // const response = await axios.get(
    //   "https://the-birthday-cake-db.p.rapidapi.com/",
    //   {
    //     headers: {
    //       "x-rapidapi-key":
    //         "2f65806f71msh08642d52c493d1ap15c3adjsn8941a614a5e2",
    //       "x-rapidapi-host": "the-birthday-cake-db.p.rapidapi.com",
    //     },
    //   }
    // );

    dispatch(fetchSuccess(response.data));
  } catch (error) {
    console.log(error.message);

    dispatch(fetchReject(error.message));
  }
};

export default cafeSlice.reducer;
