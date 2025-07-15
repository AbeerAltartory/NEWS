
import { Link } from "react-router-dom"; 
function NewsList({ news }) {
   return (
     <div className="row">
      {news.map(article => ( <div key={article.id} className="col-md-4"> <div className="card mb-4">
         <img src={article.image} className="card-img-top" alt="News" /> <div className="card-body"> 
         <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.content.substring(0, 100)}...</p> 
          <Link to={`/news/${article.id}`} className="btn btn-primary">Read More</Link>
                    </div> 
          </div>
           </div> ))} 
           </div> ); }
            export default NewsList; 