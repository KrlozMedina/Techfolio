'use client';

import Page from '@/components/templates/Page';
import { useEffect, useState } from 'react';
import '@/styles/pages/Register.css'
import { TextInput } from '@/components/atom/Form';
import Modal from "@/components/organisms/Modal";
import { useGetProjectsQuery, useVerifyProfileQuery } from '@/redux/service/projectsApi';
import { ITechnology } from '@/model/Technology';
import { IProject } from '@/model/Project';

interface ErrorTry {
  status: number
}

export default function Home() {
  const {data: verify} = useVerifyProfileQuery(null);
  // const { msg } = verify;
  // console.log(verify)
  if (verify === false) {
    location.replace('/login')
  }




  const categories = [
    'Frontend',
    'Backend',
    'Full Stack',
    'Database',
    'DevOps',
    'Mobile Development',
    'Testing',
    'Cloud & Infrastructure',
    'Machine Learning & AI',
    'Data Analysis & Big Data',
    'Cybersecurity',
    'Game Development',
    'AR/VR',
    'IoT (Internet of Things)',
    'Blockchain',
    'Other'
  ];
  const projectType = ['Web Applications', 'Desktop Applications', 'Mobile Applications', 'API Development', 'Data Science and Machine Learning Projects', 'DevOps and Automation', 'Game Development', 'IoT Projects', 'Educational Projects', 'Creative or Digital Art Projects', 'Open Source Projects', 'Business Applications', 'Cybersecurity Projects', 'Other Projects'];
  const [collection, setCollection] = useState<string>('projects');
  const [technologies, setTechnologies] = useState<ITechnology[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<IProject[]>([])
  const [showModal, setShowModal] = useState(false);

  const [projectData, setProjectData] = useState({
    title: '',
    slug: '',
    description: '',
    technologies: [''],
    repositoryUrl: '',
    liveUrl: '',
    imageUrl: '',
    category: [''],
    role: '',
    teamSize: 0,
    duration: '',
    priority: 0,
    projectType: projectType[0]
  })
  const [technologyData, setTechnologyData] = useState({
    name: '',
    category: categories[0],
    logoUrl: ''
  })

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data } = useGetProjectsQuery(null)
  console.log('data', data)

  useEffect(() => {
    fetch('/api/v1/technologies')
      .then(res => res.json())
      .then(data => setTechnologies(data))

    fetch('/api/v1/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
  }, [collection === 'projects'])

  const setTitleAndSlug = (title: string) => {
    setProjectData(prev => ({ ...prev, title }));
    setProjectData(prev => ({ ...prev, slug: title.replaceAll(' ', '-').toLowerCase() }))
  }

  const handleTechnologiesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const listCategory: string[] = []
    const listTechnology = Array.from(event.target.selectedOptions, (option) => option.value)

    listTechnology.forEach((name) => {
      const tech = technologies.find((tech) => tech.name === name);
      if (tech && !listCategory.includes(tech.category)) {
        listCategory.push(tech.category);
      }
    });

    setProjectData(prev => ({ ...prev, technologies: listTechnology, category: listCategory }));
  }

  const fetchData = async (endPoint: string, body: object) => {
    try {
      const res = await fetch(`/api/v1/${endPoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw {
        message: new Error(`Error ${res.status}: ${res.statusText}`),
        status: res.status
      };
      return res;
    } catch (error) {
      throw error;
    }
  };

  const postProject = async () => {
    setIsLoading(true)
    try {
      await fetchData('projects', projectData);
      setSuccessMessage('Proyecto agregado exitosamente');
      setError(null)
    } catch (err) {
      const e = err as ErrorTry;
      switch (e.status) {
        case 500:
          setError('Error al conectar con el servidor');
          break;
        default:
          setError('Error al agregar el proyecto');
          console.log(e)
          break;
      }
      setSuccessMessage(null)
    } finally {
      setIsLoading(false)
    }
  }

  const postTechnology = async () => {
    try {
      await fetchData('technologies', technologyData)
      setSuccessMessage('Tecnología agregada exitosamente.');
      setError(null);
    } catch (err) {
      const e = err as ErrorTry;
      switch (e.status) {
        case 409:
          setError(`Ya existe una tecnología con el nombre "${technologyData.name}".`);
          break;
        case 500:
          setError('Error al conectar con el servidor');
          break;
        default:
          setError('Error al agregar tecnología.');
          console.error(e)
          break;
      }
      setSuccessMessage(null);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await fetch(`/api/v1/projects?projectId=${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => res.json())
      .then(data => console.log(data))

      window.location.reload();
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTechnology = async (id: string) => {
    try {
      await fetch(`/api/v1/technologies?technologyId=${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => res.json())
      .then(data => console.log(data))

      window.location.reload();
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Page>
      <div>
        <label htmlFor="collection">Seleccionar colección:</label>
        <select
          id="collection"
          name="collection"
          value={collection}
          onChange={(event) => {
            setCollection(event.target.value);
            setSuccessMessage(null);
            setError(null)
          }}
        >
          <option value="projects">Proyectos</option>
          {/* <option value="certificates">Certificados</option> */}
          <option value="technologies">Tecnologías</option>
        </select>
      </div>

      {collection === 'projects' && (
        <>
          <div>
            <button onClick={() => setShowModal(true)}>Agregar proyecto</button>
            {showModal &&
              <Modal onClose={() => setShowModal(false)}>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    postProject();
                  }}
                >
                  <fieldset>
                    <legend>Agregar proyecto</legend>

                    <TextInput
                      label='Titulo:'
                      value={projectData.title}
                      onChange={(e) => setTitleAndSlug(e.target.value)}
                      id='title'
                      type='text'
                      required
                    />

                    <div>
                      <label htmlFor="description">Descripción:</label>
                      <textarea
                        name="description"
                        id="descriptionProject"
                        rows={5}
                        onChange={e => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="technologies">Tecnologías:</label>
                      <select
                        multiple
                        name="technologies"
                        id="technologiesProject"
                        onChange={e => handleTechnologiesChange(e)}
                        required
                      >
                        {
                          technologies.map((tech, index) => (
                            <option key={index} value={tech.name}>{tech.name}</option>
                          ))
                        }
                      </select>
                    </div>

                    <TextInput
                      label='URL del repositorio:'
                      value={projectData.repositoryUrl}
                      onChange={(e) => setProjectData(prev => ({ ...prev, repositoryUrl: e.target.value }))}
                      id='repositoryUrl'
                      type='url'
                      required
                    />

                    <TextInput
                      label='URL del proyecto en vivo:'
                      value={projectData.liveUrl}
                      onChange={(e) => setProjectData(prev => ({ ...prev, liveUrl: e.target.value }))}
                      id='liveUrl'
                      type='url'
                      required
                    />

                    <TextInput
                      label='URL de la imagen:'
                      value={projectData.imageUrl}
                      onChange={(e) => setProjectData(prev => ({ ...prev, imageUrl: e.target.value }))}
                      id='imageUrl'
                      type='url'
                      required
                    />

                    <TextInput
                      label='Role en el proyecto:'
                      value={projectData.role}
                      onChange={(e) => setProjectData(prev => ({ ...prev, role: e.target.value }))}
                      id='role'
                      type='text'
                    />

                    <TextInput
                      label='Tamaño del equipo:'
                      value={projectData.teamSize}
                      onChange={(e) => setProjectData(prev => ({ ...prev, teamSize: parseInt(e.target.value) }))}
                      id='teamSize'
                      type='number'
                      min={0}
                    />

                    <TextInput
                      label='Duración del proyecto:'
                      value={projectData.duration}
                      onChange={(e) => setProjectData(prev => ({ ...prev, duration: e.target.value }))}
                      id='duration'
                      type='text'
                    />

                    <TextInput
                      label='Prioridad del proyecto:'
                      value={projectData.priority}
                      onChange={(e) => setProjectData(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
                      id='priority'
                      type='number'
                      min={0}
                      max={10}
                      required
                    />

                    <div>
                      <label htmlFor="projectType">Tipo de proyecto:</label>
                      <select
                        name="projectType"
                        id="projectTypeProject"
                        onChange={e => setProjectData(prev => ({ ...prev, projectType: e.target.value }))}
                        required
                      >
                        {
                          projectType.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                          ))
                        }
                      </select>
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                    <button type='submit' disabled={isLoading}>{isLoading ? 'Enviando' : 'Enviar'}</button>
                  </fieldset>
                </form>
              </Modal>
            }
          </div>

          <div className='project-list'>
            {projects.map((project, index) => (
              <div className="project-card" key={index}>
                <img src={project.imageUrl} alt={`${project.title} screenshot`} className="project-card__image" />
                <h2 className="project-card__title">{project.title}</h2>
                <p className="project-card__description">{project.description}</p>
                <p className="project-card__category"><strong>Categoría:</strong> {project.category.join(', ')}</p>
                <p className="project-card__role"><strong>Rol:</strong> {project.role}</p>
                <p className="project-card__duration"><strong>Duración:</strong> {project.duration}</p>
                <p className="project-card__team-size"><strong>Tamaño del equipo:</strong> {project.teamSize}</p>
                <p className="project-card__priority"><strong>Prioridad:</strong> {project.priority}</p>
                <p className="project-card__type"><strong>Tipo:</strong> {project.projectType}</p>
                <p className="project-card__technologies">
                  <strong>Tecnologías:</strong> {project.technologies.join(', ')}
                </p>
                <div className="project-card__links">
                  <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">Repositorio</a>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Demo en Vivo</a>
                </div>
                <div onClick={() => deleteProject(project['_id'])}>
                  <button>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {collection === 'technologies' && (
        <>
          <button onClick={() => setShowModal(true)}>Agregar tecnología</button>
          {showModal &&
            <Modal onClose={() => setShowModal(false)}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  postTechnology();
                }}
              >
                <fieldset>
                  <legend>Agregar tecnología</legend>

                  <TextInput
                    label='Nombre:'
                    value={technologyData.name}
                    onChange={(e) => setTechnologyData(prev => ({ ...prev, name: e.target.value }))}
                    id='name'
                    type='text'
                    required
                  />

                  <div>
                    <label htmlFor="category">Categoría:</label>
                    <select
                      id="category"
                      name="category"
                      value={technologyData.category}
                      onChange={(event) => setTechnologyData(prev => ({ ...prev, category: event.target.value }))}
                    >
                      {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <TextInput
                    label='URL del logo:'
                    value={technologyData.logoUrl}
                    onChange={(e) => setTechnologyData(prev => ({ ...prev, logoUrl: e.target.value }))}
                    id='logoUrl'
                    type='url'
                  />

                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                  <div>
                    <button type="submit" disabled={isLoading}>{isLoading ? 'Enviando' : 'Enviar'}</button>
                  </div>
                </fieldset>
              </form>
            </Modal>
          }

          <div className='technology-list'>
            {technologies.map((technology, index) => (
              <div className="technology-card" key={index}>
                <img src={technology.logoUrl} alt={`${technology.name} logo`} className="technology-card__logo" />
                <h3 className="technology-card__name">{technology.name}</h3>
                <p className="technology-card__category">{technology.category}</p>
                <div onClick={() => deleteTechnology(technology['_id'])}>
                  <button>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Page>
  );
}
