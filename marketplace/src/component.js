import { useEffect, useState } from "react"
import Translate from "./Translate/translate";
import smartshopapi from "./smartshopapi";
import { type } from "@testing-library/user-event/dist/type";
import { jwtDecode } from "jwt-decode";
import 'firebase/storage';
import firebase from "firebase/compat/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { upload } from "@testing-library/user-event/dist/upload";
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

function handleChange(key, e, s_hooking, v_hooking){
    const {state, set: setState} = s_hooking
    let new_val = {...state};
    new_val[key] = e.target.value;
    setState(new_val);
    //
    const {state: invalid, set: setInvalid} = v_hooking
    if (invalid[key]){
        let new_inv = {...invalid};
        new_inv[key] = false;
        setInvalid(new_inv)
    }
    // console.log(new_val)
}
const infouser=(list,email)=>{
    return list.filter(item=>item.email==email)[0]
}
const Poster=(props)=>{
    let [nbrstar,setNbrstar]=useState(0)
    const [state,setState]=useState(0)
    const click2=(a,b)=>{
        const id=document.getElementById(a)
        if(state===0){
            id.style.backgroundColor='#ff4444'
            id.style.color='#fff'
            props.clickpanier(b,state);
            setState(1)
        }
        else if(state===1){
            id.style.backgroundColor='#fff'
            id.style.color='#ff4444'
            props.clickpanier(b,state);
            setState(0)
            
        } 
       
    }
    const addStar=(star)=>{
        const email=jwtDecode(localStorage.token).sub 
        const info=infouser(props.list,email)
        // cette fonction permet dajouter et de retirer les etoiles
        // lorsquon clique sur une etoile si elle est deja rouge cela signifie 
        // que lutilisateur veut l'enlever dont la couleur devient berge
        // si letoile 4 par et elle est berge exemple est choisie automatique toutes les etoile precedente deviennent rouge
        // si par contre elle est rouge toutes les etoile qui la suivent y compris elle meme deviennent automatiquement berge
       const star0=document.getElementById(props.name)
       const star1=document.getElementById(props.name+"1")
       const star2=document.getElementById(props.name+"2")
       const star3=document.getElementById(props.name+"3")
       const star4=document.getElementById(props.name+"4")
       if(star===props.name){
            if(star0.style.color==='red'){
                star0.style.color='#f5cbcb'
            }
            else{
                star0.style.color='red'
            }
            
       }
       else if(star===props.name+"1"){
            if(star1.style.color==='red'){
                star1.style.color='#f5cbcb'
                star2.style.color='#f5cbcb'
                star3.style.color='#f5cbcb'
                star4.style.color='#f5cbcb'
            }
            else{
            star0.style.color='red'
            star1.style.color='red'
            }
       }
       else if(star===props.name+"2"){
            if(star2.style.color==='red'){
                star2.style.color='#f5cbcb'
                star3.style.color='#f5cbcb'
                star4.style.color='#f5cbcb'
            }
            else{
                star0.style.color='red'
                star1.style.color='red'
                star2.style.color='red'
            }
            
        }
        else if(star===props.name+"3"){
            if(star3.style.color==='red'){
                star3.style.color='#f5cbcb'
                star4.style.color='#f5cbcb'
            }
            else{
                star0.style.color='red'
                star1.style.color='red'
                star2.style.color='red'
                star3.style.color='red'
            }
            
         }
         else if(star===props.name+"4"){
            if(star4.style.color==='red'){
                star4.style.color='#f5cbcb'
            }
            else{
                star0.style.color='red'
                star1.style.color='red'
                star2.style.color='red'
                star3.style.color='red'
                star4.style.color='red'
            }
         }
        if(star0.style.color==='red'){
            nbrstar=1
            setNbrstar(nbrstar)
        }
        if(star1.style.color==='red'){
            nbrstar=2
            setNbrstar(nbrstar)
        }
        if(star2.style.color==='red'){
            nbrstar=3
            setNbrstar(nbrstar)
        }
        if(star3.style.color==='red'){
            nbrstar=4
            setNbrstar(nbrstar)
        }
        if(star4.style.color==='red'){
            nbrstar=5
            setNbrstar(nbrstar)
        } 
        const evall={
            nbrstar:nbrstar,
            commentaire:"ces't beau",
            produit:{
                id:props.id
            },
            user:{
                id:info?info.id:''
            }
        }
        console.log(evall)
        if(props.like==-1){
            smartshopapi.post('public/eval',evall).then(
                res=>{
                    console.log(res)
                }
            ).catch(
                err=>{
                    console.log(err)
                }
            )    
        }
        else{
            smartshopapi.put('public/eval/'+props.id_eval,evall).then(
                res=>{
                    console.log(res)
                }
            ).catch(
                err=>{
                    console.log(err)
                }
            )    
        }
    }
    
    return(
        <>
        <div class="col-md-3">
		  <div class="upcome_2i1 clearfix position-relative">
		   <div class="upcome_2i1i clearfix">
		    <img src={props.poster} class="w-100" alt="abc" width='270' height='330'/>
		   </div>
		   {/* <div class="upcome_2i1i1 clearfix position-absolute top-0 text-center w-100">
		    <h6 class="text-uppercase"><a class="button_1" href="#">View Trailer</a></h6>
			<h6 class="text-uppercase mb-0"><a class="button_2" href="#">View Details</a></h6>
		   </div> */}
		  </div>
		   <div class="upcome_2i_last bg-white p-3">
		     <div class="upcome_2i_lasti row">
			  <div class="col-md-9 col-9">
			   <div class="upcome_2i_lastil">
                    <h5><a href="#">{props.name}</a></h5>
                    <h6>{'Auteur: '+props.author}</h6>
                    <h6>{'Prix :'+props.prix}</h6>
                    <h6 class="text-muted">{props.type}</h6>
                    <h6 class="text-muted small">{props.description}</h6>
                    <h6 class="text-muted small">{props.duree}</h6>
                    {(props.like===0 || props.like==-1) &&
                    <>
                        <span class="col_light" id={props.name} onClick={()=>addStar(props.name)}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"1"} onClick={()=>addStar(props.name+"1")}>
                             <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"2"} onClick={()=>addStar(props.name+"2")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"3"} onClick={()=>addStar(props.name+"3")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"4"} onClick={()=>addStar(props.name+"4")}>
                            <i class="fa fa-star"></i>
                        </span>
                    </>
                    }
                    {props.like===1 &&
                    <>
                        <span class="col_red" id={props.name} onClick={()=>addStar(props.name)}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"1"} onClick={()=>addStar(props.name+"1")}>
                             <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"2"} onClick={()=>addStar(props.name+"2")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"3"} onClick={()=>addStar(props.name+"3")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"4"} onClick={()=>addStar(props.name+"4")}>
                            <i class="fa fa-star"></i>
                        </span>
                    </>
                    }
                    {props.like===2 &&
                    <>
                        <span class="col_red" id={props.name} onClick={()=>addStar(props.name)}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"1"} onClick={()=>addStar(props.name+"1")}>
                             <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"2"} onClick={()=>addStar(props.name+"2")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"3"} onClick={()=>addStar(props.name+"3")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"4"} onClick={()=>addStar(props.name+"4")}>
                            <i class="fa fa-star"></i>
                        </span>
                    </>
                    }
                    {props.like===3 &&
                    <>
                        <span class="col_red" id={props.name} onClick={()=>addStar(props.name)}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"1"} onClick={()=>addStar(props.name+"1")}>
                             <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"2"} onClick={()=>addStar(props.name+"2")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"3"} onClick={()=>addStar(props.name+"3")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"4"} onClick={()=>addStar(props.name+"4")}>
                            <i class="fa fa-star"></i>
                        </span>
                    </>
                    }
                    {props.like===4 &&
                    <>
                        <span class="col_red" id={props.name} onClick={()=>addStar(props.name)}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"1"} onClick={()=>addStar(props.name+"1")}>
                             <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"2"} onClick={()=>addStar(props.name+"2")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"3"} onClick={()=>addStar(props.name+"3")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"4"} onClick={()=>addStar(props.name+"4")}>
                            <i class="fa fa-star"></i>
                        </span>
                    </>
                    }
                    {props.like===5 &&
                    <>
                        <span class="col_red" id={props.name} onClick={()=>addStar(props.name)}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"1"} onClick={()=>addStar(props.name+"1")}>
                             <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"2"} onClick={()=>addStar(props.name+"2")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"3"} onClick={()=>addStar(props.name+"3")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"4"} onClick={()=>addStar(props.name+"4")}>
                            <i class="fa fa-star"></i>
                        </span>
                    </>
                    }
				
			  </div>
              </div>
			  <div class="col-md-3 p-0 col-3 ">
			   <div class="upcome_2i_lastir pt-3" onClick={()=>{click2(props.author+props.name,props.elt)}}>
			     <span><a id={props.author+props.name}  class="col_red rounded"><i class="fa fa-shopping-cart"></i></a></span>
			   </div>
			  </div>
			 </div>
		   </div>
		 </div>
		 </>
    )
}
const Poster2=(props)=>{
    let [nbrstar,setNbrstar]=useState(0)
    const [state,setState]=useState(0)
    const click2=(a,b)=>{
        const id=document.getElementById(a)
        if(state===0){
            id.style.backgroundColor='#ff4444'
            id.style.color='#fff'
            props.clickpanier(b,state);
            setState(1)
        }
        else if(state===1){
            id.style.backgroundColor='#fff'
            id.style.color='#ff4444'
            props.clickpanier(b,state);
            setState(0)
            
        } 
       
    }
    const addStar=(star)=>{
        const email=jwtDecode(localStorage.token).sub 
        const info=infouser(props.list,email)
        // cette fonction permet dajouter et de retirer les etoiles
        // lorsquon clique sur une etoile si elle est deja rouge cela signifie 
        // que lutilisateur veut l'enlever dont la couleur devient berge
        // si letoile 4 par et elle est berge exemple est choisie automatique toutes les etoile precedente deviennent rouge
        // si par contre elle est rouge toutes les etoile qui la suivent y compris elle meme deviennent automatiquement berge
       const star0=document.getElementById(props.name)
       const star1=document.getElementById(props.name+"1")
       const star2=document.getElementById(props.name+"2")
       const star3=document.getElementById(props.name+"3")
       const star4=document.getElementById(props.name+"4")
       if(star===props.name){
            if(star0.style.color==='red'){
                star0.style.color='#f5cbcb'
            }
            else{
                star0.style.color='red'
            }
            
       }
       else if(star===props.name+"1"){
            if(star1.style.color==='red'){
                star1.style.color='#f5cbcb'
                star2.style.color='#f5cbcb'
                star3.style.color='#f5cbcb'
                star4.style.color='#f5cbcb'
            }
            else{
            star0.style.color='red'
            star1.style.color='red'
            }
       }
       else if(star===props.name+"2"){
            if(star2.style.color==='red'){
                star2.style.color='#f5cbcb'
                star3.style.color='#f5cbcb'
                star4.style.color='#f5cbcb'
            }
            else{
                star0.style.color='red'
                star1.style.color='red'
                star2.style.color='red'
            }
            
        }
        else if(star===props.name+"3"){
            if(star3.style.color==='red'){
                star3.style.color='#f5cbcb'
                star4.style.color='#f5cbcb'
            }
            else{
                star0.style.color='red'
                star1.style.color='red'
                star2.style.color='red'
                star3.style.color='red'
            }
            
         }
         else if(star===props.name+"4"){
            if(star4.style.color==='red'){
                star4.style.color='#f5cbcb'
            }
            else{
                star0.style.color='red'
                star1.style.color='red'
                star2.style.color='red'
                star3.style.color='red'
                star4.style.color='red'
            }
         }
        if(star0.style.color==='red'){
            nbrstar=1
            setNbrstar(nbrstar)
        }
        if(star1.style.color==='red'){
            nbrstar=2
            setNbrstar(nbrstar)
        }
        if(star2.style.color==='red'){
            nbrstar=3
            setNbrstar(nbrstar)
        }
        if(star3.style.color==='red'){
            nbrstar=4
            setNbrstar(nbrstar)
        }
        if(star4.style.color==='red'){
            nbrstar=5
            setNbrstar(nbrstar)
        } 
        const evall={
            nbrstar:nbrstar,
            commentaire:"ces't beau",
            produit:{
                id:props.id
            },
            user:{
                id:info?info.id:''
            }
        }
        console.log(evall)
        if(props.like==-1){
            smartshopapi.post('public/eval',evall).then(
                res=>{
                    console.log(res)
                }
            ).catch(
                err=>{
                    console.log(err)
                }
            )    
        }
        else{
            smartshopapi.put('public/eval/'+props.id_eval,evall).then(
                res=>{
                    console.log(res)
                }
            ).catch(
                err=>{
                    console.log(err)
                }
            )    
        }
    }
    
    return(
        <>
		  <div class="upcome_2i1 clearfix position-relative">
		   <div class="upcome_2i1i clearfix">
		    {props.downloadDoc&&<a  href="#"><img src={props.poster} onClick={() => props.downloadDoc(props.name,props.author,props.id)} class="w-100" alt="abc" width='270' height='330'/></a>}
            {props.downloadDoc1&&<img src={props.poster} class="w-100" alt="abc" width='270' height='330'/>}

            {props.download&& <a  href="#"><img src={props.poster} onClick={() => props.download(props.name,props.author,props.id)} class="w-100" alt="abc" width='270' height='330'/></a>}
            {props.download1&&<img src={props.poster}  class="w-100" alt="abc" width='270' height='330'/>}

		    {props.downloadAudio&&<a><img  href="#" src={props.poster} onClick={() => props.downloadAudio(props.name,props.author,props.id)} class="w-100" alt="abc" width='270' height='330'/></a>}
            {props.downloadAudio1&&<img src={props.poster}  class="w-100" alt="abc" width='270' height='330'/>}

		   </div>
		   {/* <div class="upcome_2i1i1 clearfix position-absolute top-0 text-center w-100">
		    <h6 class="text-uppercase"><a class="button_1" href="#">View Trailer</a></h6>
			<h6 class="text-uppercase mb-0"><a class="button_2" href="#">View Details</a></h6>
		   </div> */}
		  </div>
		   <div class="upcome_2i_last bg-white p-3">
		     <div class="upcome_2i_lasti row">
			  <div class="col-md-9 col-9">
			   <div class="upcome_2i_lastil">
                    <h5><a href="#">{props.name}</a></h5>
                    <h6>{'Auteur: '+props.author}</h6>
                    {props.prix&&<h6>{'Prix :'+props.prix}</h6>}
                    <h6 class="text-muted">{props.type}</h6>
                    <h6 class="text-muted small">{props.description}</h6>
                    <h6 class="text-muted small">{props.duree}</h6>
                    {(props.like===0 || props.like==-1) &&
                    <>
                        <span class="col_light" id={props.name} onClick={()=>addStar(props.name)}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"1"} onClick={()=>addStar(props.name+"1")}>
                             <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"2"} onClick={()=>addStar(props.name+"2")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"3"} onClick={()=>addStar(props.name+"3")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"4"} onClick={()=>addStar(props.name+"4")}>
                            <i class="fa fa-star"></i>
                        </span>
                    </>
                    }
                    {props.like===1 &&
                    <>
                        <span class="col_red" id={props.name} onClick={()=>addStar(props.name)}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"1"} onClick={()=>addStar(props.name+"1")}>
                             <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"2"} onClick={()=>addStar(props.name+"2")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"3"} onClick={()=>addStar(props.name+"3")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"4"} onClick={()=>addStar(props.name+"4")}>
                            <i class="fa fa-star"></i>
                        </span>
                    </>
                    }
                    {props.like===2 &&
                    <>
                        <span class="col_red" id={props.name} onClick={()=>addStar(props.name)}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"1"} onClick={()=>addStar(props.name+"1")}>
                             <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"2"} onClick={()=>addStar(props.name+"2")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"3"} onClick={()=>addStar(props.name+"3")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"4"} onClick={()=>addStar(props.name+"4")}>
                            <i class="fa fa-star"></i>
                        </span>
                    </>
                    }
                    {props.like===3 &&
                    <>
                        <span class="col_red" id={props.name} onClick={()=>addStar(props.name)}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"1"} onClick={()=>addStar(props.name+"1")}>
                             <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"2"} onClick={()=>addStar(props.name+"2")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"3"} onClick={()=>addStar(props.name+"3")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"4"} onClick={()=>addStar(props.name+"4")}>
                            <i class="fa fa-star"></i>
                        </span>
                    </>
                    }
                    {props.like===4 &&
                    <>
                        <span class="col_red" id={props.name} onClick={()=>addStar(props.name)}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"1"} onClick={()=>addStar(props.name+"1")}>
                             <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"2"} onClick={()=>addStar(props.name+"2")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"3"} onClick={()=>addStar(props.name+"3")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_light" id={props.name+"4"} onClick={()=>addStar(props.name+"4")}>
                            <i class="fa fa-star"></i>
                        </span>
                    </>
                    }
                    {props.like===5 &&
                    <>
                        <span class="col_red" id={props.name} onClick={()=>addStar(props.name)}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"1"} onClick={()=>addStar(props.name+"1")}>
                             <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"2"} onClick={()=>addStar(props.name+"2")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"3"} onClick={()=>addStar(props.name+"3")}>
                            <i class="fa fa-star"></i>
                        </span>
                        <span class="col_red" id={props.name+"4"} onClick={()=>addStar(props.name+"4")}>
                            <i class="fa fa-star"></i>
                        </span>
                    </>
                    }
				
			  </div>
              </div>
			 {props.panier && <div class="col-md-3 p-0 col-3">
			   <div class="upcome_2i_lastir pt-3" onClick={()=>{click2(props.author+props.name,props.elt)}}>
			     <span><a id={props.author+props.name}  class="col_red rounded"><i class="fa fa-shopping-cart"></i></a></span>
			   </div>
			  </div>}
			 </div>
		   </div>
		 </>
    )
}
const Dialog=()=>{
    return(
        <div class="carousel-caption d-md-block">
            <h5 class="text-uppercase bg_red d-inline-block p-2 text-white">Smart-shop</h5>
            <h1>Retrouvez vos aticles favories</h1>
            <p>Documents,Films,Musics</p>
            <ul class="mb-0 mt-3">
            <li  class="d-inline-block me-2"><a class="button_1" href="#">CONTACT US <i class="fa fa-long-arrow-right ms-1"></i></a></li>
            <li class="d-inline-block"><a class="button_2" href="#">ABOUT US  <i  class="fa fa-long-arrow-right ms-1"></i></a></li>
            </ul>
      </div>
    )
}
const carousel=(props)=>{
    return(
    <div class="carousel-item active">
        <img src={props.banner} class="d-block w-100" alt="..."/>
        <Components.Dialog/>
      </div>
    )
}
const handleInvalid=(key, e, v_hooking)=>{
    
    if(e){
        e.preventDefault();
        console.log(e)
    }
    const {state: invalid, set: setInvalid} = v_hooking
    setInvalid({ ...invalid,[key]: true });
}

function errorIfInvalid(key, invalid, invalid_msg){
    if(invalid[key]===true){
        return ( <div style={{ color: "red" }}>{invalid_msg[key]}</div> );
    }
    return (<></>);
}


function TextFieldsInput({name, s_hooking, v_hooking, config,required,icon}){
    return(
        <div className="form-group has-feedback">
            <input type="text" 
                required={required}
                className="form-control"
                value={s_hooking.state[name]}
                placeholder={config.t_fields[name]}
                title={config.invalid_msg[name]}
                onChange={ (e) => handleChange(name, e, s_hooking, v_hooking)}
                onInvalid={(e) => handleInvalid(name, e, v_hooking)}  
            />
            <span className={icon+" " +"glyphicon  form-control-feedback"} />
            {errorIfInvalid(name, v_hooking.state, config.invalid_msg)}
        </div>
    );
}
function EmailInput({name, s_hooking, v_hooking, config,disabled}){
    return(
        <div className="form-group has-feedback">
            <input type="email" required
                className="form-control"
                value={s_hooking.state[name]}
                placeholder={config.t_fields[name]}
                title={config.invalid_msg[name]}
                onChange={ (e) => handleChange(name, e, s_hooking, v_hooking)}
                onInvalid={(e) => handleInvalid(name, e, v_hooking)}
                disabled={disabled}

            />
            <span className="glyphicon glyphicon-envelope form-control-feedback" />
            {errorIfInvalid(name, v_hooking.state, config.invalid_msg)}
        </div>
    );
}


function PasswordInput({name, s_hooking, v_hooking, config, placeholder}){
    return(
        <div className="form-group has-feedback">
            <input type="password" required
                className="form-control" autoComplete='password'
                value={s_hooking.state[name]}
                placeholder={placeholder||config.t_fields[name]}
                pattern={config.inputPattern.password}
                title={config.invalid_msg[name]}
                onChange={ (e) => handleChange(name, e, s_hooking, v_hooking)}
                onInvalid={(e) => handleInvalid(name, e, v_hooking)}
            />
            <span className="glyphicon glyphicon-lock form-control-feedback" />
            {errorIfInvalid(name, v_hooking.state, config.invalid_msg)}
        </div>
    );
}

const residGenre=(list,libelle)=>{
    return list.filter(item=>item.libelle===libelle)[0]?list.filter(item=>item.libelle===libelle)[0].id_g:0
}
    const uploading = (media, path) => {
        const storage = getStorage();
        for (let image in media) {
          const metadata = {
            contentType: media[image].type
          };
          const storageRef = ref(storage, 'gs:/' + path + '/' + media[image].name);
          const uploadTask = uploadBytesResumable(storageRef, media[image], metadata);
      
          // Utiliser une fonction anonyme pour capturer la valeur actuelle de "image"
          ((currentImage) => {
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                // Gérer la progression de téléchargement pour chaque image individuellement
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done for image ' + currentImage);
                // ...
              },
              (error) => {
                // Gérer les erreurs spécifiques à chaque image individuellement
                switch (error.code) {
                  case 'storage/unauthorized':
                    console.log('Unauthorized error for image ' + currentImage);
                    break;
                  case 'storage/canceled':
                    console.log('Canceled error for image ' + currentImage);
                    break;
                  // ...
                  case 'storage/unknown':
                    console.log('Unknown error for image ' + currentImage);
                    break;
                }
              },
              () => {
                // Gérer la réussite de chaque téléchargement individuellement
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL, 'for image ' + currentImage);
                });
              }
            );
          })(image); // Passer la valeur de "image" à la fonction anonyme
        }
      };
const  Formulaire=(props)=>{
    const [genres,setGenre]=useState('')
    let [file1,setFile1]=useState('')
    let [file2,setFile2]=useState('')
    const [value_form,setValueForm]=useState(
        {nom:"",
        description:"",
        size:"",
        author:"",
        duree:"",
        nbrePage:"",
        genre:{
            id_g:0
        },
        title:"",
        path_file:"",
        path_poster:"",
        file_name:"",
        prix:""
        }
    )
    const [value_form_invalid,setValueForm_invalid]=useState(
        {nom:"",
        description:"",
        size:"",
        author:"",
        path_file:"",
        duree:"",
        nbrePage:"",
        genre:{
            id_g:0
        },
        title:"",
        path_poster:"",
        file_name:"",
        prix:""
        }
    )

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        file1=selectedFile
        setFile1(file1)
        setValueForm({...value_form,['file_name']:selectedFile.name,['path_file']:selectedFile.name,['size']:selectedFile.size});
       
        };
  
    const handleFileChange3 = (event) => {
        const selectedFile = event.target.files[0];
        file2=selectedFile
        setFile2(file2)
        setValueForm({...value_form,['path_poster']:selectedFile.name});
        };
    const s_hooking={state:value_form,set:setValueForm}
    const v_hooking={state:value_form_invalid,set:setValueForm_invalid}

    const handleSubmit=(e)=>{
        e.preventDefault()

        value_form.genre.id_g=parseInt(residGenre(props.listgenre,genres))
        if(props.type==='document'){
            uploading([file1,file2],'Document')
            smartshopapi.post('public/documents',value_form).then(res=>{
                console.log(res)
                if(res.status===201 || res.status==200){
                   props.actionD(res)
                }
            })
            .catch(error=>{
                console.log(error)
            })
        }
        else if (props.type==="audio"){
            uploading([file1,file2],'Audio')
            smartshopapi.post('public/audios',value_form).then(res=>{
                if(res.status===201 || res.status==200){
                   props.actionD(res)
                   console.log(res)
                }
            })
            .catch(error=>{
                console.log(error)
            })
        }
        else if(props.type==="video"){
            uploading([file1,file2],'video')
            setValueForm(value_form)
            smartshopapi.post('public/videos',value_form).then(res=>{
                if(res.status===201 || res.status==200){
                   props.actionD(res)
                }
            })
            .catch(error=>{
                console.log(error)
            })
            console.log(value_form)
            
        }
    }
    return(
        <>
        <form onSubmit={handleSubmit} className="b-form">
            <input type="file" required
                onChange={handleFileChange}
                className="form-control"
                require='tue'
            />
            {props.nom&&
                <Components.textfieldsinput key="nom"
                    name={"nom"}
                    config={props.config}
                    s_hooking={ s_hooking }
                    v_hooking={ v_hooking }
                    required='required'
                />
            }
            {props.description&&
                <Components.textfieldsinput key="description"
                    name={"description"}
                    config={props.config}
                    s_hooking={ s_hooking }
                    v_hooking={ v_hooking }
                    required='required'
                />
            }
            {props.genre&&
                [props.listgenre].length?
                <div className='form-group has-feedback'>
                      <select className="form-control" value={genres} onChange={(e)=>{setGenre(e.target.value)}}   required="required" >
                          <option key={props.listgenre.length} select='yes'>{props.config.t_fields.genre}</option>
                          {props.listgenre.map((a,b)=>{
                              return(
                              <option  key={a.id_g}>{a.libelle}</option>
                              )
                          })}
                      </select>
                </div>
             
              :
              
              <select className="form-control" required="required" >
                  
              </select>
                      
              
            }
            {props.author&&
                <Components.textfieldsinput key="author"
                    name={"author"}
                    config={props.config}
                    s_hooking={ s_hooking }
                    v_hooking={ v_hooking }
                    required='required'
                />
            }
            {props.duree&&
                <Components.textfieldsinput key="duree"
                    name={"duree"}
                    config={props.config}
                    s_hooking={ s_hooking }
                    v_hooking={ v_hooking }
                    required='required'
                />
            }
             {props.nbrePage&&
                <Components.textfieldsinput key="nbrePage"
                    name={"nbrePage"}
                    config={props.config}
                    s_hooking={ s_hooking }
                    v_hooking={ v_hooking }
                    required='required'
                />
            }
             {props.title&&
                <Components.textfieldsinput key="title"
                    name={"title"}
                    config={props.config}
                    s_hooking={ s_hooking }
                    v_hooking={ v_hooking }
                    required='required'
                />
            }
       
            {props.path_poster&&
                <input type="file" required
                    onChange={handleFileChange3}
                    className="form-control"
                    require='tue'
                />
            }
        
            {props.prix&&
                <Components.textfieldsinput key="prix"
                    name={"prix"}
                    config={props.config}
                    s_hooking={ s_hooking }
                    v_hooking={ v_hooking }
                    required='required'
                />
            }
            <button type="submit" className="btn btn-primary">{props.config.t_buttons.save}</button>
        </form>
    
        </>
    )
}
const Components={
    Formulaire:Formulaire,
    textfieldsinput:TextFieldsInput,
    emailInput:EmailInput,
    passwordInput:PasswordInput,
    Dialog:Dialog,
    carousel:carousel,
    Poster2:Poster2,
    Poster:Poster,
    infouser:infouser,
    uploading:uploading 
}
export default Components