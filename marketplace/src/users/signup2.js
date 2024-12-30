import { NavLink, Navigate, useNavigate } from "react-router-dom"
import Translate from "../Translate/translate"
import { useEffect, useState } from "react"
import Components from "../component"
import smartshopapi from "../smartshopapi";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
export default function Sign2(){
    let navigate = useNavigate(); 
    const MySwal = withReactContent(Swal)
const inputPattern = {
    password:".{3}.*"  //"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$"
}; //patterns (regular expressions) for input fields
const lang=(window.navigator.language).split('-')[0]
let page_config={
    t_fields: Translate["fr"].fields
    , t_messages: Translate["fr"].message
    , t_buttons: Translate["fr"].button
    , invalid_msg: Translate["fr"].invalid_msg
    , other_msg: Translate["fr"].other_msg
    , status_msg: Translate["fr"].status_msg
    ,inputPattern:inputPattern
}
const [islog,setIslog]=useState(false) //variable qui detecte si l'utilisateur veut sign ou se logger
const [credential,setCredential]=useState({
    nom:"",
    email:"",
    password:"",
    password2:""
})
const [listuser,setListuser]=useState([])
const [credentialinval,setCredentialinval]=useState({
    nom:"",
    email:"",
    password:"",
    password2:""
})
const s_hooking={state:credential,set:setCredential}
const v_hooking={state:credentialinval,set:setCredentialinval}
useEffect(()=>{
    smartshopapi.get('auth/all').then(
        res=>setListuser(res.data)
    ).catch(
        err=>console.log(err)
    );
},[])
const resid=(list,email)=>{
    return list.filter(a=>a.email===email)[0]?list.filter(a=>a.email===email)[0].id:1
}
const resid2=(list,email)=>{
    return list.filter(a=>a.email===email)[0]?list.filter(a=>a.email===email)[0]:1
}
const handlog=()=>{
    setIslog(true)
    console.log('ines')
    console.log(islog)
}
const handsign=()=>{
    setIslog(false)
    console.log(islog)
}
const handleSubmitLogin=(e)=>{
    e.preventDefault()
    const data={
        email:credential.email,
        password:credential.password
    }
    console.log(data)
    smartshopapi.post('auth/signin',data).then(
        res=>{
            if(res.data.statusCode==200||res.data.statusCode==201){
                localStorage.setItem('token',res.data.token)
                let param=resid2(listuser,jwtDecode(res.data.token).sub)
                localStorage.setItem('id',resid(listuser,jwtDecode(res.data.token).sub))
                localStorage.setItem('name',param.name)
                localStorage.setItem('mail',param.email)
                smartshopapi.get('public/download').then(
                    res2=>{
                        const nbr=res2.data.filter(elt=>elt.user.email===jwtDecode(res.data.token).sub)
                        localStorage.setItem("download",nbr.length)
                        localStorage.setItem('nbr',0)

                    }
                ).catch(err=>{
                    console.log(err)
                });
                localStorage.setItem('panier','[]')
                MySwal.fire(
                    "congratulation","Succes"+"!", "success"
                )
                navigate('/home'); // Déclenche le clic sur le bouton de fermeture
            }
            else{
                MySwal.fire({
                    title: 'Echec',
                    text: 'donnees erronees !',
                    icon: 'error',
                    width: '350px', 
                    heightAuto: false,
                },
                )
                console.log('bad request')
            }
        }
    ).catch(err=>{
        console.log(err)
    })
}
const handleSubmitSign=(e)=>{
    e.preventDefault()
    const data={
        name:credential.name,
        email:credential.email,
        password:credential.password,
        role:"USER"
    }
    if(credential.password!==credential.password2){
        MySwal.fire({
            text: 'mots de pass differents !',
            icon: 'warning',
            width: '350px', 
            heightAuto: false,
        },
        )
    }else{
        smartshopapi.post('auth/signup',data).then(
            res=>{
                console.log(res)
                if(res.data.statusCode==200||res.data.statusCode==201){
                    MySwal.fire(
                        "congratulation","Succes"+"!", "success"
                    )
                    setIslog(true); // Déclenche le clic sur le bouton de fermeture
                }
                else{
                    MySwal.fire({
                        title: 'Echec',
                        text: 'donnees erronees !',
                        icon: 'error',
                        width: '350px', 
                        heightAuto: false,
                    },
                    )
                    console.log('bad request')
                }
            }
        ).catch(err=>{
            MySwal.fire({
                title: 'Echec',
                text: 'donnees erronees !',
                icon: 'error',
                width: '350px', 
                heightAuto: false,
            },
            )
            console.log(err)
        })
    }
}
// const test = () => {
//     console.log('ines')
//     for (let i = 901; i <= 1000; i++) {
//         console.log('ok')
//         const data2 = {
//             email: "user" + i.toString() + "@gmail.com",
//             password: '123',
//             name:"user" + i.toString(),
//             role:"USER"
//         }

//         smartshopapi.post('auth/signup', data2).then(
//             res => {
//                 console.log(res)
//                 if (res.data.statusCode == 200 || res.data.statusCode == 201) {
//                     MySwal.fire(
//                         "congratulation", "Succes" + "!", "success"
//                     )
//                     setIslog(true); // Déclenche le clic sur le bouton de fermeture
//                 } else {
//                     MySwal.fire({
//                         title: 'Echec',
//                         text: 'donnees erronees !',
//                         icon: 'error',
//                         width: '350px',
//                         heightAuto: false,
//                     })
//                     console.log('bad request')
//                 }
//             }
//         ).catch(err => {
//             MySwal.fire({
//                 title: 'Echec',
//                 text: 'donnees erronees !',
//                 icon: 'error',
//                 width: '350px',
//                 heightAuto: false,
//             })
//             console.log(err)
//         })
//     }
// }
// function getRandomNumber() {
//     return Math.floor(Math.random() * 5)+1;
//   }


// const malist=[72,73,83,88,90,91,93,95,84,85,86,87,32,33,34,35,36,37,38,39,40,48,49,50,51,52,77,78,80,81,82,41,42,43,44,45,46,47,75,76,53,56,58,60,67,70,54,55,59,61,62,63,64,64,66,68,69,71]

// const like=()=>{
//     for(let j=1751;j<=1758;j++){
//         let index=[]
//         let s=Math.floor(Math.random() * 30)+5
//         for(let i=0 ; i<s; i++){
//             let n=Math.floor(Math.random() * 52)+5
//             while(index.includes(n)){
//                 n=Math.floor(Math.random() * 52)+5
//             }
//             index.push(n)
//         }
//         console.log(index)
//         for(let i=0;i<index.length;i++){
//             const evall={
//                     nbrstar:getRandomNumber(),
//                     commentaire:"ces't beau",
//                     produit:{
//                         id:malist[index[i]]
//                     },
//                     user:{
//                         id:j
//                     }
//                 }
//             smartshopapi.post('public/eval',evall).then(
//                 res=>{
//                     console.log(res)
//                 }
//                 ).catch(
//                     err=>{
//                         console.log(err)
//                     }
//                 )    
            
//     }
    

//     }
// }
//   const evall={
//     nbrstar:getRandomNumber(),
//     commentaire:"ces't beau",
//     produit:{
//         id:55
//     },
//     user:{
//         id:25
//     }
// }
// console.log('oooooo')

//     smartshopapi.post('public/eval',evall).then(
//         res=>{
//             console.log(res)
//         }
//     ).catch(
//         err=>{
//             console.log(err)
//         }
//     )    

    return(
        <>
        
                    {/* <h2>
                        Hello October!
                    </h2> */}
                    <div>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">SMART-SHOP</h5>
                            {/* <button type="button" className="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body fixed">
                            
                        {islog ===false &&
                            <form className="ps-3 pe-3" onSubmit={handleSubmitSign}>
                                <div className="mb-3">
                                    <Components.textfieldsinput key="name"
                                        name={"name"}
                                        config={page_config}
                                        s_hooking={ s_hooking }
                                        v_hooking={ v_hooking }
                                        required='required'
                                    />
                                </div> 
                                
                                <div className="mb-3">
                                    <Components.emailInput key="email"
                                        name={"email"}
                                        config={page_config}
                                        s_hooking={ s_hooking }
                                        v_hooking={ v_hooking }
                                        required='required'
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <Components.passwordInput key="password"
                                        name={"password"}
                                        config={page_config}
                                        s_hooking={ s_hooking }
                                        v_hooking={ v_hooking }
                                        required='required'
                                    />
                                </div>
                                <div className="mb-3">
                                    <Components.passwordInput key="password2"
                                        name={"password2"}
                                        config={page_config}
                                        s_hooking={ s_hooking }
                                        v_hooking={ v_hooking }
                                        required='required'
                                    />
                                </div>
                                                                
                                {/* <div className="mb-3">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="customCheck1"/>
                                        <label className="form-check-label" for="customCheck1">I accept <NavLink to=''>Terms and Conditions</NavLink></label>
                                    </div> 
                                </div> */}
                                
                                <div className="mb-3 text-center">
                                <h6><button type='submit' className="button_1 d-block"to="#">{page_config.t_buttons.sign}</button></h6>
                                <NavLink onClick={handlog} className="text-primary">{page_config.t_messages.haveaccount}</NavLink>
                                </div>                            
                            </form>
                    }    
                     {islog ===true &&
                            <form className="ps-3 pe-3" onSubmit={handleSubmitLogin}>
                                
                                <div className="mb-3">
                                    <Components.emailInput key="email"
                                        name={"email"}
                                        config={page_config}
                                        s_hooking={ s_hooking }
                                        v_hooking={ v_hooking }
                                        required='required'
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <Components.passwordInput key="password"
                                        name={"password"}
                                        config={page_config}
                                        s_hooking={ s_hooking }
                                        v_hooking={ v_hooking }
                                        required='required'
                                    />
                                </div>
                                                  
                                {/* <div className="mb-3">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="customCheck1"/>
                                        <label className="form-check-label" for="customCheck1">I accept <NavLink to=''>Terms and Conditions</NavLink></label>
                                    </div> 
                                </div> */}
                                
                                <div className="mb-3 text-center">
                                <h6><button type="submit" className="button_1 d-block"to="#">{page_config.t_buttons.log}</button></h6>
                                <NavLink  onClick={handsign} className="text-primary">{page_config.t_messages.havenoaccount}</NavLink>
                                </div>
                            
                            </form>
                    }    
                        </div>
                    </div>
			    </div>
		    </div>
            {/*<div className="body">
                <section className="section">
                    <div class="leaf">
                        <div><img src="img/Video/general_samba.jpeg" height="75px" width="75px"/></div>
                        <div><img src="img/Video/carte_identite.jpeg" height="75px" width="75px"/></div>
                        <div><img src="img/Video/madame_monsieur.jpeg" height="75px" width="75px" /></div>
                        <div className="invisible"><img  src="img/Video/polygamie.jpeg" height="75px" width="75px"/></div>
                        <div><img src="img/Video/affiche-le-blanc-d-eyenga-thierry-ntamack-lefilmcamerounais-1.webp" height="75px" width="75px"/></div>
                        <div><img src="img/Video/delire.jpeg" height="75px" width="75px"/></div>
                        <div><img src="img/Video/monica.jpeg" height="75px" width="75px"/></div>
                    </div>
        
                    <div class="leaf leaf1">
                        <div><img src="img/Video/general_samba.jpeg" height="75px" width="75px"/></div>
                        <div><img src="img/Video/carte_identite.jpeg" height="75px" width="75px"/></div>
                        <div><img src="img/Video/madame_monsieur.jpeg" height="75px" width="75px" /></div>
                        <div className="invisible"><img  src="img/Video/polygamie.jpeg" height="75px" width="75px"/></div>
                        <div><img src="img/Video/affiche-le-blanc-d-eyenga-thierry-ntamack-lefilmcamerounais-1.webp" height="75px" width="75px"/></div>
                        <div><img src="img/Video/delire.jpeg" height="75px" width="75px"/></div>
                        <div><img src="img/Video/monica.jpeg" height="75px" width="75px"/></div>
                    </div>
        
                    <div class="leaf leaf2">
                        <div><img src="img/Video/general_samba.jpeg" height="75px" width="75px"/></div>
                        <div><img src="img/Video/carte_identite.jpeg" height="75px" width="75px"/></div>
                        <div><img src="img/Video/madame_monsieur.jpeg" height="75px" width="75px" /></div>
                        <div className="invisible"><img  src="img/Video/polygamie.jpeg" height="75px" width="75px"/></div>
                        <div><img src="img/Video/affiche-le-blanc-d-eyenga-thierry-ntamack-lefilmcamerounais-1.webp" height="75px" width="75px"/></div>
                        <div><img src="img/Video/delire.jpeg" height="75px" width="75px"/></div>
                        <div><img src="img/Video/monica.jpeg" height="75px" width="75px"/></div>
                    </div>
                </section>

            </div>*/}
            
        </>
    )
}