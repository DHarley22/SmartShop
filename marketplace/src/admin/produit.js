import { useEffect, useState } from "react";
import Translate from "../Translate/translate";
import Components from "../component";
import smartshopapi from "../smartshopapi";
import 'firebase/storage';
import firebase from "firebase/compat/app";

const firebaseConfig = {
    apiKey: "AIzaSyC_F-_Sq2kRvikMafzcuwHA8l2EVKgm5vQ",
    authDomain: "marketplace-15abf.firebaseapp.com",
    projectId: "marketplace-15abf",
    storageBucket: "marketplace-15abf.appspot.com",
    messagingSenderId: "1031310473653",
    appId: "1:1031310473653:web:06387ff28d817be53ac1fc",
    measurementId: "G-NTZZEGL9WP"
  };
 firebase.initializeApp(firebaseConfig)
const lang=(window.navigator.language).split('-')[0]
let page_config={
    t_fields: Translate[lang||"en"].fields
    , t_messages: Translate[lang||"en"].message
    , t_buttons: Translate[lang||"en"].button
    , invalid_msg: Translate[lang||"en"].invalid_msg
    , other_msg: Translate[lang||"en"].other_msg
    , status_msg: Translate[lang||"en"].status_msg
}
export default function Produit(){
    const preferredLang='fr'
    page_config.t_fields   = Translate[preferredLang].fields
    page_config.t_messages = Translate[preferredLang].message;
    page_config.t_buttons  = Translate[preferredLang].button;
    page_config.invalid_msg= Translate[preferredLang].invalid_msg
    page_config.other_msg  = Translate[preferredLang].other_msg
    page_config.status_msg = Translate[preferredLang].status_msg
    // state pour la mise a jour des produits
    const [listgenre,setLisgenre]=useState([])
    let [file1,setFile1]=useState('')
    let [file2,setFile2]=useState('')
    const [val_up,setVal_up]=useState(
        {
            nom:'',
            description:'',
            path_file:"",
            path_poster:'',
            prix:"",
            author:"",
            duree:"",
            size:"",
            nbrePage:"",
            title:""

        }
    )
    const [search, setSearch]=useState('');
    const [searchA, setSearchA]=useState('');
    const [searchD, setSearchD]=useState('');
    let [categorie,setCategorie]=useState('videolist')
    const [document,setDocument]=useState([])
    const [video,setVideo]=useState([])
    const [audio,setAudio]=useState([])
    useEffect(()=>{
        smartshopapi.get('public/documents',
        // {
        //     headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        // }
        ).then(res=> {
            console.log(res)
            setDocument(res.data)
        }).catch((error)=>{
            console.log(error)
            
        });
        smartshopapi.get('public/audios',
        ).then(res=> {
            console.log(res)
            setAudio(res.data)
        }).catch((error)=>{
            console.log(error)
            
        });
        smartshopapi.get('public/videos',
        ).then(res=> {
            console.log(res)
            setVideo(res.data)
        }).catch((error)=>{
            console.log(error)
            
        });
        smartshopapi.get('public/genre',
        ).then(res=> {
            console.log(res)
            setLisgenre(res.data)
        }).catch((error)=>{
            console.log(error)
            
        })

    },[])
 
    const actionD=(res)=>{
        document.push(res.data)
        setDocument(document)
        categorie='documentlist'
        setCategorie(categorie)
    }
    const actionA=(res)=>{
        audio.push(res.data)
        setAudio(audio)
        categorie='audiolist'
        setCategorie(categorie)
    }
    const actionV=(res)=>{
        video.push(res.data)
        setVideo(video)
        categorie='videolist'
        setCategorie(categorie)
    }
    const handleClick=()=>{
        categorie='video'
        setCategorie(categorie)
        console.log(categorie)
    }
    const handleClickV=()=>{
        categorie='videolist'
        setCategorie(categorie)
        console.log(video)
        console.log(categorie)
    }
    const handleClickD=()=>{
        categorie='documentlist'
        console.log(document)
        setCategorie(categorie)
        console.log(categorie)
    }
    const handleClickA=()=>{
        categorie='audiolist'
        setCategorie(categorie)
        console.log(audio)
        console.log(categorie)
    }
    const handleClick1=()=>{
        categorie='audio'
        setCategorie(categorie)
        console.log(categorie)
    }
    const handleClick2=()=>{
        categorie='document'
        setCategorie(categorie)
        console.log(categorie)
    }
    const viewVideoProduit=(id)=>{
        const val=video.filter(e=>e.id===id)[0]
        setVal_up(val)
        categorie='updvideo'
        setCategorie(categorie)
        console.log(categorie)
        console.log(val_up)
    }
    const viewDocProduit=(id)=>{
        const val=document.filter(e=>e.id===id)[0]
        setVal_up(val)
        categorie='upddocument'
        console.log(categorie)
        setCategorie(categorie)
    }
    const viewAudioProduit=(id)=>{
        const val=audio.filter(e=>e.id===id)[0]
        setVal_up(val)
        categorie='updaudio'
        setCategorie(categorie)
        console.log(categorie)
    }
    // suppression d'un produit
    const deleteProduit=()=>{
        if(categorie==='upddocument'){
            smartshopapi.delete('public/documents/'+val_up.id,val_up).then(
                res=>{
                    if(res.status===200||res.status===201){
                        smartshopapi.get('public/documents',
                            ).then(res=> {
                                setDocument(res.data)
                                console.log(res)
                            })
                        categorie='documentlist'
                        setCategorie(categorie)
                    }
                }
            ).catch(
                err=>{
                    console.log(err)
                }
            )
        }
        else if(categorie==="updaudio"){
            smartshopapi.delete('public/audios/'+val_up.id,val_up).then(
                res=>{
                    console.log(res)
                    if(res.status===200||res.status===201){
                        smartshopapi.get('public/audios',
                            ).then(res=> {
                                setAudio(res.data)
                            })
                        categorie="audiolist"
                        setCategorie(categorie)
                    }
                }
            ).catch(
                err=>{
                    console.log(err)
                }
            )
        }
        else if(categorie==='updvideo'){
            smartshopapi.delete('public/videos/'+val_up.id,val_up).then(
                res=>{
                    console.log(res)
                    if(res.status===200||res.status===201|| res.status==204){
                        smartshopapi.get('public/videos',
                            ).then(res=> {
                                console.log(res)
                                setVideo(res.data)
                                
                            })
                            categorie='videolist'
                            setCategorie(categorie)
                        
                    }
                }
            ).catch(
                err=>{
                    console.log(err)
                }
            )
        }

    }
    // mise a jour des produit
    const updateProduit=(e)=>{
        e.preventDefault()
        if(categorie==='upddocument'){
            Components.uploading([file1,file2],'Document')
            smartshopapi.put('public/documents/'+val_up.id,val_up).then(
                res=>{
                    if(res.status===200||res.status===201){
                        smartshopapi.get('public/documents',
                            ).then(res=> {
                                setDocument(res.data)
                            })
                        categorie='documentlist'
                        setCategorie(categorie)
                    }
                }
            ).catch(
                err=>{
                    console.log(err)
                }
            )
        }
        else if(categorie==="updaudio"){
            Components.uploading([file1,file2],'Audio')
            smartshopapi.put('public/audios/'+val_up.id,val_up).then(
                res=>{
                    if(res.status===200||res.status===201){
                        smartshopapi.get('public/audios',
                            ).then(res=> {
                                setAudio(res.data)
                            })
                        categorie="audiolist"
                        setCategorie(categorie)
                    }
                }
            ).catch(
                err=>{
                    console.log(err)
                }
            )
        }
        else if(categorie==='updvideo'){
            Components.uploading([file1,file2],'video')
            smartshopapi.put('public/videos/'+val_up.id,val_up).then(
                res=>{
                    if(res.status===200||res.status===201){
                        smartshopapi.get('public/videos',
                            ).then(res=> {
                                setVideo(res.data)
                            })
                        categorie='videolist'
                        setCategorie(categorie)
                    }
                }
            ).catch(
                err=>{
                    console.log(err)
                }
            )
        }

    }
    // handelchange pour la mise a jour des produit
    const handleChangeUp=({currentTarget})=>{
        const {value, name} =currentTarget;
        setVal_up({...val_up,[name]:value});
    }
    
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        file1=selectedFile
        setFile1(file1)
        setVal_up({...val_up,['file_name']:selectedFile.name,['path_file']:selectedFile.name,['size']:selectedFile.size});
       
        };
    const handleFileChange3 = (event) => {
            const selectedFile = event.target.files[0];
            file2=selectedFile
            setFile2(file2)
            setVal_up({...val_up,['path_poster']:selectedFile.name});
            };
    return(
        <div className="body">
            <div className="row title-dash">
                <div className="col title-ad">
                    <h3 className="right">Smart-Shop </h3>
                </div>
                <div className="col text-right invisible">
                    <small className="left">welcome , unser</small>
                </div>
                <div className="col text-right invisible">
                    <small className="left">welcome , unser</small>
                </div>
                <div className="col text-right welcome">
                    <small className="left">
                        welcome , admin
                        <a href="#" className="url_w"><u> change password</u></a>
                        <span> / </span>
                        <a href="#" className="url_w">  <u>Log out</u></a>
                    </small>
                </div>
            </div>
            <div className="row title-dash2">
                <div className="col ">
                    <small>
                        <a href="#" className="url_w">DASHBOARD</a>
                    </small>
                </div>
            </div>
            <div className="row gestion">
                <div className="col-md-3">
                    <div className="row p-gestion">
                        <div className="col-sm-10 t-gestion card-header">{page_config.other_msg.categorie}</div>
                        <div className="sidebar col-sm-12">
                            <ul className="list-group list-group-flush col-sm-10">
                                <li className="actives list-group-item row">
                                    <a onClick={handleClickV} className="pull-left col-sm-8">
                                        {page_config.other_msg.video}
                                    </a>
                                    <a className="col-sm-4 pull-right" onClick={handleClick}>{page_config.other_msg.create}
                                        {/* <i className="fas fa-add"></i> */}
                                    </a>
                                </li>
                                <li className="actives list-group-item row">
                                    <a className="pull-left col-sm-8" onClick={handleClickD} >
                                        {page_config.other_msg.document}
                                    </a>
                                    <a className="col-sm-4 pull-right" onClick={handleClick2}>{page_config.other_msg.create}</a>
                                </li>
                                <li className="actives list-group-item row">
                                    <a className="pull-left col-sm-8" onClick={handleClickA}>
                                        {page_config.other_msg.audio}
                                    </a>
                                    <a className="col-sm-4 pull-right" onClick={handleClick1}>{page_config.other_msg.create}</a>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                   {categorie==='video' &&
                        <Components.Formulaire
                            nom={'nom'}
                            description={'description'}
                            chemin={'chemin'}
                            config={page_config}
                            author={'auteur'}
                            duree={'duree'}
                            genre={'genre'}
                            listgenre={listgenre}
                            path_poster={'path poster'}
                            file_name="file name"
                            prix="prix"
                            actionD={actionV}
                            type={"video"}                            
                        />
                    }
                    {categorie==='audio' &&
                        <Components.Formulaire
                            nom={'nom'}
                            description={'description'}
                            chemin={'chemin'}
                            duree={"duree"}
                            config={page_config}
                            author={'auteur'}
                            path_poster={'path poster'}
                            listgenre={listgenre}
                            file_name="file name"
                            genre="genre"
                            prix="prix"
                            actionD={actionA}
                            type={"audio"}
                            
                        />
                    }
                    {categorie==='document' &&
                        <Components.Formulaire
                            nom={'nom'}
                            description={'description'}
                            chemin={'chemin'}
                            config={page_config}
                            author={'auteur'}
                            title={'title'}
                            nbrePage={'nbrePage'}
                            path_poster={'path poster'}
                            listgenre={listgenre}
                            file_name="file name"
                            genre="genre"
                            prix="prix"
                            actionD={actionD}
                            type={"document"}
                            
                        />
                    }
                    {/* affiche la liste des produit de type video */}
                    {categorie==='videolist' &&(
                        
                        video.length?
                        <>
                            <div className="row">
                                <div className="col-sm-6 p-auto m-auto ">
                                    <div className="blog1r1">
                                        <div className="input-group">
                                            <input type="text" className="form-control" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search Movie"/>
                                            <span className="input-group-btn">
                                                <button className="btn btn-primary bg_red border-0" type="button">
                                                    <i className="fa fa-search"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">{page_config.t_fields.name}</th>
                                        <th scope="col">{page_config.t_fields.description}</th>
                                        <th scope="col">{page_config.t_fields.prix}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {video.filter(elt=>((elt.nom).toLowerCase()).includes(search.toLowerCase())).map((a,b)=>{
                                        return(
                                            <tr onClick={() => viewVideoProduit(a.id)} key={b}>
                                                <th scope="row">{a.id}</th>
                                                <td>{a.nom}</td>
                                                <td>{a.description}</td>
                                                <td>{a.prix}</td>
                                            </tr>
                                        )
                                    
                                    })}
                                
                                </tbody>
                            </table>
                        </>
                    :
                    <center>
                        <h2> {page_config.other_msg.no_data} </h2>
                    </center>)}

                    {/* affiche l'interface de modification des produit type viedo */}
                    {
                        categorie==='updvideo'&&
                        <form onSubmit={updateProduit}>
                            <div className="form-group has-feedback">
                                {/* <label>path_poster</label> */}
                                <input type="file" 
                                    onChange={handleFileChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group has-feedback">
                                {/* <label>nom:</label> */}
                                <input type="text" 
                                    name="nom"
                                    className="form-control"
                                    value={val_up.nom}
                                    onChange={handleChangeUp}
                                />
                            </div>
                            <div className="form-group has-feedback">
                                    {/* <lab>description:</lab> */}
                                    <input type="text" 
                                        name="description"
                                        className="form-control"
                                        value={val_up.description}
                                        onChange={handleChangeUp}
                                    />
                                </div>
                                <div className="form-group has-feedback">
                                    <input type="text" 
                                        name="author"
                                        className="form-control"
                                        value={val_up.author}
                                        onChange={handleChangeUp}
                                    />
                                </div>
                                <div className="form-group has-feedback">
                                    <input type="text" 
                                        name="duree"
                                        className="form-control"
                                        value={val_up.duree}
                                        onChange={handleChangeUp}
                                    />
                                </div>
                               
                                <div className="form-group has-feedback">
                                    {/* <label>path_poster</label> */}
                                    <input type="file" 
                                        onChange={handleFileChange3}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group has-feedback">
                                    {/* <label>prix:</label> */}
                                    <input type="text" 
                                        name="prix"
                                        className="form-control"
                                        value={val_up.prix}
                                        onChange={handleChangeUp}
                                    />
                                </div>
                            
                            <button type="submit" className="btn btn-primary">{page_config.t_buttons.save}</button>
                            <button  className="btn btn-danger" onClick={deleteProduit}>{page_config.t_buttons.delete}</button>
                        </form>
                    }
                    {/* affiche la liste des produit de type document */}
                    
                    {categorie==='documentlist' &&(
                        document.length?
                        <>
                            <div className="row">
                                <div className="col-sm-6 p-auto m-auto ">
                                    <div className="blog1r1">
                                        <div className="input-group">
                                            <input type="text" className="form-control" value={searchD} onChange={(e)=>setSearchD(e.target.value)} placeholder="Search Movie"/>
                                            <span className="input-group-btn">
                                                <button className="btn btn-primary bg_red border-0" type="button">
                                                    <i className="fa fa-search"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">{page_config.t_fields.name}</th>
                                        <th scope="col">{page_config.t_fields.description}</th>
                                        <th scope="col">{page_config.t_fields.prix}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {document.filter(elt=>((elt.nom).toLowerCase()).includes(searchD.toLowerCase())).map((a,b)=>{
                                        return(
                                            <tr onClick={() => viewDocProduit(a.id)} key={b}>
                                                <th scope="row">{a.id}</th>
                                                <td>{a.nom}</td>
                                                <td>{a.description}</td>
                                                <td>{a.prix}</td>
                                            </tr>
                                        )
                                    
                                    })}
                                
                                </tbody>
                            </table>
                        </>
                    :
                    <center>
                        <h2> {page_config.other_msg.no_data} </h2>
                    </center>)}
                    {/* affiche linterface de modification des produit de type document */}
                    {
                        categorie==='upddocument'&&
                        <form onSubmit={updateProduit}>
                                <input type="file"
                                    onChange={handleFileChange}
                                    className="form-control"
                                />
                                <div className="form-group has-feedback">
                                    {/* <label>nom:</label> */}
                                    <input type="text" 
                                        name="nom"
                                        className="form-control"
                                        value={val_up.nom}
                                        onChange={handleChangeUp}
                                    />
                                </div>
                                <div className="form-group has-feedback">
                                    {/* <label>description</label> */}
                                    <input type="text" 
                                        name="description"
                                        className="form-control"
                                        value={val_up.description}
                                        onChange={handleChangeUp}
                                    />
                                </div>
                                <div className="form-group has-feedback">
                                    {/* <label>auteur</label> */}
                                    <input type="text" 
                                        name="author"
                                        className="form-control"
                                        value={val_up.author}
                                        onChange={handleChangeUp}
                                    />
                                </div>
                                <div className="form-group has-feedback">
                                    {/* <label>auteur</label> */}
                                    <input type="text" 
                                        name="nbrePage"
                                        className="form-control"
                                        value={val_up.nbrePage}
                                        onChange={handleChangeUp}
                                    />
                                </div>
                                <div className="form-group has-feedback">
                                    {/* <label>auteur</label> */}
                                    <input type="text" 
                                        name="title"
                                        className="form-control"
                                        value={val_up.title}
                                        onChange={handleChangeUp}
                                    />
                                </div>
                                <div className="form-group has-feedback">
                                    {/* <label>path_poster</label> */}
                                    <input type="file"
                                        onChange={handleFileChange3}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group has-feedback">
                                    {/* <label>prix</label> */}
                                    <input type="text" 
                                        name="prix"
                                        className="form-control"
                                        value={val_up.prix}
                                        onChange={handleChangeUp}
                                    />
                                </div>
                            
                        <button type="submit" className="btn btn-primary">{page_config.t_buttons.save}</button>
                        <button  className="btn btn-danger" onClick={deleteProduit}>{page_config.t_buttons.delete}</button>
                        </form>
                    }
                    {/* affiche la liste des produits de type audio */}
                    {categorie==='audiolist' &&(
                        audio.length?
                        <>
                            <div className="row">
                                <div className="col-sm-6 p-auto m-auto ">
                                    <div className="blog1r1">
                                        <div className="input-group">
                                            <input type="text" className="form-control" value={searchA} onChange={(e)=>{setSearchA(e.target.value)}} placeholder="Search Movie"/>
                                            <span className="input-group-btn">
                                                <button className="btn btn-primary bg_red border-0" type="button">
                                                    <i className="fa fa-search"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">{page_config.t_fields.name}</th>
                                        <th scope="col">{page_config.t_fields.description}</th>
                                        <th scope="col">{page_config.t_fields.prix}</th>
                                        {/* <th scope="col">{page_config.t_fields.genre}</th> */}
                                        {/* <th scope="col">{page_config.t_fields.chemin}</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {audio.filter(elt=>((elt.nom).toLowerCase()).includes(searchA.toLowerCase())).map((a,b)=>{
                                        return(
                                            <tr onClick={() => viewAudioProduit(a.id)} key={b}>
                                                <th scope="row">{a.id}</th>
                                                <td>{a.nom}</td>
                                                <td>{a.description}</td>
                                                <td>{a.prix}</td>
                                            </tr>
                                        )
                                    
                                    })}
                                
                                </tbody>
                            </table>
                        </>
                    :
                    <center>
                        <h2> {page_config.other_msg.no_data} </h2>
                    </center>)
                    }
                    {
                        categorie==='updaudio'&&
                        <form onSubmit={updateProduit}>
                            <div className="form-group has-feedback">
                                {/* <label>path_poster</label> */}
                                <input type="file"
                                    onChange={handleFileChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group has-feedback">
                                {/* <label>nom:</label> */}
                                <input type="text" 
                                    name="nom"
                                    className="form-control"
                                    value={val_up.nom}
                                    onChange={handleChangeUp}
                                />
                            </div>
                            <div className="form-group has-feedback">
                                {/* <label>description:</label> */}
                                <input type="text" 
                                    name="description"
                                    className="form-control"
                                    value={val_up.description}
                                    onChange={handleChangeUp}
                                />
                            </div>
                            <div className="form-group has-feedback">
                                {/* <label>auteur:</label> */}
                                <input type="text" 
                                    name="author"
                                    className="form-control"
                                    value={val_up.author}
                                    onChange={handleChangeUp}
                                />
                            </div>
                            <div className="form-group has-feedback">
                                    {/* <label>auteur</label> */}
                                    <input type="text" 
                                        name="duree"
                                        className="form-control"
                                        value={val_up.duree}
                                        onChange={handleChangeUp}
                                    />
                                </div>
                            <div className="form-group has-feedback">
                                <div className="form-group has-feedback">
                                    {/* <label>path_poster:</label> */}
                                    <input type="file"
                                        onChange={handleFileChange3}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="form-group has-feedback">
                                {/* <label>prix</label> */}
                                <input type="text" 
                                    name="prix"
                                    className="form-control"
                                    value={val_up.prix}
                                    onChange={handleChangeUp}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">{page_config.t_buttons.save}</button>
                            <button  className="btn btn-danger" onClick={deleteProduit}>{page_config.t_buttons.delete}</button>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}