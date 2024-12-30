import {Routes , Route} from 'react-router-dom';
import Home from './basefile/home';
import Header from './basefront/header';
import Sign from './users/signup';
import About from './basefile/about';
import Blog from './basefile/blog';
import BlogDetail from './basefile/blogdetail';
import Testapi from './testapi';
import Produit from './admin/produit';
import Sign2 from './users/signup2';
import Panier from './basefile/panier';
import Stripe_app from './basefile/stripe';
import Mycoolpay from './basefile/mycoolpay';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Sign2/> } />
        <Route path="/test" element={ <Testapi/> } />
        <Route path="/produits" element={ <Produit/> } />
        <Route path="/about" element={<About/>}/>
        <Route path="/blog_detail" element={<BlogDetail/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/sign" element={ <Sign/> } />
        <Route path="/login" element={ <Sign2/> } />
        <Route path="/panier" element={ <Panier/> } />
        <Route path="/home" element={ <Home/> } />
        <Route path="/stripe" element={ <Stripe_app/> } />
        <Route path="/mycoolpay" element={ <Mycoolpay/> } />
        {/* <Route path="/header" element={ <Header/> } /> */}
      </Routes>
      {/* https://learn.deeplearning.ai/courses/langchain-chat-with-your-data/lesson/1/introduction */}
    </div>
  );
}

export default App;
