import React, { useContext } from "react";
import LanguageContext, { LanguageContextType } from "@/redux/context/LanguageContext";
import { useLogoutMutation } from "@/redux/service/authApi";
import { useRouter } from "next/navigation";

const Logout = () => {
  const { isSpanish} = useContext(LanguageContext) as LanguageContextType;
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const handlerLogout = async () => {
      const { data: logoutSuccess, error } = await logout(null);
      if (logoutSuccess) {
        router.push('/auth/login')
      } else {
        console.warn(error);
      }
    };

  return (
    <button onClick={handlerLogout}>
      {isSpanish ? "Cerrar sesión" : "Logout"}
    </button>
  );
};

export default Logout;
