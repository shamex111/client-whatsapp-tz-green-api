import {
  asyncThunkCreator,
  buildCreateSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { rootReducer } from "@/shared/store/store";
import { IContactState } from "./types";
import { IContactInfoResponse } from "../../types/types";
import { IAuthResponse } from "@/entities/auth/types/types";

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState: IContactState = {
  selectContact: null,
  currentContact: null,
};

export const contactsSlice = createSliceWithThunks({
  name: "contactsSlice",
  initialState,
  selectors: {
    selectContact: (state) => state.selectContact,
    currentContact: (state) => state.currentContact,
  },
  reducers: (create) => ({
    setCurrentContact: create.reducer(
      (state, { payload }: PayloadAction<IAuthResponse>) => {
        state.currentContact = payload;
      }
    ),
    setSelectContact: create.reducer(
      (state, { payload }: PayloadAction<IContactInfoResponse>) => {
        state.selectContact = payload;
      }
    ),
    setMessage: create.reducer(
      (state, { payload }: PayloadAction<{ message: string }>) => {
        state.selectContact?.messages.unshift({
          id: Math.round(Date.now()),
          extendedMessage: payload.message,
          quotedMessage: "",
        });
      }
    ),
  }),
}).injectInto(rootReducer);

export const contactsActions = contactsSlice.actions;
export const contactsSelectors = contactsSlice.selectors;
