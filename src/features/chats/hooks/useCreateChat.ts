import { checkWhatsapp } from "@/entities/chats/libs/chatService";
import { sendMessage } from "@/entities/message/libs/messageService";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

export const useCreateChat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({ phone: "", message: "" });

  const [createValue, setCreateValue] = useState({
    phone: "",
    message: "",
  });
  const { mutate: sendMutate } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: sendMessage,
    onSettled: () => {
      setCreateValue((prev) => ({ ...prev, message: "", phone: "" }));
    },
  });

  const { mutate: checkMutate } = useMutation({
    mutationKey: ["checkWhatsapp"],
    mutationFn: checkWhatsapp,
    onSuccess: (data) => {
      if (data?.existsWhatsapp) {
        sendMutate({
          chatId: `${createValue.phone}@c.us`,
          message: createValue.message,
        });
      }
    },
  });

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setCreateValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    checkMutate({ phoneNumber: createValue.phone });
  };

  const handleTogglePanel = () => setIsVisible((prev) => !prev);

  const validateForm = () => {
    let valid = true;
    const newErrors = { phone: "", message: "" };

    if (!createValue.phone) {
      newErrors.phone = "Номер телефона не может быть пустым.";
      valid = false;
    }

    if (!createValue.message) {
      newErrors.message = "Сообщение не может быть пустым.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return {
    isVisible,
    errors,
    createValue,
    validateForm,
    setErrors,
    onSubmit,
    handleChangeValue,
    handleTogglePanel,
  };
};
