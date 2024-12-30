import { NavLink, json } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';
import Header from "../basefront/header";
import Footer from "../basefront/footer";
import Components from "../component";
import { useEffect, useState } from "react";
import smartshopapi from "../smartshopapi";
import { jwtDecode } from "jwt-decode";
import Produit from "../admin/produit";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { click } from "@testing-library/user-event/dist/click";
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
export default function Home(){
	const storage=getStorage()
	let [categorie,setCategorie]=useState('video')
    const s_categorie={state:categorie,set:setCategorie}
	let [panier_list,setPanier_list]=useState([])
	const [documents,setDocument]=useState([])
    const [video,setVideo]=useState([])
    const [audio,setAudio]=useState([])
	const [document1,setDocument1]=useState([])
    const [video1,setVideo1]=useState([])
    const [audio1,setAudio1]=useState([])
	const[evallist,setEvallist]=useState([])
	const [listuser,setListuser]=useState([])
	
    useEffect(()=>{
		smartshopapi.get('public/download').then(
            res=>{
                const audio1=res.data.filter(elt=>((elt.produit.genre.libelle==='bikutsi'||elt.produit.genre.libelle==='makossa')&&elt.user.email===jwtDecode(localStorage.token).sub))
                const video1=res.data.filter(elt=>((elt.produit.genre.libelle==='comedie'||elt.produit.genre.libelle==='film'||elt.produit.genre.libelle==='serie')&&elt.user.email===jwtDecode(localStorage.token).sub))
				const doc=res.data.filter(elt=>((elt.produit.genre.libelle==='Oeuvre'||elt.produit.genre.libelle==='livre')&&elt.user.email===jwtDecode(localStorage.token).sub))
				setAudio1(audio1)
				setVideo1(video1)
				setDocument1(doc)
                })
                .catch(error => {
                    console.log(error);
        });
		if(categorie==='document'){
			smartshopapi.get('public/'+categorie+'s?userId='+localStorage.id,
			// {
			//     headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
			// }
			)
			.then(res => {
			const promises = res.data.map(item => {
			const storageRef = ref(storage, 'gs:/Document/' + item.path_poster);
			return getDownloadURL(storageRef)
				.then(url => {
				item.path_poster = url;
				})
				.catch(error => {
				console.error('Erreur lors de la récupération de l\'URL de téléchargement :', error);
				});
			});

			return Promise.all(promises)
			.then(() => {
				setDocument(res.data);
				console.log(res.data)
			});
			})
			.catch(error => {
				console.log(error);
			})
		}
		else if(categorie==='audio'){
		
			smartshopapi.get('public/'+categorie+'s?userId='+localStorage.id)
			.then(res => {
				console.log(res)
			const promises = res.data.map(item => {
			const storageRef = ref(storage, 'gs:/Audio/' + item.path_poster);
			return getDownloadURL(storageRef)
				.then(url => {
				item.path_poster = url;
				})
				.catch(error => {
				console.error('Erreur lors de la récupération de l\'URL de téléchargement :', error);
				});
			});

			return Promise.all(promises)
			.then(() => {
				setAudio(res.data);
			});
			})
			.catch(error => {
				console.log(error);
			})
		}
		else{
			smartshopapi.get('public/'+categorie+'s?userId='+localStorage.id)
			.then(res => {
			const promises = res.data.map(item => {
			const storageRef = ref(storage, 'gs:/video/' + item.path_poster);
			return getDownloadURL(storageRef)
				.then(url => {
				item.path_poster = url;
				})
				.catch(error => {
				console.error('Erreur lors de la récupération de l\'URL de téléchargement :', error);
				});
			});

			return Promise.all(promises)
			.then(() => {
				setVideo(res.data);
			});
			})
			.catch(error => {
				console.log(error);
			})
		};

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
    	},[categorie])
	const email=jwtDecode(localStorage.token).sub 
	console.log(categorie)
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
	console.log(jwtDecode(localStorage.token))
return(
<>
<Header
	s_categorie={s_categorie}
	download={localStorage.download}
/>
<section id="center" class="center_home">
<div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2" class="" aria-current="true"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
 
  <div class="carousel-inner">
  	{/* <Components.carousel banner="img/76085.jpg"/> */}
    <div class="carousel-item active">
      <img src="img/76086.jpg" class="d-block w-100" height='800px' width='1600px' alt="..."/>
	  <div class="carousel-caption d-md-block">
            <h5 class="text-uppercase bg_red d-inline-block p-2 text-white">Smart-shop</h5>
            <h1>Retrouvez vos aticles favories</h1>
            <p>Documents,Films,Musics</p>
            <ul class="mb-0 mt-3">
            <li  class="d-inline-block me-2"><a class="button_1" href="#">CONTACT US <i class="fa fa-long-arrow-right ms-1"></i></a></li>
            <li class="d-inline-block"><a class="button_2" href="#">ABOUT US  <i  class="fa fa-long-arrow-right ms-1"></i></a></li>
            </ul>
      </div>
    </div>
    <div class="carousel-item">
      <img src="img/76085.jpg" class="d-block w-100"height='800px' width='1600px' alt="..."/>
		<div class="carousel-caption d-md-block">
			<h5 class="text-uppercase bg_red d-inline-block p-2 text-white">Smart-shop</h5>
			<h1>Retrouvez vos aticles favories</h1>
			<p>Documents,Films,Musics</p>
			<ul class="mb-0 mt-3">
			<li  class="d-inline-block me-2"><a class="button_1" href="#">CONTACT US <i class="fa fa-long-arrow-right ms-1"></i></a></li>
			<li class="d-inline-block"><a class="button_2" href="#">ABOUT US  <i  class="fa fa-long-arrow-right ms-1"></i></a></li>
			</ul>
		</div>
    </div>
    <div class="carousel-item">
      <img src="img/76086.jpg" height='800px' width='1600px' class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-md-block">
            <h5 class="text-uppercase bg_red d-inline-block p-2 text-white">Smart-shop</h5>
            <h1>Retrouvez vos aticles favories</h1>
            <p>Documents,Films,Musics</p>
            <ul class="mb-0 mt-3">
            <li  class="d-inline-block me-2"><a class="button_1" href="#">CONTACT US <i class="fa fa-long-arrow-right ms-1"></i></a></li>
            <li class="d-inline-block"><a class="button_2" href="#">ABOUT US  <i  class="fa fa-long-arrow-right ms-1"></i></a></li>
            </ul>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</section>

<section id="upcome" class="p_3 bg-light">
	<div class="container-xl">
		{(categorie==='video' || categorie==='categorie')&&
		
		<div>
			<div class="row upcome_1 text-center">
				<div class="col-md-12">
					<h3 class="mb-0 invisible">Recommandation</h3>
					<hr class="line me-auto ms-auto"/>
					<ul class="nav nav-tabs justify-content-center border-0 mb-0 mt-4">
						<li class="nav-item">
							<a href="#home" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
								<span class="d-md-block">Comedies</span>
							</a>
						</li>
						<li class="nav-item">
							<a href="#profile" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
								<span class="d-md-block">Films</span>
							</a>
						</li>
						<li class="nav-item">
							<a href="#settings" data-bs-toggle="tab" aria-expanded="false" class="nav-link border-0">
								<span class="d-md-block">Series</span>
							</a>
						</li>

					</ul>
				</div>
			</div>
			<div class="row upcome_2 mt-4">
				<div class="tab-content">
					<div class="tab-pane active" id="home">
					
						<div class="upcome_2i row">
						{(video.length && categorie==='video')? video.filter(elt1 => !video1.some(elt2 => elt1.id === elt2.produit.id)).filter(elt=>elt.genre.libelle==='comedie').map((a,b)=>{
							return(
								<Components.Poster key={a.id}
									name={a.nom}
									author={a.author}
									description={a.description.substring(0,10)+'...'}
									duree={a.duree+"minutes"}
									prix={a.prix+"FCFA"}
									// type='bikusi'
									poster={a.path_poster}
									elt={a}
									clickpanier={clickpanier}
									list={listuser}
									id={a.id}
									like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
									id_eval={resstar(evallist,email,a.id).id_eval}
								/>
							)
						}):
						(video.length && categorie==='categorie')? video.filter(elt1 => !video1.some(elt2 => elt1.id === elt2.produit.id)).filter(elt=>elt.genre.libelle==='comedie').splice(0,4).map((a,b)=>{
							return(
								<Components.Poster key={a.id}
									name={a.nom}
									author={a.author}
									description={a.description.substring(0,10)+'...'}
									duree={a.duree+"minutes"}
									prix={a.prix+"FCFA"}
									// type='bikusi'
									poster={a.path_poster}
									elt={a}
									clickpanier={clickpanier}
									list={listuser}
									id={a.id}
									like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
									id_eval={resstar(evallist,email,a.id).id_eval}
								/>
							)
						}):''
						}
					</div>
					</div>
					<div class="tab-pane" id="profile">
						<div class="upcome_2i row">
							{(video.length&&categorie==='video')? video.filter(elt1 => !video1.some(elt2 => elt1.id === elt2.produit.id)).filter(elt=>elt.genre.libelle==='film').map((a,b)=>{
							return(
								<Components.Poster key={a.id}
									name={a.nom}
									author={a.author}
									description={a.description.substring(0,10)+'...'}
									duree={a.duree+"minutes"}
									prix={a.prix+"FCFA"}
									// type='bikusi'
									elt={a}
									poster={a.path_poster}
									clickpanier={clickpanier}
									list={listuser}
									id={a.id}
									like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
									id_eval={resstar(evallist,email,a.id).id_eval}
								/>
							)
							}):
							(video.length&&categorie==='categorie')? video.filter(elt1 => !video1.some(elt2 => elt1.id === elt2.produit.id)).filter(elt=>elt.genre.libelle==='film').splice(0,4).map((a,b)=>{
								return(
									<Components.Poster key={a.id}
										name={a.nom}
										author={a.author}
										description={a.description.substring(0,10)+'...'}
										duree={a.duree+"minutes"}
										prix={a.prix+"FCFA"}
										// type='bikusi'
										elt={a}
										poster={a.path_poster}
										clickpanier={clickpanier}
										list={listuser}
										id={a.id}
										like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
										id_eval={resstar(evallist,email,a.id).id_eval}
									/>
								)
								}):""
							}
						</div>
					</div>
					<div class="tab-pane " id="settings">
						<div class="upcome_2i row">
							{(video.length && categorie==='video')? video.filter(elt1 => !video1.some(elt2 => elt1.id === elt2.produit.id)).filter(elt=>elt.genre.libelle==='serie').map((a,b)=>{
								return(
									<Components.Poster key={a.id}
										name={a.nom}
										author={a.author}
										description={a.description.substring(0,10)+'...'}
										duree={a.duree+"minutes"}
										prix={a.prix+"FCFA"}
										// type='bikusi'
										elt={a}
										poster={a.path_poster}
										clickpanier={clickpanier}
										list={listuser}
										id={a.id}
										like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
										id_eval={resstar(evallist,email,a.id).id_eval}
									/>
								)
							}):
							(video.length && categorie==='categorie')? video.filter(elt1 => !video1.some(elt2 => elt1.id === elt2.produit.id)).filter(elt=>elt.genre.libelle==='serie').splice(0,4).map((a,b)=>{
								return(
									<Components.Poster key={a.id}
										name={a.nom}
										author={a.author}
										description={a.description.substring(0,10)+'...'}
										duree={a.duree+"minutes"}
										prix={a.prix+"FCFA"}
										// type='bikusi'
										elt={a}
										poster={a.path_poster}
										clickpanier={clickpanier}
										list={listuser}
										id={a.id}
										like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
										id_eval={resstar(evallist,email,a.id).id_eval}
									/>
								)
							}):""
							}
						</div>
					</div>
				</div>
			</div>
		</div>}
		{(categorie==='audio' || categorie==='categorie')&&
		<div>
			<div class="row upcome_1 text-center">
				<div class="col-md-12">
					<h3 class="mb-0 invisible">Recommandation</h3>
					<hr class="line me-auto ms-auto"/>
					<ul class="nav nav-tabs justify-content-center border-0 mb-0 mt-4">
						<li class="nav-item">
							<a href="#home2" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
								<span class="d-md-block">Bikutsi</span>
							</a>
						</li>
						<li class="nav-item">
							<a href="#profile2" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
								<span class="d-md-block">Makossa</span>
							</a>
						</li>
						{/* <li class="nav-item">
							<a href="#settings2" data-bs-toggle="tab" aria-expanded="false" class="nav-link border-0">
								<span class="d-md-block">Makossa</span>
							</a>
						</li> */}

					</ul>
				</div>
			</div>
			<div class="row upcome_2 mt-4">
				<div class="tab-content">
					<div class="tab-pane active" id="home2">
						<div class="upcome_2i row">
						{(audio.length && categorie==='audio')? audio.filter(elt1 => !audio1.some(elt2 => elt1.id === elt2.produit.id)).filter(elt=>elt.genre.libelle==='bikutsi').map((a,b)=>{
							return(
								<Components.Poster key={a.id}
									name={a.nom}
									author={a.author}
									description={a.description.substring(0,10)+'...'}
									duree={a.duree+"minutes"}
									prix={a.prix+"FCFA"}
									// type='bikusi'
									elt={a}
									poster={a.path_poster}
									clickpanier={clickpanier}
									list={listuser}
									id={a.id}
									like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
									id_eval={resstar(evallist,email,a.id).id_eval}
								/>
							)
						}):
						(audio.length && categorie==='categorie')? audio.filter(elt1 => !audio1.some(elt2 => elt1.id === elt2.produit.id)).filter(elt=>elt.genre.libelle==='bikutsi').splice(0,4).map((a,b)=>{
							return(
								<Components.Poster key={a.id}
									name={a.nom}
									author={a.author}
									description={a.description.substring(0,10)+'...'}
									duree={a.duree+"minutes"}
									prix={a.prix+"FCFA"}
									// type='bikusi'
									elt={a}
									poster={a.path_poster}
									clickpanier={clickpanier}
									list={listuser}
									id={a.id}
									like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
									id_eval={resstar(evallist,email,a.id).id_eval}
								/>
							)
						}):""}
						</div>
					</div>
					<div class="tab-pane" id="profile2">
						<div class="upcome_2i row">
							{(audio.length&&categorie==='audio')? audio.filter(elt1 => !audio1.some(elt2 => elt1.id === elt2.produit.id)).filter(elt=>elt.genre.libelle==='Makossa').map((a,b)=>{
								return(
									<Components.Poster key={a.id}
										name={a.nom}
										author={a.author}
										description={a.description.substring(0,10)+'...'}
										duree={a.duree+"minutes"}
										prix={a.prix+"FCFA"}
										// type='bikusi'
										elt={a}
										poster={a.path_poster}
										list={listuser}
										clickpanier={clickpanier}
										id={a.id}
										like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
										id_eval={resstar(evallist,email,a.id).id_eval}
									/>
								)
							}):(audio.length&&categorie==='categorie')? audio.filter(elt1 => !audio1.some(elt2 => elt1.id === elt2.produit.id)).filter(elt=>elt.genre.libelle==='Makossa').splice(0.4).map((a,b)=>{
								return(
									<Components.Poster key={a.id}
										name={a.nom}
										author={a.author}
										description={a.description.substring(0,10)+'...'}
										duree={a.duree+"minutes"}
										prix={a.prix+"FCFA"}
										// type='bikusi'
										elt={a}
										poster={a.path_poster}
										clickpanier={clickpanier}
										list={listuser}
										id={a.id}
										like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
										id_eval={resstar(evallist,email,a.id).id_eval}
									/>
								)
							}):""
							}
						</div>
					</div>
					{/* <div class="tab-pane " id="settings2">
						<div class="upcome_2i row">
							{(audio.length&&categorie==='Audio')? audio.filter(elt=>elt.genre.libelle==='bikutsi').map((a,b)=>{
								return(
									<Components.Poster key={a.id}
										name={a.nom}
										author={a.author}
										description={a.description.substring(0,10)+'...'}
										duree={a.duree+"minutes"}
										prix={a.prix+"FCFA"}
										// type='bikusi'
										poster={a.path_poster}
										list={listuser}
										id={a.id}
										like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
										id_eval={resstar(evallist,email,a.id).id_eval}
									/>
								)
							}):
							(audio.length&&categorie==='categorie')? audio.filter(elt=>elt.genre.libelle==='bikutsi').splice(0,4).map((a,b)=>{
								return(
									<Components.Poster key={a.id}
										name={a.nom}
										author={a.author}
										description={a.description.substring(0,10)+'...'}
										duree={a.duree+"minutes"}
										prix={a.prix+"FCFA"}
										// type='bikusi'
										poster={a.path_poster}
										list={listuser}
										id={a.id}
										like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
										id_eval={resstar(evallist,email,a.id).id_eval}
									/>
								)
							}):''}
						</div>
					</div> */}
				</div>
			</div>
		</div>}
		{(categorie==='document' || categorie==='categorie')&&
		<div>
			<div class="row upcome_1 text-center">
				<div class="col-md-12">
					<h3 class="mb-0 invisible">Recommandation</h3>
					<hr class="line me-auto ms-auto"/>
					<ul class="nav nav-tabs justify-content-center border-0 mb-0 mt-4">
						<li class="nav-item">
							<a href="#home1" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
								<span class="d-md-block">Livres</span>
							</a>
						</li>
						<li class="nav-item">
							<a href="#profile1" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
								<span class="d-md-block">Oeuvres</span>
							</a>
						</li>
						{/* <li class="nav-item">
							<a href="#settings1" data-bs-toggle="tab" aria-expanded="false" class="nav-link border-0">
								<span class="d-md-block">Oeuvres</span>
							</a>
						</li> */}

					</ul>
				</div>
			</div>
			<div class="row upcome_2 mt-4">
				<div class="tab-content">
					<div class="tab-pane active" id="home1">				
						<div class="upcome_2i row">
						{(documents.length&&categorie==="document")? documents.filter(elt1 => !document1.some(elt2 => elt1.id === elt2.produit.id)).filter(elt=>elt.genre.libelle==='livre').map((a,b)=>{
							return(
								<Components.Poster key={a.id}
									name={a.nom}
									author={a.author}
									description={a.description.substring(0,20)+'...'}
									pages={a.nbrePage+"pages"}
									prix={a.prix+"FCFA"}
									// type='bikusi'
									elt={a}
									poster={a.path_poster}
									list={listuser}
									clickpanier={clickpanier}
									id={a.id}
									like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
									id_eval={resstar(evallist,email,a.id).id_eval}
								/>
							)
						}):(documents.length&&categorie==="categorie")? documents.filter(elt1 => !document1.some(elt2 => elt1.id === elt2.produit.id)).filter(elt=>elt.genre.libelle==='livre').splice(0,4).map((a,b)=>{
							return(
								<Components.Poster key={a.id}
									name={a.nom}
									author={a.author}
									description={a.description.substring(0,20)+'...'}
									pages={a.nbrePage+"pages"}
									prix={a.prix+"FCFA"}
									// type='bikusi'
									elt={a}
									poster={a.path_poster}
									clickpanier={clickpanier}
									list={listuser}
									id={a.id}
									like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
									id_eval={resstar(evallist,email,a.id).id_eval}
								/>
							)
						}):<></>
						}
					</div>
					</div>
					<div class="tab-pane" id="profile1">
						<div class="upcome_2i row">
						{(documents.length&&categorie==='document')? documents.filter(elt1 => !document1.some(elt2 => elt1.id === elt2.produit.id)).filter(elt=>elt.genre.libelle==='Oeuvre').map((a,b)=>{
							return(
								<Components.Poster key={a.id}
									name={a.nom}
									author={a.author}
									description={a.description.substring(0,20)+'...'}
									pages={a.nbrePage+"pages"}
									prix={a.prix+"FCFA"}
									// type='bikusi'
									elt={a}
									poster={a.path_poster}
									clickpanier={clickpanier}
									list={listuser}
									id={a.id}
									like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
									id_eval={resstar(evallist,email,a.id).id_eval}
								/>
							)
						}):(documents.length&&categorie==='categorie')? documents.filter(elt1 => !document1.some(elt2 => elt1.id === elt2.produit.id)).filter(elt=>elt.genre.libelle==='Oeuvre').splice(0,4).map((a,b)=>{
							return(
								<Components.Poster key={a.id}
									name={a.nom}
									author={a.author}
									description={a.description.substring(0,20)+'...'}
									pages={a.nbrePage+"pages"}
									prix={a.prix+"FCFA"}
									clickpanier={clickpanier}
									// type='bikusi'
									elt={a}
									poster={a.path_poster}
									list={listuser}
									id={a.id}
									like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
									id_eval={resstar(evallist,email,a.id).id_eval}
								/>
							)
						}):<></>
						}
						</div>
					</div>
					{/* <div class="tab-pane " id="settings1">
						<div class="upcome_2i row">
						{(document.length&&categorie==="Document")? document.filter(elt=>elt.genre.libelle==='Oeuvre').map((a,b)=>{
							return(
								<Components.Poster key={a.id}
									name={a.nom}
									author={a.author}
									description={a.description.substring(0,20)+'...'}
									pages={a.nbrePage+"pages"}
									prix={a.prix+"FCFA"}
									// type='bikusi'
									poster={a.path_poster}
									list={listuser}
									id={a.id}
									like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
									id_eval={resstar(evallist,email,a.id).id_eval}
								/>
							)
						}):(document.length&&categorie==="categorie")? document.filter(elt=>elt.genre.libelle==='Oeuvre').slice(0,4).map((a,b)=>{
							return(
								<Components.Poster key={a.id}
									name={a.nom}
									author={a.author}
									description={a.description.substring(0,20)+'...'}
									pages={a.nbrePage+"pages"}
									prix={a.prix+"FCFA"}
									// type='bikusi'
									poster={a.path_poster}
									list={listuser}
									id={a.id}
									like={resstar(evallist,email,a.id)==-1?-1:resstar(evallist,email,a.id).nbrstar}
									id_eval={resstar(evallist,email,a.id).id_eval}
								/>
							)
						}):<></>
						}
						</div>
					</div> */}
				</div>
			</div>
		</div>}
 	</div>
</section>

{/* <section id="release">
 <div class="release_m clearfix">
   <div class="container-xl">
     <div class="row release_1">
	  <div class="col-md-7">
	   <div class="release_1i">
	   
	   </div>
	  </div>
	  <div class="col-md-5">
	   <div class="release_1i1 text-center">
	    <h6 class="text-uppercase bg_red d-inline-block p-2 pe-4 ps-4 text-white">Reserver aux publicites</h6>
		<h3 class="text-white icon_line mt-3 text-uppercase">date</h3>
		<h1 class="text-uppercase font_50 text-white mt-3">nom du de l'ouvrage</h1>
		<h4 class="text-white mt-3 mb-0">presente par: maison de production</h4>
	   </div>
	  </div>
	 </div>
   </div>
 </div>
</section> */}

{/* <section id="popular" class="p_3 bg-light">
 <div class="container-xl">
  <div class="row upcome_1 text-center">
   <div class="col-md-12">
     <h3 class="mb-0">All</h3>
	 <hr class="line me-auto ms-auto"/>
	 <ul class="nav nav-tabs justify-content-center border-0 mb-0 mt-4">
    <li class="nav-item">
        <a href="#homeo" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
            <span class="d-md-block">type1</span>
        </a>
    </li>
    <li class="nav-item">
        <a href="#profileo" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
            <span class="d-md-block">type2</span>
        </a>
    </li>
    <li class="nav-item">
        <a href="#settingso" data-bs-toggle="tab" aria-expanded="false" class="nav-link border-0">
            <span class="d-md-block">type3</span>
        </a>
    </li>

</ul>
   </div>
  </div>
  <div class="row upcome_2 mt-4">
    <div class="tab-content">
    <div class="tab-pane active" id="homeo">
		{categorie=='video' &&
			<div class="upcome_2i row">
				<Components.Poster
					name='xxxx'
					type='action ,drama'
					poster='img/4.jpg'
				/>
				<Components.Poster
					name='xxxx'
					type='action ,drama'
					poster='img/4.jpg'
				/>
				<Components.Poster
					name='xxxx'
					type='action ,drama'
					poster='img/4.jpg'
				/>
				<Components.Poster
					name='xxxx'
					type='action ,drama'
					poster='img/Audio/lp_ventre_bas_ventre.jpeg'
				/>		
			</div>		
	   }
		{categorie=='audio' &&
			<div class="upcome_2i row">
				<Components.Poster
					name='xxxx'
					type='action ,drama'
					poster='img/4.jpg'
				/>
				<Components.Poster
					name='xxxx'
					type='action ,drama'
					poster='img/4.jpg'
				/>
				<Components.Poster
					name='xxxx'
					type='action ,drama'
					poster='img/4.jpg'
				/>
				<Components.Poster
					name='xxxx'
					type='action ,drama'
					poster='img/Audio/lp_ventre_bas_ventre.jpeg'
				/>		
			</div>		
	   }
	   {categorie=='document' &&
			<div class="upcome_2i row">
				<Components.Poster
					name='xxxx'
					type='action ,drama'
					poster='img/4.jpg'
				/>
				<Components.Poster
					name='xxxx'
					type='action ,drama'
					poster='img/4.jpg'
				/>
				<Components.Poster
					name='xxxx'
					type='action ,drama'
					poster='img/4.jpg'
				/>
				<Components.Poster
					name='xxxx'
					type='action ,drama'
					poster='img/Audio/lp_ventre_bas_ventre.jpeg'
				/>		
			</div>		
	   }

    </div>		  

</div>
  </div>
 </div>
</section> */}


{/* <section id="gallery" class="p_3 bg-light">
 <div class="container-xl">
  <div class="row upcome_1 text-center">
   <div class="col-md-12">
     <h3 class="mb-0">VIDEO & PHOTOS</h3>
	 <hr class="line me-auto ms-auto"/>
   </div>
  </div>
  <div class="row gallery_1 mt-3">
   <div class="col-md-2 pe-0">
    <div class="gallery_1lm clearfix position-relative">
	 <div class="gallery_1lm1 clearfix">
	  <img src="img/25.jpg" class="w-100" height="150" alt="abc"/>
	 </div>
	 <div class="gallery_1lm2 clearfix position-absolute w-100 text-center top-0 bg_light h-100">
	  <span><a class="col_red bg-white d-inline-block text-center" href="#"><i class="fa fa-search"></i></a></span>
	 </div>
	</div>
	<div class="gallery_1lm clearfix position-relative mt-3">
	 <div class="gallery_1lm1 clearfix">
	  <img src="img/26.jpg" class="w-100" height="150" alt="abc"/>
	 </div>
	 <div class="gallery_1lm2 clearfix position-absolute w-100 text-center top-0 bg_light h-100">
	  <span><a class="col_red bg-white d-inline-block text-center" href="#"><i class="fa fa-search"></i></a></span>
	 </div>
	</div>
	<div class="gallery_1lm clearfix position-relative mt-3">
	 <div class="gallery_1lm1 clearfix">
	  <img src="img/27.jpg" class="w-100" height="150" alt="abc"/>
	 </div>
	 <div class="gallery_1lm2 clearfix position-absolute w-100 text-center top-0 bg_light h-100">
	  <span><a class="col_red bg-white d-inline-block text-center" href="#"><i class="fa fa-search"></i></a></span>
	 </div>
	</div>
   </div>
   <div class="col-md-8">
    <div class="gallery_1m">
	  <div id="carouselExampleCaptions4" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions4" data-bs-slide-to="0" class="active" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions4" data-bs-slide-to="1" aria-label="Slide 2" class="" aria-current="true"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions4" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="img/1.jpg" height="482" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="img/2.jpg" height="482" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="img/3.jpg" height="482" class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions4" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions4" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
	</div>
   </div>
   <div class="col-md-2 ps-0">
    <div class="gallery_1lm clearfix position-relative">
	 <div class="gallery_1lm1 clearfix">
	  <img src="img/28.jpg" class="w-100" height="150" alt="abc"/>
	 </div>
	 <div class="gallery_1lm2 clearfix position-absolute w-100 text-center top-0 bg_light h-100">
	  <span><a class="col_red bg-white d-inline-block text-center" href="#"><i class="fa fa-search"></i></a></span>
	 </div>
	</div>
	<div class="gallery_1lm clearfix position-relative mt-3">
	 <div class="gallery_1lm1 clearfix">
	  <img src="img/29.jpg" class="w-100" height="150" alt="abc"/>
	 </div>
	 <div class="gallery_1lm2 clearfix position-absolute w-100 text-center top-0 bg_light h-100">
	  <span><a class="col_red bg-white d-inline-block text-center" href="#"><i class="fa fa-search"></i></a></span>
	 </div>
	</div>
	<div class="gallery_1lm clearfix position-relative mt-3">
	 <div class="gallery_1lm1 clearfix">
	  <img src="img/30.jpg" class="w-100" height="150" alt="abc"/>
	 </div>
	 <div class="gallery_1lm2 clearfix position-absolute w-100 text-center top-0 bg_light h-100">
	  <span><a class="col_red bg-white d-inline-block text-center" href="#"><i class="fa fa-search"></i></a></span>
	 </div>
	</div>
   </div>
  </div>
 </div>
</section> */}

{/* <section id="subs" class="pt-5 pb-5 bg_red">
 <div class="container-xl">
   <div class="row subs_1">
    <div class="col-md-4">
	 <div class="subs_1l">
	  <h4 class="text-white mb-0 mt-2">GET UPDATE SIGN UP NOW !</h4>
	 </div>
	</div>
	<div class="col-md-8">
	 <div class="subs_1r">
	   <div class="input-group">
				<input type="text" class="form-control bg-transparent" placeholder="Enter Your Email"/>
				<span class="input-group-btn">
					<button class="btn btn-primary bg-white col_red" type="button">
						Submit </button>
				</span>
		</div>
	 </div>
	</div>
   </div>
 </div>
</section> */}
{/* <Footer/> */}
</>

)
}