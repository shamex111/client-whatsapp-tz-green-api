import { IContactInfoResponse } from "@/entities/contact/types/types";
import { ERouteNames } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IContactCard {
  dialog: IContactInfoResponse;
}
const ContactCard: FC<IContactCard> = ({ dialog }) => {
  const { setSelectContact } = useActions();
  const navigate = useNavigate();

  const handleSelectContact = () => {
    setSelectContact(dialog);
    navigate(`${ERouteNames.CHAT_ROUTE}/${dialog.chatId}`, { replace: true });
  };

  return (
    <div
      className="p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center space-x-3"
      onClick={handleSelectContact}
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <img src={dialog.avatar} className="rounded-full" />
      </div>
      <div>
        <p className="text-gray-800 font-medium">{dialog.name}</p>
        <p className="text-sm text-gray-500">{dialog.lastMessage}</p>
      </div>
    </div>
  );
};

export default ContactCard;
