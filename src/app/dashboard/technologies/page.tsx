'use client';

import { CrudLayout } from '@/components/templates/CrudLayout/CrudLayout';
// import {
//   useGetTechnologiesQuery,
//   useDeleteTechnologyMutation,
// } from '@/store/service/technologyApi';
import { ITechnology } from '@/models/technology/technology.interface';
import { TechnologyForm } from './TechnologyForm/TechnologyForm';
import { ExperienceLevel } from '@/shared/enums/experience-level.enum';
import { useDeleteTechnologyMutation, useGetTechnologiesQuery } from '@/infrastructure/technology/technologies.api';

export default function TechnologiesPage() {
  return (
    <CrudLayout<ITechnology>
      title="Technologies"
      useQueryHook={useGetTechnologiesQuery}
      useDeleteHook={useDeleteTechnologyMutation}
      FormComponent={TechnologyForm}
      renderCard={(tech, onEdit, onDelete) => (
        <div key={tech._id.toString()} className="card">
          {tech.iconUrl && (
            <img
              src={tech.iconUrl}
              alt={tech.name}
              style={{ width: 40, height: 40 }}
            />
          )}

          <h3>{tech.name}</h3>
          <p>{tech.experienceLevel}</p>

          <div className="actions">
            <button onClick={() => onEdit(tech)}>
              ✏️ Editar
            </button>
            <button onClick={() => onDelete(tech._id.toString())}>
              🗑 Eliminar
            </button>
          </div>
        </div>
      )}
      renderFilters={(setExtraParams, extraParams) => (
        <>
          {/* EXPERIENCE FILTER */}
          <button
            className={!extraParams.experienceLevel ? 'active' : ''}
            onClick={() =>
              setExtraParams((prev) => ({
                ...prev,
                experienceLevel: undefined,
              }))
            }
          >
            Todos los niveles
          </button>

          {Object.values(ExperienceLevel).map((level) => (
            <button
              key={level}
              className={
                extraParams.experienceLevel === level ? 'active' : ''
              }
              onClick={() =>
                setExtraParams((prev) => ({
                  ...prev,
                  experienceLevel: level,
                }))
              }
            >
              {level}
            </button>
          ))}
        </>
      )}
    />
  );
}
