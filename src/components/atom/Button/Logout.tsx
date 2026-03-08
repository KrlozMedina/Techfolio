import React from "react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

import { useLogoutMutation } from "@/infrastructure/auth/auth.api";
import { Button } from "./Button";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * =========================================================
 * Logout
 * ---------------------------------------------------------
 * Componente encargado de cerrar la sesión del usuario.
 *
 * Responsabilidades:
 * - Ejecutar la mutación de logout vía RTK Query.
 * - Redirigir al usuario a la ruta "/login" si es exitoso.
 * - Manejar errores básicos en consola.
 * - Integrar internacionalización mediante hook de traducción.
 *
 * Arquitectura:
 * - No recibe props (idioma ahora se obtiene desde useTranslation).
 * - Depende de infraestructura de autenticación.
 * - Utiliza componente base Button para consistencia visual.
 *
 * Es un Client Component porque:
 * - Usa hooks (useRouter, useLogoutMutation, useTranslation).
 * - Maneja interacción del usuario.
 * =========================================================
 */
const Logout: React.FC = () => {

  /**
   * Mutación de RTK Query para ejecutar el logout.
   * Devuelve una función que dispara la petición.
   */
  const [logout] = useLogoutMutation();

  /**
   * Router de Next.js para navegación programática.
   */
  const router = useRouter();

  /**
   * Hook de traducción.
   * Provee textos según idioma activo.
   */
  const { t } = useTranslation();

  /**
   * handleLogout
   * ---------------------------------------------------------
   * Flujo:
   * 1. Ejecuta la mutación de logout.
   * 2. Si la respuesta es exitosa → redirige a /login.
   * 3. Si falla → registra advertencia en consola.
   * 4. Captura errores inesperados.
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
    <Button
      variant="ghost" // Variante minimalista para acciones tipo icon-only
      size="md"
      onClick={handleLogout}
      aria-label={t.common.label.logout}
      title={t.common.label.logout}
    >
      <FiLogOut size={20} />
    </Button>
  );
};

export default Logout;