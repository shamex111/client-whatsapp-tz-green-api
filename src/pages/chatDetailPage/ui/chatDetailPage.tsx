import { contactsSelectors } from "@/entities/contact/models/store/contactsSlice";
import ChatContent from "@/features/chats/ui/chatContent";
import { ERouteNames } from "@/shared";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatDetailPage = () => {
  const selectContact = useAppSelector(contactsSelectors.selectContact);
  const navigate = useNavigate();
  console.log(selectContact);

  useEffect(() => {
    if (!selectContact) {
      navigate(ERouteNames.CHAT_ROUTE);
    }
  }, []);
  console.log(selectContact?.messages);
  return selectContact ? (
    <ChatContent selectContact={selectContact} />
  ) : (
    <div className="flex items-center justify-center h-full">
      <Loader className="animate-spin text-green-600" />
    </div>
  );
};

export default ChatDetailPage;
