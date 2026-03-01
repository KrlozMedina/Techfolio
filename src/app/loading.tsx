'use client';

/**
 * ==================================================
 * ⏳ Loading Screen
 * --------------------------------------------------
 * Componente de estado de carga.
 *
 * Responsabilidades:
 * - Mostrar feedback visual mientras se cargan datos.
 * - Reutilizar StatusTemplate como layout base.
 * - Renderizar Spinner como indicador animado.
 *
 * No contiene:
 * - Lógica de negocio
 * - Fetch
 * - Manejo de estado
 *
 * Nota:
 * Se marca como "use client" porque Spinner
 * probablemente usa animaciones o efectos del lado del cliente.
 * ==================================================
 */

import Spinner from '@/components/atom/feedback/Spinner';
import StatusTemplate from '@/components/templates/StatusTemplate/StatusTemplate';

export default function Loading() {
  return (
    <StatusTemplate status="loading" withBackground>
      <Spinner />
    </StatusTemplate>
  );
}