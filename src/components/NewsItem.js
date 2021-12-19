import React from 'react'


const NewsItem = (props) => {
      
      let {title, imageUrl, newsUrl, source, date} = props;
           
           
           
           
      return (
            <div className="my-3" >
                  <div className="card" style={{
                        height: "30rem",
                        border:"none", 
                        borderRadius: "1rem", 
                        backgroundColor: "#bbdefb"
                        }}>
                        
                        
                        <img src= {!imageUrl ? "https://images.unsplash.com/photo-1590615370581-265ae19a053b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" : imageUrl} className="card-img-top" alt="Unable to load" style={{height: "17rem", borderRadius: "1rem"}}/>

                        <div className="card-body">
                              
                              <h6 className="card-title" style={{fontFamily :"Roboto Slab"}}>{title.length > 160 ? (title.slice(0,160) + "...") : title}</h6>

                              <span className="badge bg-danger">{source ? source : "Unknown"}</span>

                              <p className="card-text my-1"><small className="text-muted">On {new Date(date).toGMTString()}</small></p>
                              <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary my-1" style={{borderRadius: "0.5rem"}} >Explore</a>
                              
                              </div>
                  
                        
                  
                  
                  
                  </div>
            </div>

            
      )     
}

export default NewsItem