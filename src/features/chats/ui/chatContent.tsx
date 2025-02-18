import { IContactInfoResponse } from "@/entities/contact/types/types";
import { sendMessage } from "@/entities/message/libs/messageService";
import { useActions } from "@/shared/hooks/useActions";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";

interface IChatContent {
  selectContact: IContactInfoResponse;
}

const ChatContent: FC<IChatContent> = ({ selectContact }) => {
  const { setMessage } = useActions();

  const { mutate: sendMutate } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: sendMessage,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = String(formData.get("message"));
    if (!message) throw new Error("Empty values");
    sendMutate({ chatId: selectContact.chatId, message: message });
    setMessage({ message });
    event.currentTarget.reset();
  };
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-[10px] border-b border-gray-200 flex items-center space-x-3">
        <div className="w-10 h-10 flex items-center justify-center">
          <img src={selectContact?.avatar} className="rounded-full" />
        </div>
        <h2 className="text-xl font-semibold">{selectContact?.name}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col space-y-2">
          {[...selectContact.messages].reverse().map((message) => (
            <div key={message.id} className="w-full flex flex-col space-y-2">
              <div
                key={message.id}
                className={`p-3 rounded-lg max-w-[70%] bg-green-100 self-start`}
              >
                {message.quotedMessage}
              </div>
              <div
                key={message.id}
                className={`p-3 rounded-lg max-w-[70%] bg-green-100 self-end`}
              >
                {message.extendedMessage}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-gray-200">
        <form className="flex space-x-2" onSubmit={onSubmit}>
          <input
            type="text"
            name="message"
            placeholder="Введите сообщение..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContent;
