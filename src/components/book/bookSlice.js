import { createSlice } from "@reduxjs/toolkit";
import api from "../../apiService.js";
import { toast } from "react-toastify";

const initialState = {
  books: [],
  readingList: [],
  bookDetail: null,
  status: null,
  isLoading: false,
  error: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getBooksSuccess(state, action) {
      state.isLoading = false;
      state.books = action.payload;
    },

    addFavoriteSuccess(state, action) {
      state.isLoading = false;
      state.readingList.push(action.payload);
    },
    getFavoriteListSuccess(state, action) {
      state.isLoading = false;
      state.readingList = action.payload;
    },
    getBookDetailsSuccess(state, action) {
      state.isLoading = false;
      state.bookDetail = action.payload;
    },
    removeBookFavoriteSuccess(state, action) {
      state.isLoading = false;
    },
  },
});

export default bookSlice.reducer;

export const getBooks =
  ({ page, limit = 10, query }) =>
  async (dispatch) => {
    dispatch(bookSlice.actions.startLoading());
    try {
      let params = `?_page=${page}&_limit=${limit}`;
      if (query) params += `&q=${query}`;
      const response = await api.get(`/books${params}`);
      dispatch(bookSlice.actions.getBooksSuccess(response.data));
    } catch (error) {
      dispatch(bookSlice.actions.hasError(error.message));
    }
  };

export const addFavorite =
  ({ book }) =>
  async (dispatch) => {
    dispatch(bookSlice.actions.startLoading());
    try {
      const response = await api.post(`/favorites`, book);
      dispatch(bookSlice.actions.addFavoriteSuccess(response.data));
      toast.success("The book has been added to the reading list!");
    } catch (error) {
      dispatch(bookSlice.actions.hasError("Have an error"));
    }
  };

export const getFavoriteList = () => async (dispatch) => {
  dispatch(bookSlice.actions.startLoading());
  try {
    const response = await api.get(`/favorites`);
    dispatch(bookSlice.actions.getFavoriteListSuccess(response.data));
  } catch (error) {
    dispatch(bookSlice.actions.hasError("Have an error"));
  }
};

export const removeBookFavorite =
  ({ removeBookId, book }) =>
  async (dispatch) => {
    dispatch(bookSlice.actions.startLoading());
    try {
      await api.delete(`/favorites/${removeBookId}`);
      dispatch(bookSlice.actions.removeBookFavoriteSuccess(book));
      dispatch(getFavoriteList());
      toast.success("The book has been removed");
    } catch (error) {
      dispatch(bookSlice.actions.hasError("Have an error"));
    }
  };

export const getBookDetails =
  ({ bookId }) =>
  async (dispatch) => {
    dispatch(bookSlice.actions.startLoading());
    try {
      const response = await api.get(`/books/${bookId}`);
      dispatch(bookSlice.actions.getBookDetailsSuccess(response.data));
    } catch (error) {
      dispatch(bookSlice.actions.hasError("Have an error"));
    }
  };
