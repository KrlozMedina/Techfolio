import React from "react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

import { useLogoutMutation } from "@/store/service/authApi";

interface logoutProps {
  lang: 'es' | 'en';
}

// Textos internacionalizados para el botón
const texts = {
  title: {
    es: "Cerrar sesión",
    en: "Log out",
  },
};

/**
 * Componente Logout
 *
 * Representa un botón para cerrar sesión. Al hacer clic, ejecuta una mutación
 * que cierra la sesión del usuario y redirige a la página de login.
 */
const Logout: React.FC<logoutProps> = ({ lang }) => {
  const [logout] = useLogoutMutation(); // Hook de RTK Query para logout
  const router = useRouter();

  /**
   * Maneja la acción de cierre de sesión.
   * Ejecuta la mutación y redirige al usuario si es exitosa.
   */
  const handleLogout = async () => {
    try {
      const { data: logoutSuccess, error } = await logout(null);

      if (logoutSuccess) {
        router.push("/login");
      } else {
        console.warn("Logout error:", error);
      }
    } catch (err) {
      console.error("Unexpected logout error:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      aria-label={texts.title[lang]}
      title={texts.title[lang]}
    >
      <FiLogOut size={20} />
    </button>
  );
};

export default Logout;
