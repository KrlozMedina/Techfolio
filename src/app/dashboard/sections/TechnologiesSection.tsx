import React, { useContext, useEffect, useState } from "react";
import Modal from "@/components/organisms/Modal/Modal";
import { TextInput } from "@/components/atom/Form/FormElements";
import { CATEGORIES } from "@/types/constants";
import { useCreateTechnologyMutation, useDeleteTechnologyMutation, useGetTechnologiesQuery } from "@/redux/service/technologiesApi";
import { ErrorResponse, ITechnology } from "@/types/common";
import LanguageContext, { LanguageContextType } from "@/context/LanguageContext";
import style from '../page.module.css';
import Image from "next/image";

const TechnologiesSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [technologies, setTechnologies] = useState<ITechnology[]>([]);
  const { data, refetch } = useGetTechnologiesQuery(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [createTechnology, { isLoading, isError }] = useCreateTechnologyMutation();
  const [deleteTech] = useDeleteTechnologyMutation();
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  const [technologyData, setTechnologyData] = useState({
      name: "",
      category: CATEGORIES[0],
      logoUrl: "",
  });

  useEffect(() => {
    if (data) {
        setTechnologies(data)
    }
  }, [data]);

  const postTechnology = async () => {
    try {
      setErrorMessage(null);
      await createTechnology(technologyData).unwrap();
      setShowModal(false);
      setTechnologyData({
        name: '',
        category: CATEGORIES[0],
        logoUrl: ''
      })
      refetch()
    } catch (err) {
      const dataError = err as ErrorResponse;
      setErrorMessage(dataError.data?.error || 'Unknown error');
    }
  };
  
  const deleteTechnology = async (id: string) => {
    try {
      await deleteTech(id)
      refetch()
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <>
    <div>
      <button onClick={() => setShowModal(true)}>
        {isSpanish ? 'Agregar tecnología' : 'Add technology'}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              postTechnology();
            }}
            className={style['modal__form']}
          >
            <fieldset className={style['modal__fieldset']}>
              <legend className={style['modal__legend']}>{isSpanish ? 'Agregar tecnología' : 'Add technology'}</legend>

              <TextInput
                label={isSpanish ? 'Nombre de la tecnología:' : 'Technology name:'}
                value={technologyData.name}
                onChange={(e) =>
                  setTechnologyData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                id="name"
                type="text"
                required
              />

              <div>
                <label htmlFor="category">{isSpanish ? 'Categoría' : 'Category'}:</label>
                <select
                  id="category"
                  name="category"
                  value={technologyData.category}
                  onChange={(event) =>
                    setTechnologyData((prev) => ({
                      ...prev,
                      category: event.target.value,
                    }))
                  }
                >
                  {CATEGORIES.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <TextInput
                label={isSpanish ? "URL del logo:" : 'Logo URL'}
                value={technologyData.logoUrl}
                onChange={(e) =>
                  setTechnologyData((prev) => ({
                    ...prev,
                    logoUrl: e.target.value,
                  }))
                }
                id="logoUrl"
                type="url"
              />

              {isError && <p style={{ color: "red" }}>{errorMessage}</p>}

              <div>
                <button type="submit" disabled={isLoading}>
                  {
                    isLoading 
                    ? isSpanish ? "Enviando" : 'Sending'
                    : isSpanish ? "Enviar" : 'Send'
                  }
                </button>
              </div>
            </fieldset>
          </form>
        </Modal>
      )}
    </div>

      <div className={style["technology__list"]}>
        {technologies.map((technology, index) => (
          <div className={style["technology__card"]} key={index}>
            <Image
              src={technology.logoUrl || ''}
              width={200}
              height={300}
              alt={`${technology.name} logo`}
              className={style["technology__card-logo"]}
            />
            <h3 className={style["technology__card-name"]}>{technology.name}</h3>
            <p className={style["technology__card-category"]}>{technology.category}</p>
            <div onClick={() => deleteTechnology(technology["_id"])}>
              <button>{isSpanish ? 'Eliminar' : 'Delete'}</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TechnologiesSection;
