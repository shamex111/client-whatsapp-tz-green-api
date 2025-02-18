import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { IMessageState } from "./types";
import { rootReducer } from "@/shared/store/store";
import { IAllMessageResponse } from "../../types/types";
import { getAllMessages } from "../../libs/messageService";
import { getContactInfo } from "@/entities/contact/libs/contactService";
import { IContactInfoResponse } from "@/entities/contact/types/types";

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState: IMessageState = {
  allMessages: [],
  dialogsUnique: [],
};

export const messageSlice = createSliceWithThunks({
  name: "messageSlice",
  initialState,
  selectors: {
    allMessages: (state) => state.allMessages,
    dialogsUnique: (state) => state.dialogsUnique,
  },
  reducers: (create) => ({
    setAllAsyncMessages: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const data = await getAllMessages({ minutes: 20160 });
          const uniqueDialog = data.reduce((acc, item) => {
            if (!acc.find((el) => el.chatId === item.chatId)) {
              acc.push(item);
            }
            return acc;
          }, [] as Array<IAllMessageResponse>);

          const allDialog = await Promise.all(
            uniqueDialog.map(async (el) => {
              return await getContactInfo({ chatId: el.chatId });
            })
          );

          return {
            allMessage: data,
            allDialog: allDialog.map((dial) => ({
              ...dial,
              lastMessage:
                uniqueDialog.find((el) => el.chatId === dial.chatId)
                  ?.extendedTextMessage?.text ?? "",
              messages: data
                .filter((el) => el.chatId === dial.chatId)
                .reduce((acc: IContactInfoResponse["messages"], el, ids) => {
                  console.log(el);
                  const message = {
                    id: ids + 1,
                    quotedMessage: el?.quotedMessage?.textMessage ?? "",
                    extendedMessage:
                      el?.extendedTextMessage?.text ?? el?.textMessage ?? "",
                  };
                  acc.push(message);
                  return acc;
                }, [] as IContactInfoResponse["messages"]),
            })),
          };
        } catch (e) {
          return rejectWithValue(String(e));
        }
      },
      {
        fulfilled: (state, { payload }) => {
          console.log(payload, "payload");
          state.allMessages = payload.allMessage;
          state.dialogsUnique = payload.allDialog;
        },
        rejected: (state, { payload }) => {
          console.log(payload, "error");
        },
      }
    ),
  }),
}).injectInto(rootReducer);

export const messageActions = messageSlice.actions;
export const messageSelectors = messageSlice.selectors;
