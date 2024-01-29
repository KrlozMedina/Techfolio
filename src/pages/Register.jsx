import React, { useContext, useEffect, useState } from 'react'
import Page from '../components/templates/Page'
import LanguageContext from '../context/LanguageContext'
import axios from 'axios'
import Modal from 'react-modal';

const API = "https://api-production-85f8.up.railway.app/"
let subtitle;
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        },
    };

document.title = "Registry"
Modal.setAppElement('#root');

const Register = () => {
    
    const {isSpanish} = useContext(LanguageContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("WEB")
    const [deploy, setDeploy] = useState("")
    const [repository, setRepository] = useState("")
    const [image, setImage] = useState("")
    const [front, setFront] = useState(null)
    const [style, setStyle] = useState(null)
    const [back, setBack] = useState(null)
    const [db, setDb] = useState(null)
    const [cloud, setCloud] = useState(null)
    const [rate, setRate] = useState(0)
    const [dataProject, setDataProject] = useState({})
    const [response, setResponse] = useState()
    const [route, setRoute] = useState("projects")
    const [data, setData] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        axios.get(API + route)
        .then(res => setData(res.data.content))
    }, [() => deleteData, () => editData()])

    const parametersProject = () => {
        setRoute("projects")
    }

    const parametersCertificates = () => {
        setRoute("certificates")
    }

    const registryTitle = (e) => {
        setTitle(e.target.value)
    }

    const registryDescription = (e) => {
        setDescription(e.target.value)
    }

    const registryType = (e) => {
        let v = e.target.value
        setType(v==="" ? null : v)
    }

    const registryDeploy = (e) => {
        setDeploy(e.target.value)
    }

    const registryRepository = (e) => {
        setRepository(e.target.value)
    }

    const registryImage = (e) => {
        setImage(e.target.value)
    }

    const registryFront = (e) => {
        let v = e.target.value
        setFront(v==="" ? null : v)
    }

    const registryStyle = (e) => {
        let v = e.target.value
        setStyle(v==="" ? null : v)
    }

    const registryBack = (e) => {
        let v = e.target.value
        setBack(v==="" ? null : v)
    }

    const registryDb = (e) => {
        let v = e.target.value
        setDb(v==="" ? null : v)
    }

    const registryCloud = (e) => {
        let v = e.target.value
        setCloud(v==="" ? null : v)
    }

    const registryRate = (e) => {
        setRate(parseInt(e.target.value))
    }

    const createProject = (e) => {
        e.preventDefault()

        setDataProject({
            "title": title,
            "description": description,
            "app_type": type,
            "project_url": deploy,
            "github_url": repository,
            "image_url": image,
            "front_tag": front,
            "style_tag": style,
            "back_tag": back,
            "db_tag": db,
            "cloud_tag": cloud,
            "rate": rate
        })

        axios.post(API + route, dataProject, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {res.status == 201 ? setIsOpen(false) : setIsOpen(true)})
        .catch(e => setResponse(e))

        if (modalIsOpen == true) {
            console.warn(dataProject)
        }
    }

    const editData = (e) => {
        e.preventDefault()
        console.log(dataProject)
        axios.put(API + route, dataProject, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => console.log(res))
        .catch(e => console.error(e))
    }

    const deleteData = (element) => {
        axios.delete(API + route + "/" + element)
        .then(res => console.log(res))
    }

    function openModal(status, data) {
        setDataProject({})
        switch (status) {
            case "create":
                setDataProject({});
                break;
            case "edit":
                // console.log(data.id)
                setDataProject({
                    "id": data.id,
                    "title": data.title,
                    "description": data.description,
                    "app_type": data.app,
                    "project_url": data.linkDeploy,
                    "github_url": data.linkCode,
                    "image_url": data.image,
                    "front_tag": data.stack.front == null ? "" : data.stack.front ,
                    "style_tag": data.stack.style == null ? "" : data.stack.style,
                    "back_tag": data.stack.back == null ? "" : data.stack.back,
                    "db_tag": data.stack.db == null ? "" : data.stack.db,
                    "cloud_tag": data.stack.cloud == null ? "" : data.stack.cloud,
                    "rate": data.rate
                })
            default:
                break;
        }

        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Page>
            <fieldset>
                <legend>Base de datos</legend>
                <input type="radio" name="database" id="projects" onClick={parametersProject} defaultChecked />Proyectos
                <input type="radio" name="database" id="certificates" onClick={parametersCertificates} />Certificados
            </fieldset>

            <button onClick={() => openModal("create")}>Create</button>

            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    {/* {console.log(dataProject)} */}
                    <form id='project' onSubmit={dataProject.id == undefined ? createProject : editData}>
                        <fieldset>
                            <legend className='title'>{isSpanish ? "Crear proyecto" : "Create project"}</legend>
                            
                            <div>
                                <label htmlFor="title">{isSpanish ? "Titulo del proyecto" : "Project title"}</label>
                                <input type="text" value={dataProject.title} onChange={registryTitle} required />
                            </div>

                            <div>
                                <label htmlFor="description">{isSpanish ? "Descripción del proyecto" : "Project description"}</label>
                                <textarea name="" id="" cols="30" rows="10" onChange={registryDescription} value={dataProject.description} required />
                            </div>

                            <div>
                                <label htmlFor="app_type">{isSpanish ? "Tipo de proyecto" : "Project type"}</label>
                                <select name="app_type" id="" value={dataProject.app_type} onChange={registryType}>
                                    <option value="WEB">{isSpanish ? "Aplicación web" : "Web application"}</option>
                                    <option value="DESKTOP">{isSpanish ? "Aplicación de escritorio" : "Desktop application"}</option>
                                    <option value="MOBILE">{isSpanish ? "Aplicación para celular" : "Mobile application"}</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="project_url">{isSpanish ? "URL del proyecto desplegado o para descargar" : "URL of the project deployed or to download"}</label>
                                <input type="url" value={dataProject.project_url} onChange={registryDeploy} required />
                            </div>

                            <div>
                                <label htmlFor="github_url">{isSpanish ? "URL del repositorio del proyecto" : "URL of repository of the project"}</label>
                                <input type="url" value={dataProject.github_url} onChange={registryRepository} required />
                            </div>

                            <div>
                                <label htmlFor="image_url">{isSpanish ? "URL de la imagen del proyecto" : "URL of the image of the project"}</label>
                                <input type="url" value={dataProject.image_url} onChange={registryImage} required />
                            </div>

                            <div>
                                <label htmlFor="front_tag">{isSpanish ? "Tecnología usada para el FrontEnd" : "Technology used for FrontEnd"}</label>
                                <select name="front_tag" value={dataProject.front_tag} onChange={registryFront} id="">
                                    <option value="">N/A</option>
                                    <option value="REACTJS">ReactJS</option>
                                    <option value="HTML">HTML</option>
                                    <option value="JAVA">Java</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="style_tag">{isSpanish ? "Tecnología usada para los estilos" : "Technology used for styles"}</label>
                                <select name="style_tag" value={dataProject.style_tag} onChange={registryStyle} id="">
                                    <option value="">N/A</option>
                                    <option value="SASS">SASS</option>
                                    <option value="CSS">CSS</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="back_tag">{isSpanish ? "Tecnología usada para el BackEnd" : "Technology used for BackEnd"}</label>
                                <select name="back_tag" value={dataProject.back_tag} onChange={registryBack} id="">
                                    <option value="">N/A</option>
                                    <option value="NODEJS">Node.js</option>
                                    <option value="JAVASCRIPT">JavaScript</option>
                                    <option value="SPRING">Spring Boot</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="db_tag">{isSpanish ? "Base de datos" : "Data base"}</label>
                                <select name="db_tag" id="" value={dataProject.db_tag} onChange={registryDb}>
                                    <option value="">N/A</option>
                                    <option value="DYNAMODB">Dynamo DB</option>
                                    <option value="MYSQL">MySQL</option>
                                    <option value="MONGODB">Mongo DB</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="cloud_tag">{isSpanish ? "Servicios en la nube" : "Cloud service"}</label>
                                <select name="cloud_tag" value={dataProject.cloud_tag} id="" onChange={registryCloud}>
                                    <option value="">N/A</option>
                                    <option value="AWS">AWS</option>
                                    <option value="AZURE">Azure</option>
                                    <option value="GOOGLECLOUD">Google cloud</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="rate">{isSpanish ? "Puntaje del proyecto" : "Project rate"}</label>
                                <input type="number" value={dataProject.rate} name="" id="" min="0" max="5" onChange={registryRate} required />
                            </div>

                            <input type="submit" name="" id="" value={dataProject.id == undefined ? "Crear" : "Editar"} />
                        </fieldset>
                    </form>
                </Modal>
            </div>

            {
                data.map(element => (
                    <div key={element.id}>
                        <button onClick={() => openModal("edit", element)}>Edit</button>
                        <button onClick={() => deleteData(element.id)}>Delete</button>

                        <table>
                            <thead>
                                <tr><th>Key</th><th>Value</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>title</td><td>{element.title}</td></tr>
                                <tr><td>description</td><td>{element.description}</td></tr>
                                <tr><td>app</td><td>{element.app}</td></tr>
                                <tr><td>linkDeploy</td><td>{element.linkDeploy}</td></tr>
                                <tr><td>linkCode</td><td>{element.linkCode}</td></tr>
                                <tr><td>image</td><td>{element.image}</td></tr>
                                <tr><td>rate</td><td>{element.rate}</td></tr>
                                <tr><td>back</td><td>{element.stack.back}</td></tr>
                                <tr><td>cloud</td><td>{element.stack.cloud}</td></tr>
                                <tr><td>db</td><td>{element.stack.db}</td></tr>
                                <tr><td>front</td><td>{element.stack.front}</td></tr>
                                <tr><td>style</td><td>{element.stack.style}</td></tr>
                            </tbody>
                        </table>
                    </div>
                ))
            }
        {/* <section>
            <form id='project' onSubmit={createProject}>
                <fieldset>
                    <legend className='title'>{isSpanish ? "Crear proyecto" : "Create project"}</legend>
                    
                    <div>
                        <label htmlFor="title">{isSpanish ? "Titulo del proyecto" : "Project title"}</label>
                        <input type="text" onChange={registryTitle} required />
                    </div>

                    <div>
                        <label htmlFor="description">{isSpanish ? "Descripción del proyecto" : "Project description"}</label>
                        <textarea name="" id="" cols="30" rows="10" onChange={registryDescription} required />
                    </div>

                    <div>
                        <label htmlFor="app_type">{isSpanish ? "Tipo de proyecto" : "Project type"}</label>
                        <select name="app_type" id="" onChange={registryType}>
                            <option value="WEB">{isSpanish ? "Aplicación web" : "Web application"}</option>
                            <option value="DESKTOP">{isSpanish ? "Aplicación de escritorio" : "Desktop application"}</option>
                            <option value="MOBILE">{isSpanish ? "Aplicación para celular" : "Mobile application"}</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="project_url">{isSpanish ? "URL del proyecto desplegado o para descargar" : "URL of the project deployed or to download"}</label>
                        <input type="url" onChange={registryDeploy} required />
                    </div>

                    <div>
                        <label htmlFor="github_url">{isSpanish ? "URL del repositorio del proyecto" : "URL of repository of the project"}</label>
                        <input type="url" onChange={registryRepository} required />
                    </div>

                    <div>
                        <label htmlFor="image_url">{isSpanish ? "URL de la imagen del proyecto" : "URL of the image of the project"}</label>
                        <input type="url" onChange={registryImage} required />
                    </div>

                    <div>
                        <label htmlFor="front_tag">{isSpanish ? "Tecnología usada para el FrontEnd" : "Technology used for FrontEnd"}</label>
                        <select name="front_tag" onChange={registryFront} id="">
                            <option value="">N/A</option>
                            <option value="REACTJS">ReactJS</option>
                            <option value="HTML">HTML</option>
                            <option value="JAVA">Java</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="style_tag">{isSpanish ? "Tecnología usada para los estilos" : "Technology used for styles"}</label>
                        <select name="style_tag" onChange={registryStyle} id="">
                            <option value="">N/A</option>
                            <option value="SASS">SASS</option>
                            <option value="CSS">CSS</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="back_tag">{isSpanish ? "Tecnología usada para el BackEnd" : "Technology used for BackEnd"}</label>
                        <select name="back_tag" onChange={registryBack} id="">
                            <option value="">N/A</option>
                            <option value="NODEJS">Node.js</option>
                            <option value="JAVASCRIPT">JavaScript</option>
                            <option value="SPRING">Spring Boot</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="db_tag">{isSpanish ? "Base de datos" : "Data base"}</label>
                        <select name="db_tag" id="" onChange={registryDb}>
                            <option value="">N/A</option>
                            <option value="DYNAMODB">Dynamo DB</option>
                            <option value="MYSQL">MySQL</option>
                            <option value="MONGODB">Mongo DB</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="cloud_tag">{isSpanish ? "Servicios en la nube" : "Cloud service"}</label>
                        <select name="cloud_tag" id="" onChange={registryCloud}>
                            <option value="">N/A</option>
                            <option value="AWS">AWS</option>
                            <option value="AZURE">Azure</option>
                            <option value="GOOGLECLOUD">Google cloud</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="rate">{isSpanish ? "Puntaje del proyecto" : "Project rate"}</label>
                        <input type="number" name="" id="" min="0" max="5" onChange={registryRate} required />
                    </div>

                    <input type="submit" name="" id="" value={isSpanish ? "Enviar" : "Send"} />
                </fieldset>
            </form>
        </section>
        <section>
                "title": "{title}", <br />
                "description": "{description}", <br />
                "app_type": {type}, <br />
                "project_url": {deploy}, <br />
                "github_url": {repository}, <br />
                "image_url": {image}, <br />
                "front_tag": {front}, <br />
                "style_tag": {style}, <br />
                "back_tag": {back}, <br />
                "db_tag": {db}, <br />
                "cloud_tag": {cloud}, <br />
                "rate": {rate} <br />
        </section>
        <section>
            {response===undefined ? "" : response.message}
        </section> */}
        </Page>
    )
}

export default Register
