const Translate={
    fr:
        {button:{
            save:"Enregistrer",
            sign:"signup",
            delete:"supprimer",
            log:"se connecter"
        },
        fields:{
            name:"nom",
            nom:"nom",
            genre:"genre",
            duree:"duree",
            description:"description",
            chemin:"chemin",
            email:"email",
            password:"mot de passe",
            password2:"confirmer le mot de passe",
            size:"taille",
            author:"auteur",
            path_file:"chemin du fichier",
            path_poster:"chemin du poster",
            file_name:"nom du fichier",
            genre:"genre",
            prix:"prix",
            title:"titre",
            nbrePage:"nombre de pages",
            format:"format"
        },
        invalid_msg:{
            name:"le nom est obligatoire",
            format:"le format est obligatoire",
            nom:"le nom est obligatoire",
            duree:"la duree est obligatoire",
            prix:"le prix est obligatoire",
            genre:"genre est obligatoire",
            author:"auteur est obigatoire",
            title:"le titre est obigatoire",
            nbrePage:"le nombre de page est obigatoire"
            ,description:"la description est obligatoire"
            ,chemin:"le chemin des votre fichier est obligatoire"
            , email: "Une adresse email valide is requise"
            , password: "Le mot de passe doit avoir au minimum: 8 caract\u00E8res, un chiffre, une minuscule, une majuscule, et un caract\u00E8re special"
            , new_password: "Le mot de passe doit avoir au minimum: 8 caract\u00E8res, un chiffre, une minuscule, une majuscule, et un caract\u00E8re special"
            , password_confirmation: "La confirmation doit etre identique au mot de passe"
            , preferred_lang: "La langue preferr\u00E9 est obligatoire, Choisissez dans la liste"
            ,validate_code:'mauvais code'
        },
        leftside:{
            main:'NAVIGATION PRINCIPALE',
            transaction:'TRANSACTIONS',
            settings:'PARAMETRES SYSTEM',
            api:'Clé API',
            tontine:"TONTINE"
            ,send_request:"Envoie et Requete"
           ,Deposit_Cashout:"Depot et Retrait"
           ,wallet:"Portefeuille"
           ,activity:"Activite"
           ,transfer:"Transfert"
           ,remit :"Remit"
           ,deposit :"Depots"
           ,cashout :"Retrait"
           ,profile:"Profil"
           ,payment:"Paiements"
           ,request:"Solliciter"
           ,account:'Comptes'
           ,langue:"langues"
           ,country:"pays"
           ,manage:"CONFIGURATIONS"
           ,currency:"monnaies"
           ,M_language:"Gestion des Langues"
           ,M_country:"Gestion des pays"
           ,M_currency:"Gestion des monnaies"
           ,translate:"Traduction"
        },
        message:{
            haveaccount:'Je possède déjà un compte',
            havenoaccount:"creer un compte",
            errorpass:'mots de passe différents',
            balance:'Solde',
            marchant_id:'compte marchand',
            info:'en savoir plus',
            numdepot:'Nombre de depot',
            totaltransaction:'transaction total',
            passwordforget:'mot de passe oublié',
            create:'Creer un compte',
            second:'il vous reste',
            second2:'secondes',
            code:'mauvais code',
            credit:'credit',
            banque:'banque',
            presence:'presence',
            menber:'membre'
        },
        onglet:{
            home:'Accueil',
            about:'a propos',
            contact:'contact',
            event:"evenement",
            download:'Telechargement'
        },
        other_msg:{
            video:"Video",
            categorie:"Categorie",
            audio:"Audio",
            document:"Document",
            create:"creer",
            no_data:"no data"
        },
            
        status_msg:{
            backend_error: "L'application n'est pas disponible pour le moment, veuillez essayer plus tard!"
            , loading: "Chargement en cours, veuillez patienter."
            , success_title: "Inscription r\u00E9ussi"
            , success_message: "Votre code de validation a \u00E9t\u00E9 envoy\u00E9 par courrier \u00E9lectronique"
        }
    },
    en:{
        button:{
            cancel:'cancel',
            confirm:'confirm',
            login:'login',
            signup:"Sign",
            edit:'edit',
            logout:'logout',
            add:'ADD',
            validate:"Validate",
            transfer:'Send',
            use:"use",
            send_new:"new recipient"
        },
        fields:{
            currency_choice:"Deliver in",
            transfer_amount:"amount",
            receiver:"receiver",
            reason:"reason",
            full_name:'full name',
            email:'email',
            birthdate:'birthdate',
            phone:'phone',
            gender:'gender',
            male:'male',
            female:'female',
            preferred_name:'Preferred name',
            address1:'address line1',
            address2:'address line2',
            city:'city',
            zipcode:'zip code',
            state:'states',
            edit:'editer',
            search:'Search',
            country:'Country',
            sort:"sort by",
            password:'Password',
            password2:'Confirm password',
            preferred_name:'preferred name',
            neighborhood:'Neighborhood',
            validate_code:'validation code',
            means_payement:'Means of payment',
            deposit_amount:"Amount to deposit",
            duree:'duration',
            amount:'amount',
            date:"date",
            operation:"operation",
            taux_interet:"interest rate",
            yes:"Yes",
            no:"No",
            recipient_currency:"recipient's currency",
            choice_account:"pocket",
            avalaible_balance:"available balance",
            restricted_balance:"restrited balace",
            to:"to",
            from:"from"
        },
        invalid_msg:{
            full_name: "The full name is required"
            , email: "A valid email is required"
            , country: "The country is required, please choose from the list"
            , password: "The password must have at least: 8 characters, one digit,one lowercase, one upper case, and one special character"
            , new_password: "The password must have at least: 8 characters, one digit, one lowercase, one upper case, and one special character"
            , password_confirmation: "Password must match"
            , preferred_lang: "The preferred language is required, please choose from the list"
            ,preferred_name: "The preffered name is required"
            ,address1:"The address line is required"
            ,city:"The city is required"
            ,zipcode:"The zipcode is required"
            ,phone:"The phone is required"
            ,address2:"The address line is required"
            ,gender:"The gender is required"
            ,birthdate:"The birthdate line is required"
            ,validate_code:'wrong code'
            ,receiver:"the receiver's email is requiered"
            ,amount:"transaction amount is required"
            ,solde:"insufficient balance"
            , country_r: "The country is required, please choose from the list"
            ,email_r: "A valid email is required"
            ,full_name_r: "The full name is required"
            ,invalid_email:"No user associated with this email"
        },
        leftside:{
            main:'MAIN NAVIGATION',
            transaction:'TRANSACTIONS',
            settings:'SYSTEM SETTING',
            api:'API key'
            ,tontine:"TONTINE"
            ,send_request:"Send and Request"
            ,Deposit_Cashout:"Deposit and Cashout"
            ,wallet:"Wallet"
           ,activity:"Activity"
           ,transfer:"Transfer"
           ,tontine:"TONTINE"
           ,remit :"Remit"
           ,deposit :"Deposits"
           ,cashout :"Cashout"
           ,profile:"Profile"
           ,payment:"Payments"
           ,request:"Request"
           ,account:'Comptes'
           ,langue:"languages"
           ,country:"countries"
           ,manage:"Settings"
           ,currency:"currencies"
           ,M_language:"Languages Management"
           ,M_country:"Countries Management"
           ,M_currency:"Currencies Management"
           ,translate:"Translate"
        },
        message:{
            haveaccount:'I already have an account',
            signup:'make your transactions easier with a Hankap account',
            congratulation:'Congratulation',
            problem:'Problem',
            errorpass:'passwords are different',
            balance:'balance',
            marchant_id:'account marchant',
            info:'more info',
            numdepot:'number deposit',
            totaltransaction:'Total transaction',
            passwordforget:'I forgot my password',
            create:'Create an account',
            second:'you have',
            second2:'seconds left',
            code:'wrong code',
            credit:'credit',
            banque:'banque',
            presence:'presence',
            menber:'membre'
            ,langue:"languages"
            ,country:"countries"
            ,manage:"SETTINGS"
        },
        onglet:{
            general:'General',
            security:'Security',
            home:'Home',
            profile:'Profile',
            userprofile:'My Profile',
            logout:"Lougout",
            transfer:"Tranfer",
            activity:"Activity",
            recipient:"Recipients",
            remit:"Send",
            recurentpayment:"Recurrent Payments",
            tab_marchand:"Pay a merchand"
        },
        other_msg:{
            enroll: "Enroll"
            ,transfer_title:"Transfer: pocket and amount"
            ,remit_title:"Remit: pocket and amount"
            ,list_transfer_title:"TRANFER LIST"
            ,no_data:"No data available !"
            ,question1:"make a"
            ,question2:"deposit to account @"
            ,account_detail:"Wallet details"
            ,echec_transfer:"Tranfer failed"
            ,success:"SUCCESS !"
            ,error:"FAILED !"
            ,add_R:'Successful '
            ,add_E:"Server Error"
            ,inval_data:"Invalid data"
            ,user_Exist:"this recipient already exists"
            ,t_recipient_title:'Transfer: Choose a recipient'
            ,t_new_recipient_title:"Transfer: new recipient"
            ,r_recipient_title:'Remit: Choose a recipient'
            ,r_new_recipient_title:"Remit: new recipient"
            ,t_activity_title:"Transfer activity"
            ,r_activity_title:"Remit activity"
            ,manageT: "Transfer: manage recipients"
            ,manageR: "Remit: manage recipients"
            ,TTL:'Languages Translation'
            ,TML:'Languages Management'
            ,TTC:'Countries Translation'
            ,TMC:'Countries Management'
            ,TTCu:'Currencies Translation'
            ,TMCu:'Currencies Management'
            ,th_name:"name"
            ,th_o_name:"own name"
        },
        status_msg:{
            backend_error: "The application is not available at this time, please come back later!"
            , loading: "The app is loading, please be patient."
            , success_title: "Successful enrollment"
            , success_message: "Your validation is sent to your email"
        }
    }
}
export default Translate