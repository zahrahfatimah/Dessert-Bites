import { createSlice } from "@reduxjs/toolkit";
import { GoogleGenerativeAI } from "@google/generative-ai";

const initialState = {
  cafes: [],
  loading: false,
  error: "",
};

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_CLIENT_ID);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const cafeSlice = createSlice({
  name: "cafe",
  initialState,
  reducers: {
    fetchPending(state) {
      state.loading = true;
      state.cafes = [];
      state.error = "";
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.cafes = action.payload;
      state.error = "";
    },
    fetchReject(state, action) {
      state.loading = false;
      state.cafes = [];
      state.error = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchReject } = cafeSlice.actions;
const validateCafesData = (data) => {
  return (
    Array.isArray(data) &&
    data.every(
      (cafe) =>
        typeof cafe.cafe_name === "string" &&
        typeof cafe.cheesecake_type === "string"
    )
  );
};

export const fetchCafesAsync = (menuItem) => async (dispatch) => {
  try {
    dispatch(fetchPending());

    const response = await model.generate({
      prompt: `Berikan saya beberapa nama kafe di Jakarta yang menjual ${menuItem} dalam format JSON seperti ini: [
              {
                "cafe_name": "Nama Kafe",
                "link_location": "link melihat lokasi nya"
              }
            ]`,
    });

    if (response && response.data) {
      const cafes = JSON.parse(response.data);
      if (validateCafesData(cafes)) {
        dispatch(fetchSuccess(cafes));
      } else {
        throw new Error("Data format is invalid");
      }
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    dispatch(fetchReject(error.message));
  }
};

export default cafeSlice.reducer;
