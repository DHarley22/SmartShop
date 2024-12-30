import Footer from "../basefront/footer";
import Header from "../basefront/header";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import smartshopapi from "../smartshopapi";
import Components from "../component";
import { jwtDecode } from "jwt-decode";
const firebaseConfig = {
    apiKey: "AIzaSyC_F-_Sq2kRvikMafzcuwHA8l2EVKgm5vQ",
    authDomain: "marketplace-15abf.firebaseapp.com",
    projectId: "marketplace-15abf",
    storageBucket: "marketplace-15abf.appspot.com",
    messagingSenderId: "1031310473653",
    appId: "1:1031310473653:web:06387ff28d817be53ac1fc",
    measurementId: "G-NTZZEGL9WP"
  };
  const firebaseApp = initializeApp(firebaseConfig);
export default function BlogDetail(){
    const storage=getStorage()
	let [categorie,setCategorie]=useState('video')
    const s_categorie={state:categorie,set:setCategorie}
	const [documents,setDocument]=useState([])
    const [mail,setEmail]=useState('')
    const [contentrecom,setContentRecom]=useState([])
    const [contentrecomA,setContentRecomA]=useState([])
    const [contentrecomD,setContentRecomD]=useState([])
    let [classname,setClassName]=useState('d-none')
    let [classname1,setClassName1]=useState('d-none')
    let [classname2,setClassName2]=useState('d-none')
    const [video,setVideo]=useState([])
    const [audio,setAudio]=useState([])
	const[evallist,setEvallist]=useState([])
	const [listuser,setListuser]=useState([])
    let [author,setAuthor]=useState('')
    let [title,setTitle]=useState('')
    let [panier_list,setPanier_list]=useState([])
	
    useEffect(()=>{
      
		smartshopapi.get('public/download').then(
            res=>{
                const promises=res.data.filter(elt=>(elt.user.id===parseInt(localStorage.id)&&(elt.produit.genre.libelle==='comedie'||elt.produit.genre.libelle==='film'||elt.produit.genre.libelle==='serie'))).map(item => {
                    console.log('ines')
                const storageRef = ref(storage, 'gs:/video/' + item.produit.path_poster);
                return getDownloadURL(storageRef)
                    .then(url => {
                    item.path_poster = url;
                    console.log('ines')
                    })
                    .catch(error => {
                    console.error('Erreur lors de la récupération de l\'URL de téléchargement :', error);
                    });
                });
                Promise.all(promises)
                .then(() => {
                    const promises=res.data.filter(elt=>(elt.user.id===parseInt(localStorage.id)&&(elt.produit.genre.libelle==='comedie'||elt.produit.genre.libelle==='film'||elt.produit.genre.libelle==='serie')))
                    setVideo(promises);
                });
                const promises3=res.data.filter(elt=>(elt.user.id===parseInt(localStorage.id)&&(elt.produit.genre.libelle==='bikutsi'||elt.produit.genre.libelle==='makossa'))).map(item => {
                    const storageRef = ref(storage, 'gs:/Audio/' + item.produit.path_poster);
                    return getDownloadURL(storageRef)
                        .then(url => {
                        item.path_poster = url;
                        })
                        .catch(error => {
                        console.error('Erreur lors de la récupération de l\'URL de téléchargement :', error);
                        });
                    });
                    Promise.all(promises3)
                    .then(() => {
                        const promises=res.data.filter(elt=>(elt.user.id===parseInt(localStorage.id)&&(elt.user.id===parseInt(localStorage.id)&&(elt.produit.genre.libelle==='bikutsi'||elt.produit.genre.libelle==='makossa'))))
                        setAudio(promises);
                });
                const promises2=res.data.filter(elt=>(elt.user.id===parseInt(localStorage.id)&&(elt.produit.genre.libelle==='Oeuvre'||elt.produit.genre.libelle==='livre'))).map(item => {
                    const storageRef = ref(storage, 'gs:/Document/' + item.produit.path_poster);
                    return getDownloadURL(storageRef)
                        .then(url => {
                        item.path_poster = url;
                        })
                        .catch(error => {
                        console.error('Erreur lors de la récupération de l\'URL de téléchargement :', error);
                        });
                    });
                    Promise.all(promises2)
                    .then(() => {
                        const promises=res.data.filter(elt=>(elt.user.id===parseInt(localStorage.id)&&(elt.produit.genre.libelle==='Oeuvre'||elt.produit.genre.libelle==='livre')))
                        setDocument(promises);
                    });
                
                })
                .catch(error => {
                    console.log(error);
        });
        setEmail(jwtDecode(localStorage.token).sub) ;
    
		smartshopapi.get('auth/all').then(
			res=>setListuser(res.data)
		).catch(
			err=>console.log(err)
		);
		smartshopapi.get('public/eval').then(
			res=>{setEvallist(res.data)
			console.log(res)}
		).catch(
			err=>console.log(err)
		)
    	},[])

    //recommandation baser sur le contenue
    const recom_content = (id,type,store) => {
        return smartshopapi.get('public/'+type+'/recom?produitId=' + id)
          .then(res => {
            const promises = res.data.map(item => {
              const storageRef = ref(storage, 'gs:/'+store+'/' + item.path_poster);
              return getDownloadURL(storageRef)
                .then(url => {
                  item.path_poster = url;
                  return item; // Retourne l'élément mis à jour
                })
                .catch(error => {
                  console.error('Erreur lors de la récupération de l\'URL de téléchargement :', error);
                });
            });
      
            return Promise.all(promises)
              .then(() => {
                return res.data;
              });
          })
          .catch(error => {
            console.log(error);
          });
    }
    //pannier d'achat
    const clickpanier=(a,b)=>{
	
		if(b===0){
			if(panier_list.includes(a)===false){
				panier_list=panier_list.concat(a)
				setPanier_list(panier_list)
				const elementsUniques = new Set(panier_list.map(JSON.stringify));
				const panier = elementsUniques.size;
				const panier_list_json = (JSON.stringify(panier_list));
				localStorage.setItem('panier',panier_list_json)
				localStorage.setItem('nbr',panier)
				console.log(b)
			}
		}
		else if(b===1){
			if(panier_list.includes(a)===true){
				panier_list=panier_list.filter(elt=>elt.id!==a.id)
				setPanier_list(panier_list)
				const elementsUniques = new Set(panier_list.map(JSON.stringify));
				const panier = elementsUniques.size;
				const panier_list_json = (JSON.stringify(panier_list));
				localStorage.setItem('panier',panier_list_json)
				localStorage.setItem('nbr',panier)
				console.log(b)
			}

		}
	}
    //download video
    const download=(a,b,c)=>{
        console.log(c)
      const storage=getStorage()
      getDownloadURL(ref(storage, 'gs:/video/3421320ea37e4681a419b75f903eee97.mp4'))
    .then((url) => {
      
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
        const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        const img = document.getElementById('myimg');
        const d_none=document.getElementById('d-none')
        d_none.style.display='block'
        console.log(img)
        img.setAttribute('src', url);
        title=a
        author=b
        setTitle(title)
        setAuthor(author)

        })
        .catch((error) => {
        // Handle any errors
        });  
        classname=''
        setClassName(classname)
        //recommendation
        recom_content(c,'videos','video')
        .then(result => {
            console.log(result)
            if(result)
                setContentRecom(result);
                console.log(contentrecom)
                console.log( contentrecom.filter(elt=>!video.some(item=>item.produit.id===elt.id)))

        })
        .catch(error => {
          console.error('Erreur lors de l\'exécution de recom_content :', error);
        });
    }
    // download audio
    const downloadAudio=(a,b,c)=>{
        console.log('ines')
        const storage=getStorage()
        getDownloadURL(ref(storage, 'gs:/Audio/Alan Cavé - J ai besoin de toi.mp3'))
      .then((url) => {
        
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = (event) => {
          const blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();
          const img = document.getElementById('myaudio');
          const d_none=document.getElementById('dA-none')
          d_none.style.display='block'
          console.log(img)
          img.setAttribute('src', url);
          console.log(url)
          title=a
          author=b
          setTitle(title)
          setAuthor(author)
  
          })
          .catch((error) => {
          // Handle any errors
          });
          classname1=''
          setClassName1(classname1)
          //recommendation
          recom_content(c,'audios','Audio')
          .then(result => {
              console.log(result)
              if(result)
                  setContentRecomA(result);
  
          })
          .catch(error => {
            console.error('Erreur lors de l\'exécution de recom_content :', error);
          });  
  
      }
      const downloadDoc=(a,b,c)=>{
        console.log('ines')
        const storage=getStorage()
        getDownloadURL(ref(storage, 'gs:/Audio/Alan Cavé - J ai besoin de toi.mp3'))
      .then((url) => {
        
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = (event) => {
          const blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();
          const img = document.getElementById('mydoc');
          const d_none=document.getElementById('dd-none')
          d_none.style.display='block'
          console.log(img)
          img.setAttribute('src', 'img/Document/2_CNN.pdf#toolbar=0');
          console.log(url)
          title=a
          author=b
          setTitle(title)
          setAuthor(author)
  
          })
          .catch((error) => {
          // Handle any errors
          });  
          classname2=''
          setClassName2(classname2)
          //recommendation
          recom_content(c,'documents','Document')
          .then(result => {
              console.log(result)
              if(result)
                  setContentRecomD(result);
  
          })
          .catch(error => {
            console.error('Erreur lors de l\'exécution de recom_content :', error);
          });
  
      }
    // const iduser=listuser.filter(elt=>elt.email===email).id
    const resstar=(list,user,prod)=>{
        // retourn le nombre d'etoile
        if(list.length===0){
            return -1
        }
        else if (list.filter(elt=>elt.produit.id===prod && elt.user.email===user).length===0){
            return -1
        }
        else{
            return list.filter(elt=>elt.produit.id===prod && elt.user.email===user)[0]
        }
    }
    return(
        <>
        <Header
            s_categorie={s_categorie}
            download={localStorage.download}
        />
        <section id="center" class="center_o pt-5">
            <div class="container">
                <div class="row center_o1 text-center">
                    <div class="col-md-12">
                        <h2>Mes Telechargements</h2>
                        <h5 class="bg_dark d-inline-block p-4 mb-0 mt-4 pt-2 pb-2 fw-normal col_red">
                            <a class="text-white" href="/">Home</a>  
                            <span class="me-2 ms-2 text-muted "> /</span>
                            <span className="text-white">Telechargements</span>
                            <span class="me-2 ms-2 text-muted"> /</span>
                            {categorie}
                        </h5>
                    </div>
                </div>
            </div>
        </section>
        <div className="row">
            <div className="col-sm-6 p-auto m-auto ">
                <div className="blog1r1">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search Movie"/>
                        <span className="input-group-btn">
                            <button className="btn btn-primary bg_red border-0" type="button">
                                <i className="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <section id="blog" class="p_3 bg-light">
            <div class="container">
                <div class="row blog1">
                    <div class="col-md-12">
                        
                        {(categorie==='categorie'||categorie==='audio') && <>
                        <div class="blog1l">
                            <div class="blog1l1 bg-white" id="dA-none" style={{display:'none'}}>
                                <div class="grid clearfix">
                                    <figure class="effect-jazz mb-0 "  id="id">
                                        <audio src='' 
                                        className="w-100"
                                        controls
                                        autoPlay 
                                        controlsList="nodownload"
                                        preload  id="myaudio" 
                                        // type="video/mp4"
                                        height={480}
                                        >
                                            votre navigateur ne prend pas en charge cette video
                                        </audio>
                                    </figure>
                                </div>
                                <div class="blog1l1i clearfix p-4">
                                    <h6 class="col_red">March 09, 2021 <span class="me-2 ms-2">|</span> {author}</h6>
                                    <h4 class="mt-3"><a href="#">{title}</a></h4>
                                    
                                </div>
                            </div>
                        </div>
                        <div className={'upcome_2i row'+' '+ classname1}>
                        {(contentrecomA.length&&contentrecomA.length>0)? contentrecomA.filter(elt=>!audio.some(item=>item.produit.id===elt.id)).slice(0,4).map((a,b)=>{
                            return(
                            <div className="col-sm-3">
                            <Components.Poster2 key={a.id}
                                name={a.nom}
                                author={a.author}
                                clickpanier={clickpanier}
                                downloadAudio1={'yes'}
                                panier='yes'
                                elt={a}
                                poster={a.path_poster}
                                prix={a.prix+"FCFA"}
                                list={listuser}  
                                id={a.id}
                                like={resstar(evallist,mail,a.id)==-1?-1:resstar(evallist,mail,a.id).nbrstar}
                                id_eval={resstar(evallist,mail,a.id).id_eval}
                            />
                        </div>
                            )
                        }):''}
                        </div>
                        <div class="upcome_2i row" >
                            {audio.length? audio.filter(elt=>(elt.user.email===mail)).map((a,b)=>{
                                return(
                                    <div className="col-sm-3">
                                        <Components.Poster2 key={a.id}
                                           name={a.produit.nom}
                                           author={a.produit.author}
                                           download={downloadAudio}
                                           // type='bikusi'
                                           poster={a.path_poster}
                                           list={listuser}
                                           id={a.produit.id}
                                           like={resstar(evallist,mail,a.produit.id)==-1?-1:resstar(evallist,mail,a.produit.id).nbrstar}
                                           id_eval={resstar(evallist,mail,a.produit.id).id_eval}
                                        />
                                    </div>
                            
                                )
                            }):''}
                        </div></>}
                        {(categorie==='categorie'||categorie==='video') && <>
                        <div class="blog1l">
                            <div class="blog1l1 bg-white" id="d-none" style={{display:'none'}}>
                                <div class="grid clearfix">
                                    <figure class="effect-jazz mb-0 "  id="id">
                                        <video src='' 
                                        className="w-100"
                                        controls
                                        autoPlay 
                                        controlsList="nodownload"
                                        preload  id="myimg" 
                                        type="video/mp4"
                                        height={480}
                                        >
                                            votre navigateur ne prend pas en charge cette video
                                        </video>
                                    </figure>
                                </div>
                                <div class="blog1l1i clearfix p-4">
                                    <h6 class="col_red">March 09, 2021 <span class="me-2 ms-2">|</span> {author}</h6>
                                    <h4 class="mt-3"><a href="#">{title}</a></h4>
                                    
                                </div>
                            </div>
                        </div>
                       
                        {/* <hr className="hr"/> */}
                        <div className={'upcome_2i row'+' '+ classname}>
                        {(contentrecom.length&&contentrecom.length>0)? contentrecom.filter(elt=>!video.some(item=>item.produit.id===elt.id)).slice(0,4).map((a,b)=>{
                            return(
                            <div className="col-sm-3">
                            <Components.Poster2 key={a.id}
                                name={a.nom}
                                author={a.author}
                                clickpanier={clickpanier}
                                download1={'yes'}
                                panier='yes'
                                elt={a}
                                poster={a.path_poster}
                                prix={a.prix+"FCFA"}
                                list={listuser}  
                                id={a.id}
                                like={resstar(evallist,mail,a.id)==-1?-1:resstar(evallist,mail,a.id).nbrstar}
                                id_eval={resstar(evallist,mail,a.id).id_eval}
                            />
                        </div>
                            )
                        }):''}
                        </div>
                        <div className="upcome_2i row">
                            {video.length? video.filter(elt=>(elt.user.email===mail)).map((a,b)=>{
                                return(
                                <div className="col-sm-3">
                                <Components.Poster2 key={a.id}
                                    name={a.produit.nom}
                                    author={a.produit.author}
                                    download={download}
                                    // type='bikusi'
                                    poster={a.path_poster}
                                    list={listuser}
                                    id={a.produit.id}
                                    like={resstar(evallist,mail,a.produit.id)==-1?-1:resstar(evallist,mail,a.produit.id).nbrstar}
                                    id_eval={resstar(evallist,mail,a.produit.id).id_eval}
                                />
                            </div>
                            
                                )
                            }):''}
                        </div>
                        </>}
                        {(categorie==='categorie'||categorie==='document') && <>
                        <div class="blog1l">
                            <div class="blog1l1 bg-white" id="dd-none" style={{display:'none'}}>
                                <div class="grid clearfix">
                                    <figure class="effect-jazz mb-0 "  id="id">
                                        <iframe src="img/Document/2_CNN.pdf#toolbar=0" 
                                        // sandbox="allow-same-origin"
                                        id="mydoc"
                                        className="w-100" 
                                        type="application/pdf"
                                        width={"100%"} 
                                        height={"600px"}
                                        >
                                            ce document n'est pas pris en charge par votre navigateur
                                        </iframe>
                                      
                                    </figure>
                                </div>
                                <div class="blog1l1i clearfix p-4">
                                    <h6 class="col_red">March 09, 2021 <span class="me-2 ms-2">|</span> {author}</h6>
                                    <h4 class="mt-3"><a href="#">{title}</a></h4>
                                    
                                </div>
                            </div>
                        </div>
                        <div className={'upcome_2i row'+' '+ classname2}>
                        {(contentrecomD.length&&contentrecomD.length>0)? contentrecomD.filter(elt=>!documents.some(item=>item.produit.id===elt.id)).slice(0,4).map((a,b)=>{
                            return(
                            <div className="col-sm-3">
                            <Components.Poster2 key={a.id}
                                name={a.nom}
                                author={a.author}
                                clickpanier={clickpanier}
                                downloadDoc1={'yes'}
                                panier='yes'
                                elt={a}
                                poster={a.path_poster}
                                prix={a.prix+"FCFA"}
                                list={listuser}  
                                id={a.id}
                                like={resstar(evallist,mail,a.id)==-1?-1:resstar(evallist,mail,a.id).nbrstar}
                                id_eval={resstar(evallist,mail,a.id).id_eval}
                            />
                        </div>
                            )
                        }):''}
                        </div>
                        <div class="upcome_2i row" >
                            {documents.length? documents.filter(elt=>(elt.user.email===mail)).map((a,b)=>{
                                return(
                                    <div className="col-sm-4" >
                                        <Components.Poster2 key={a.id}
                                            name={a.produit.nom}
                                            author={a.produit.author}
                                            download={downloadDoc}
                                            // type='bikusi'
                                            poster={a.path_poster}
                                            list={listuser}
                                            id={a.produit.id}
                                            like={resstar(evallist,mail,a.produit.id)==-1?-1:resstar(evallist,mail,a.produit.id).nbrstar}
                                            id_eval={resstar(evallist,mail,a.produit.id).id_eval}
                                        />
                                    </div>

                            
                                )
                            }):''}
                        </div></>}
	                </div>
                    {/* <div class="col-md-3">
                    {(categorie==='categorie'||categorie==='video') && <>
                        <div class="blog1r" id="d-none" style={{display:'none'}}>
                            <div class="blog1r2 shadow_box mt-4 p-3 bg-white">
                                <h5>RECENT NEWS</h5>
                                <hr class="line mb-3"/>
                                <div class="blog1r2i row">
                                    <div class="col-md-4 col-4 pe-0">
                                        <div class="blog1r2il">
                                            <div class="grid clearfix">
                                                <figure class="effect-jazz mb-0">
                                                    <a href="#"><img src="img/25.jpg" class="w-100" alt="abc"/></a>
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-8 col-8">
                                        <div class="blog1r2il">
                                            <p class="mb-1 lh-1"><a href="#">Lorem spum menus.</a></p>
                                            <h6 class="mb-0 col_red">10 June 2022</h6>
                                        </div>
                                    </div>
		                        </div><hr/>
                              
                                    <div class="col-md-8 col-8">
                                        <div class="blog1r2il">
                                            <p class="mb-1 lh-1"><a href="#">Lorem spum menus.</a></p>
                                            <h6 class="mb-0 col_red">10 June 2022</h6>
                                        </div>
                                    </div>
                                </div><hr/>
	                    </div>
                    </>}
	                </div> */}
                </div>
            </div>
        </section>

        </>
    )
}