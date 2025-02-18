import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const { onSubmitForm } = useLogin();
  return (
    <form
      className=" flex flex-col space-y-4 rounded-xl w-[500px] p-5 py-7 bg-blue-300"
      onSubmit={onSubmitForm}
    >
      <div className="flex justify-center items-center space-x-3">
        <h1 className="text-center text-white text-3xl font-bold">Войти</h1>
      </div>

      <section className=" flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="font-light uppercase text-xs text-white">
            ID Instance
          </label>
          <section className="space-y-1">
            <input
              type="text"
              name="id"
              placeholder="ID Instance"
              className={`w-full p-2 rounded-lg bg-gray-100 border border-gray-200" focus:outline-none focus:border-blue-500`}
            />
          </section>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-light uppercase text-xs text-white">
            apiTokenInstance
          </label>
          <section className="space-y-1">
            <input
              type="text"
              name="token"
              placeholder="apiTokenInstance"
              className={`w-full p-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-500`}
            />
          </section>
        </div>
      </section>
      <button
        type="submit"
        className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Отправить
      </button>
    </form>
  );
};

export default LoginForm;
