import Translate from "../Translate/translate";
import Sign from "../users/signup";
const lang=(window.navigator.language).split('-')[0]
let page_config={
    t_fields: Translate[lang||"en"].fields
    , t_messages: Translate[lang||"en"].message
    , t_buttons: Translate[lang||"en"].button
    , invalid_msg: Translate[lang||"en"].invalid_msg
    , other_msg: Translate[lang||"en"].other_msg
    , status_msg: Translate[lang||"en"].status_msg
    , t_onglet: Translate[lang||"en"].onglet
}
export default function Header(props){
    
    const handlechange=(e)=>{
        props.s_categorie.state=e.target.value
        props.s_categorie.set(props.s_categorie.state)
        console.log(props.s_categorie.state)
    }
    return(
        <div>
            <section id="header">
                <div id="signup-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
                    <Sign/>
                </div>
                <nav class="navbar navbar-expand-md navbar-light" id="navbar_sticky">
                    <div class="container-fluid">
                        <a class="navbar-brand fs-4 p-0 fw-bold text-white text-uppercase" href="home"><img src="smart3.png" alt="" width='50px' height='50px'/> SMART-SHOP </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mb-0">
                                
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="home">{page_config.t_onglet.home}</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="blog_detail">Mon historique
                                        <div className="circle">{localStorage.download}</div>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    { localStorage.nbr>0&&<a class="nav-link" href="panier">
                                        {/* <span><a class="text-white rounded" href="#"><i class="fa fa-shopping-cart"></i></a></span> */}
                                        mon panier d'achat
                                        <div className="circle">{localStorage.nbr}</div>
                                    </a>}
                                </li>
                                {/* <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Blog
                                    </a>
                                    <ul class="dropdown-menu drop_1" aria-labelledby="navbarDropdown">
                                        <li><a class="dropdown-item" href="blog"> Blog</a></li>
                                        <li><a class="dropdown-item border-0" href="blog_detail"> Blog Detail</a></li>
                                    </ul>
                                </li> */}
                                {/* <li class="nav-item">
                                    <a class="nav-link" href="event.html">{page_config.t_onglet.event}</a>
                                </li> */}
                                {/* <li class="nav-item">
                                    <a class="nav-link" href="team.html">team</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="contact.html">Contact</a>
                                </li> */}
                                
                            </ul>
                            <ul class="navbar-nav mb-0 ms-auto">
                                <li class="nav-item">
                                    <select name="categories" onChange={handlechange} class="form-select bg-light" required="">
                                        {/* <option value="categorie">{page_config.other_msg.categorie}</option> */}
                                        <option value='video'>video</option>
                                        <option categorie='audio'>audio</option>
                                        <option categorie='document'>document</option>
                                    </select>
                                    <div class="input-group">
                                        <input type="text" class="form-control border-start-0" placeholder="Search Movie"/>
                                        <span class="input-group-btn">
                                            <button class="btn btn-primary bg_yell" type="button">
                                                <i class="fa fa-search"></i> 
                                            </button>
                                        </span>
                                    </div>
                                </li>
                                {/* <li class="nav-item ms-3">
                                    <a class="nav-link button" data-bs-toggle="modal" data-bs-target="#signup-modal" href="#">SIGN UP</a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
            </section>
        </div>
    )
}
// docker run -it -p 3000:3000 -v /app/node_modules -v $(pwd):/app marketplace_frontend