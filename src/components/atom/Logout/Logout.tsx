import React from "react";
import { useLogoutMutation } from "@/store/service/authApi";
import { useRouter } from "next/navigation";

interface LogoutProps {
  language: 'es' | 'en'
}

const text = {
  es: 'Cerrar sesión',
  en: 'Logout'
}

const Logout: React.FC<LogoutProps> = ({
  language
}) => {
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const handlerLogout = async () => {
      const { data: logoutSuccess, error } = await logout(null);
      if (logoutSuccess) {
        router.push('/auth')
      } else {
        console.warn(error);
      }
    };

  return (
    <button onClick={handlerLogout}>
      {text[language]}
    </button>
  );
};

export default Logout;
