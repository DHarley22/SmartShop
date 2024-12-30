import { useNavigate } from 'react-router';
import mycoolpayapi from './mycoolpayapi';

export default function Mycoolpay(){
    let navigate=useNavigate()
    var data ={
        transaction_amount: 100,
        transaction_currency: "XAF",
        transaction_reason: "Bic pen",
        // app_transaction_ref: "order_123",
        customer_phone_number: "699009900",
        customer_name: "Bob MARLEY",
        customer_email: "bob@mail.com",
        customer_lang: "en"
      };
    const here=()=>{
        mycoolpayapi.post('paylink',data,
        {headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
          }}
    ).then(res=>{
        console.log(res.data)
        if(res.status===201){
            console.log('ines')
            window.location.href=res.data.payment_url
            mycoolpayapi.get('checkStatus/'+res.data.transaction_ref,{headers: { 
                'Accept': 'application/json'
                }}).then(res=>{
                    console.log(res)
                })
           
        }
    }).catch(err=>{
        console.log(err)
    })
    }
// const here=()=>{
//     mycoolpayapi.get('checkStatus/fc1f060e-9d60-42c3-b920-f7f24b169e6a',{headers: { 
//         'Accept': 'application/json'
//         }}).then(res=>{
//             console.log(res)
//         }).catch(err=>console.log(err))
// }
    
// var config = {
//   method: 'post',
// maxBodyLength: Infinity,
//   url: 'https://my-coolpay.com/api/{public_key}/paylink',
//   headers: { 
//     'Content-Type': 'application/json', 
//     'Accept': 'application/json'
//   },
//   data : data
// };



    return(
        <>
        <button type="button" onClick={here}>tape here</button>
        </>
    )
}