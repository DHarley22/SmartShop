import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import smartshopapi from "../smartshopapi";
import Stripe from "react-stripe-checkout";
import mycoolpayapi from "./mycoolpayapi";
export default function Panier(){
    let navigate = useNavigate(); 
    let [produit,setProduit]=useState([])
    const [listuser,setListuser]=useState([])
    const [prix,setPix]=useState(0)
    useEffect(()=>{
        const panier_list_json = localStorage.getItem('panier');
        const panier_list = JSON.parse(panier_list_json);
        const listeSansDoublons = [...new Set(panier_list.map(JSON.stringify))].map(JSON.parse);
        let x=0
        listeSansDoublons.map((a,b)=>{x=x+a.prix})
        console.log(listeSansDoublons)
        setPix(x)
        setProduit(listeSansDoublons)
        console.log(listeSansDoublons);
        smartshopapi.get('auth/all').then(
			res=>setListuser(res.data)
		).catch(
			err=>console.log(err)
		);
    },[])
    console.log(produit)
    console.log(localStorage)
    const cancel=()=>{
        localStorage.setItem('nbr',0)
        navigate('/home')

    }
    const email=jwtDecode(localStorage.token).sub 
    var data ={
        transaction_amount: prix,
        transaction_currency: "XAF",
        transaction_reason: "by article at Smartshop",
        // app_transaction_ref: "order_123",
        customer_phone_number: "655555555",
        customer_name: localStorage.name,
        customer_email: localStorage.email,
        customer_lang: "en"
      };
    const here=()=>{
        mycoolpayapi.post('paylink',data,
        {headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
          }}
    ).then(res=>{
        console.log(res)
        if(res.status===201){
            console.log('ines')
            window.location.href=res.data.payment_url
            mycoolpayapi.get('checkStatus/'+res.data.transaction_ref,{headers: { 
                'Accept': 'application/json'
                }}).then(res=>{
                    console.log(res)
                    const iduser=listuser.filter(elt=>elt.email===email)[0]
                    
                    if(res.data.transaction_status==="SUCCESS"){
                        for(let i in produit){
                            const data={
                                produit:{
                                    id:produit[i].id
                                },
                                user:{
                                    id:iduser.id
                                }
                            }
                            console.log(data)
                
                            smartshopapi.post('public/download',data).then(
                                res2=>{
                                    console.log(res2)
                                    localStorage.setItem("download",parseInt(localStorage.download)+1)
                                }
                            ).catch(err=>{
                                console.log(err)
                            });
                        }
                        localStorage.setItem('panier','[]')  
                        localStorage.setItem('nbr',0)
                    }
                }).catch(err=>console.log(err))
        }
    }).catch(err=>{
        console.log(err)
    })
    }

    async function handleToken(token) {
        console.log(token);
        await smartshopapi.post("public/payment/charge", "", { headers: {
          token: token.id,
          amount: prix,
        },}).then((res) => {
            console.log(res)
            if(res.status===200){
                const iduser=listuser.filter(elt=>elt.email===email)[0]
                for(let i in produit){
                    const data={
                        produit:{
                            id:produit[i].id
                        },
                        user:{
                            id:iduser.id
                        }
                    }
                    console.log(data)

                    smartshopapi.post('public/download',data).then(
                        res2=>{
                            console.log(res2)
                            localStorage.setItem("download",parseInt(localStorage.download)+1)
                        }
                    ).catch(err=>{
                        console.log(err)
                    });
                }
                localStorage.setItem('panier','[]')  
                localStorage.setItem('nbr',0)
        // localStorage.setItem("download",parseInt(localStorage.download)+produit.length)      
        navigate('/blog_detail')

            }
        //    alert("Payment Success");
           }).catch((error) => {
           alert(error);
           console.log(error)
           });
        }
    // const validate=()=>{
    //     const iduser=listuser.filter(elt=>elt.email===email)[0]
    //     for(let i in produit){
    //         const data={
    //             produit:{
    //                 id:produit[i].id
    //             },
    //             user:{
    //                 id:iduser.id
    //             }
    //         }
    //         console.log(data)

    //         smartshopapi.post('public/download',data).then(
    //             res2=>{
    //                 console.log(res2)
    //                 localStorage.setItem("download",parseInt(localStorage.download)+1)
    //             }
    //         ).catch(err=>{
    //             console.log(err)
    //         });
    //     }
    //     localStorage.setItem('panier','[]')  
    //     localStorage.setItem('nbr',0)
    //     // localStorage.setItem("download",parseInt(localStorage.download)+produit.length)      
    //     navigate('/blog_detail')
    // }
    const trash=(id)=>{
        let x=0
        produit=produit.filter(elt=>(elt.id!==id))
        produit.map((a,b)=>{x=x+a.prix})
        setPix(x)
        setProduit(produit)
        localStorage.setItem('panier',JSON.stringify(produit))  
        localStorage.setItem('nbr',produit.length)
        console.log(produit)
    }
    return(
        <>
         <div className="row">
            
            <div className="col-sm-8 p-auto m-auto">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">reference</th>
                        <th scope="col">nom</th>
                        <th scope="col">categorie</th>
                        <th scope="col">prix</th>
                        <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produit.length>0? produit.map((a,b)=>{
                            return(
                            <tr key={b}>
                                <th scope="row">{a.id}</th>
                                <td>{a.nom}</td>
                                <td>{a.genre.libelle}</td>
                                <td>{a.prix}</td>
                                <td><button className="btn" onClick={()=>trash(a.id)}><i className="fa fa-trash text-danger"/></button></td>
                            </tr>
                            )
                        }):''}
                        
                       
                        <tr>
                            <th scope="row">Montant Total</th>
                            <td></td>
                            <td></td>
                            <th scope="row">{prix}</th>
                        </tr>
                       
                    </tbody>
                    {prix!==0?<>
                        <Stripe
                        stripeKey="pk_test_51KUpVQGCgG8mbdIxGn7rF5ATYxByPhA3lKigx2mKySvlm520ZWUjsGA4SoVv3eLaO7tIIkfHIFObRCTEwyh9mB5z00QnLYezAL"
                        token={handleToken}
                        />
                        <button onClick={here} className="btn btn-success"to="#">other method</button>
                    </>:
                    <button onClick={cancel}  className="btn btn-danger"to="#">annuler</button>
                    }
                </table>
            </div>
        </div>
        {/* <div class="background">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div> */}
        </>
    )
}
