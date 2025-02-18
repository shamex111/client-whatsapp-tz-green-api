import { useAppSelector } from "@/shared/hooks/useAppSelector";
import ContactCard from "./contactCard";
import { messageSelectors } from "@/entities/message/models/store/messageSlice";

const ContactsList = () => {
  const dialogsUnique = useAppSelector(messageSelectors.dialogsUnique);
  return (
    <div className="flex-1 overflow-y-auto">
      {dialogsUnique.map((dialog) => (
        <ContactCard key={dialog.chatId} dialog={dialog} />
      ))}
    </div>
  );
};

export default ContactsList;
