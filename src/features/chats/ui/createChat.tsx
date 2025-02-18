import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { useCreateChat } from "../hooks/useCreateChat";

const CreateChat = () => {
  const {
    handleChangeValue,
    handleTogglePanel,
    isVisible,
    createValue,
    errors,
    validateForm,
    setErrors,
    onSubmit,
  } = useCreateChat();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(event);
      setErrors({ phone: "", message: "" });
    }
  };

  return (
    <div className="p-4 border-b border-gray-200 space-y-4">
      <section className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Чаты</h2>
        <button onClick={handleTogglePanel}>
          {isVisible ? (
            <ChevronDown className="cursor-pointer" />
          ) : (
            <ChevronUp className="cursor-pointer" />
          )}
        </button>
      </section>
      {isVisible && (
        <form
          className={`space-y-2 transition-all duration-300`}
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type="text"
              name="phone"
              value={createValue.phone}
              placeholder="Номер телефона"
              className={`w-full p-2 rounded-lg bg-gray-100 border ${
                errors.phone ? "border-red-500" : "border-gray-200"
              } focus:outline-none focus:border-blue-500`}
              onChange={handleChangeValue}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              value={createValue.message}
              name="message"
              placeholder="Сообщение"
              className={`w-full p-2 rounded-lg bg-gray-100 border ${
                errors.message ? "border-red-500" : "border-gray-200"
              } focus:outline-none focus:border-blue-500`}
              onChange={handleChangeValue}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            <Send className="mr-2" />
            Отправить
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateChat;
