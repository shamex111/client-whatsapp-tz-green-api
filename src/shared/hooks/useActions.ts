import { contactsActions } from "@/entities/contact/models/store/contactsSlice";
import { messageActions } from "@/entities/message/models/store/messageSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    { ...messageActions, ...contactsActions },
    dispatch
  );
};
