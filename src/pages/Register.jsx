import React, { useContext, useEffect, useState } from 'react'
import Page from '../components/templates/Page'
import LanguageContext from '../context/LanguageContext'
import axios from 'axios'
import Modal from 'react-modal';

const API = "https://api-production-85f8.up.railway.app/"
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
    const [id, setId] = useState()
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
    const [route, setRoute] = useState("projects")
    const [data, setData] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    let dataProject

    const openModal = (status, data) => {
        switch (status) {
            case "create":
                setId(undefined)
                setTitle("")
                setDescription("")
                setType("WEB")
                setDeploy("")
                setRepository("")
                setImage("")
                setFront("")
                setStyle("")
                setBack("")
                setDb("")
                setCloud("")
                setRate(0)
                break;
            case "edit":
                console.log(data)
                setId(data.id)
                setTitle(data.title)
                setDescription(data.description)
                setType(data.app)
                setDeploy(data.linkDeploy)
                setRepository(data.linkCode)
                setImage(data.image)
                setFront(data.stack.front == null ? "" : data.stack.front)
                setStyle(data.stack.style == null ? "" : data.stack.style)
                setBack(data.stack.back == null ? "" : data.stack.back)
                setDb(data.stack.db == null ? "" : data.stack.db)
                setCloud(data.stack.cloud = null ? "" : data.stack.cloud)
                setRate(data.rate)
            default:
                break;
        }

        setIsOpen(true);
    }

    const createProject = (e) => {
        e.preventDefault()

        dataProject = {
            "title": title,
            "description": description,
            "app_type": type,
            "project_url": deploy,
            "github_url": repository,
            "image_url": image,
            "front_tag": front == "" ? null : front,
            "style_tag": style == "" ? null : style,
            "back_tag": back == "" ? null : back,
            "db_tag": db == "" ? null : db,
            "cloud_tag": cloud == "" ? null : cloud,
            "rate": rate
        }

        console.log(dataProject)

        axios.post(API + route, dataProject, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.status == 201 ? closeModal() : console.log(res.status))
        .catch(e => console.error(e))
    }

    const editProject = (e) => {
        e.preventDefault()

        dataProject = {
            "id": id,
            "title": title,
            "description": description,
            "app_type": type,
            "project_url": deploy,
            "github_url": repository,
            "image_url": image,
            "front_tag": front == "" ? null : front,
            "style_tag": style == "" ? null : style,
            "back_tag": back == "" ? null : back,
            "db_tag": db == "" ? null : db,
            "cloud_tag": cloud == "" ? null : cloud,
            "rate": rate
        }

        console.log(dataProject)

        axios.put(API + route, dataProject, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.status == 200 ? closeModal() : console.log(res.status))
        .catch(e => console.error(e))
    }

    const deleteData = (element) => {
        axios.delete(API + route + "/" + element)
        .then(res => console.log(res.data))
    }

    function closeModal() {
        setIsOpen(false);
        dataProject = {}
    }

    useEffect(() => {
        axios.get(API + route)
        .then(res => setData(res.data.content))
    }, [() => deleteData, () => editProject()])

    return (
        <Page>

            {/* <fieldset>
                <legend>Base de datos</legend>
                <input type="radio" name="database" id="projects" onClick={() => setRoute("projects")} defaultChecked />Proyectos
                <input type="radio" name="database" id="certificates" onClick={() => setRoute("certificates")} />Certificados
            </fieldset> */}

            <button onClick={() => openModal("create", {})}>Create</button>

            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <form id='project' onSubmit={id == undefined ? createProject : editProject}>
                        <fieldset>
                            <legend className='title'>{isSpanish ? "Proyecto" : "Project"}</legend>
                            
                            <div>
                                <label htmlFor="title">{isSpanish ? "Titulo del proyecto" : "Project title"}</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>

                            <div>
                                <label htmlFor="description">{isSpanish ? "Descripción del proyecto" : "Project description"}</label>
                                <textarea name="" id="" cols="30" rows="10" onChange={(e) => setDescription(e.target.value)} value={description} required />
                            </div>

                            <div>
                                <label htmlFor="app_type">{isSpanish ? "Tipo de proyecto" : "Project type"}</label>
                                <select name="app_type" id="" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="WEB">{isSpanish ? "Aplicación web" : "Web application"}</option>
                                    <option value="DESKTOP">{isSpanish ? "Aplicación de escritorio" : "Desktop application"}</option>
                                    <option value="MOBILE">{isSpanish ? "Aplicación para celular" : "Mobile application"}</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="project_url">{isSpanish ? "URL del proyecto desplegado o para descargar" : "URL of the project deployed or to download"}</label>
                                <input type="url" value={deploy} onChange={(e) => setDeploy(e.target.value)} required />
                            </div>

                            <div>
                                <label htmlFor="github_url">{isSpanish ? "URL del repositorio del proyecto" : "URL of repository of the project"}</label>
                                <input type="url" value={repository} onChange={(e) => setRepository(e.target.value)} required />
                            </div>

                            <div>
                                <label htmlFor="image_url">{isSpanish ? "URL de la imagen del proyecto" : "URL of the image of the project"}</label>
                                <input type="url" value={image} onChange={(e) => setImage(e.target.value)} required />
                            </div>

                            <div>
                                <label htmlFor="front_tag">{isSpanish ? "Tecnología usada para el FrontEnd" : "Technology used for FrontEnd"}</label>
                                <select name="front_tag" value={front == null ? "" : front} onChange={(e) => setFront(e.target.value)} id="">
                                    <option value="">N/A</option>
                                    <option value="REACTJS">ReactJS</option>
                                    <option value="HTML">HTML</option>
                                    <option value="JAVA">Java</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="style_tag">{isSpanish ? "Tecnología usada para los estilos" : "Technology used for styles"}</label>
                                <select name="style_tag" value={style == null ? "" : style} onChange={(e) => setStyle(e.target.value)} id="">
                                    <option value="">N/A</option>
                                    <option value="SASS">SASS</option>
                                    <option value="CSS">CSS</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="back_tag">{isSpanish ? "Tecnología usada para el BackEnd" : "Technology used for BackEnd"}</label>
                                <select name="back_tag" value={back == null ? "" : back} onChange={(e) => setBack(e.target.value)} id="">
                                    <option value="">N/A</option>
                                    <option value="NODEJS">Node.js</option>
                                    <option value="JAVASCRIPT">JavaScript</option>
                                    <option value="SPRING">Spring Boot</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="db_tag">{isSpanish ? "Base de datos" : "Data base"}</label>
                                <select name="db_tag" id="" value={db == null ? "" : db} onChange={(e) => setDb(e.target.value)}>
                                    <option value="">N/A</option>
                                    <option value="DYNAMODB">Dynamo DB</option>
                                    <option value="MYSQL">MySQL</option>
                                    <option value="MONGODB">Mongo DB</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="cloud_tag">{isSpanish ? "Servicios en la nube" : "Cloud service"}</label>
                                <select name="cloud_tag" value={cloud == null ? "" : cloud} id="" onChange={(e) => setCloud(e.target.value)}>
                                    <option value="">N/A</option>
                                    <option value="AWS">AWS</option>
                                    <option value="AZURE">Azure</option>
                                    <option value="GOOGLECLOUD">Google cloud</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="rate">{isSpanish ? "Puntaje del proyecto" : "Project rate"}</label>
                                <input type="number" value={rate} name="" id="" min="0" max="5" onChange={(e) => setRate(parseInt(e.target.value))} required />
                            </div>

                            <input type="submit" name="" id="" value={id == undefined ? "Crear" : "Editar"} />
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
        </Page>
    )
}

export default Register
