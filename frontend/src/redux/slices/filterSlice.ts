import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../../types";

interface CommentModalState {
  open: boolean;
  modalType: number;
}

const initialState: CommentModalState = {
  open: false,
  modalType: -1,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openCommentModal: (state, action: PayloadAction<CommentModalState>) => {
      state.open = action.payload.open;
      state.modalType = action.payload.modalType;
    },
    clearModal: () => initialState,
  },
});

export const { openCommentModal, clearModal } = modalSlice.actions;
export default modalSlice.reducer;
