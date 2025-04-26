"use client";

import Page from "@/components/templates/MainLayout/MainLayout";
import { useContext, useEffect, useState } from "react";
import { useVerifyProfileQuery } from "@/redux/service/authApi";
import ProjectsSection from "./sections/ProjectsSection";
import TechnologiesSection from "./sections/TechnologiesSection";
import { useRouter } from "next/navigation";
import LanguageContext, { LanguageContextType } from "@/context/LanguageContext";
import style from "./page.module.css";

const DashboardPage: React.FC = () => {
  const { data: verify, isLoading, error } = useVerifyProfileQuery(null);
  // const searchParams = useSearchParams();
  const router = useRouter();
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  console.log(verify);
  console.warn(error);

  useEffect(() => {
    // console.log(verify, error)
    if (verify?.authenticated === false || error) {
      router.push("/auth");
    }
  }, [isLoading===false]);

  const [collection, setCollection] = useState<string>("projects");

  // useEffect(() => {
  //   const initialCollection = searchParams.get("collection");
  //   if (initialCollection) {
  //     setCollection(initialCollection);
  //   }
  // }, [searchParams]);

  const handleChange = (value: string) => {
    setCollection(value);
    router.push(`?collection=${value}`);
  };

  const controlPanel = () => {
    return (
      <div className={style['dashboard-container']}>
          <form className={style['dashboard-form']}>
            <label htmlFor="collection">{isSpanish ? 'Seleccionar colección' : 'Select collection'}:</label>
            <select
              id="collection"
              name="collection"
              value={collection}
              onChange={(e) => handleChange(e.target.value)}
            >
              <option value="projects">{isSpanish ? 'Proyectos' : 'Projects'}</option>
              <option value="technologies">{isSpanish ? 'Tecnologías' : 'Technologies'}</option>
            </select>
          </form>
        </div>
    )
  }

  return (
    <Page controlPanel={controlPanel()} isAdmin={true}>
      {/* <div className={style['dashboard-container']}>
        <form className={style['dashboard-form']}>
          <label htmlFor="collection">{isSpanish ? 'Seleccionar colección' : 'Select collection'}:</label>
          <select
            id="collection"
            name="collection"
            value={collection}
            onChange={(e) => handleChange(e.target.value)}
          >
            <option value="projects">{isSpanish ? 'Proyectos' : 'Projects'}</option>
            <option value="technologies">{isSpanish ? 'Tecnologías' : 'Technologies'}</option>
          </select>
        </form>
        <button onClick={handlerLogout}>{isSpanish ? 'Cerrar sesión' : 'Logout'}</button>
      </div> */}

      {collection === "projects" && (<ProjectsSection />)}
      {collection === "technologies" && (<TechnologiesSection />)}
    </Page>
  );
};

export default DashboardPage;
