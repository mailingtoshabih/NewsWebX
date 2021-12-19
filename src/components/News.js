import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";











const News = (props) => {


      const [articles, setArticles] = useState([])
      const [loading, setLoading] = useState(true)
      const [page, setPage] = useState(1)
      const [totalResults, setTotalResults] = useState(0)
      
      
      
      
      
      
      const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);


      const updateNews = async () => {
      
            props.setProgress(50);
            
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
            setLoading(true);
            
            let data = await fetch(url);
            props.setProgress(70);

            let parsedData = await data.json();
            props.setProgress(85);
 
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
            setLoading(false);

            props.setProgress(100);       
      }




      useEffect(() => {
            
            updateNews();
            // eslint-disable-next-line
      }, [])




      const fetchMoreData = async () =>{
            
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      
            setPage(page+1);
      
            let data = await fetch(url);

            let parsedData = await data.json();
           
            setArticles(articles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);
      }










      
      return (

      <>

           
            <div className='container'>

                  <h6 className="container text-center text-dark" 
                  style={{
                        
                        borderRadius: "1rem",
                        border: "none",
                        padding: "15px",
                        backgroundColor:"#64b5f6",
                        marginTop:"80px",
                        fontFamily: "Roboto Slab",
                        
                  }}>Top headlines on {capitalize(props.category)}</h6>
      
            </div>


            <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}>

                  <div className="container">

                        <div className="row">
                              {articles.map( (element) => { 

                                    return (
                                          <div className="col-md-4" key={element.url}>
                                                <NewsItem title={element.title} imageUrl={element.urlToImage} 
                                                newsUrl={element.url} source={element.source.name} date={element.publishedAt}/>
                                          </div>
                                          
                                    )

                              } )}

                        </div>

                  
                  </div>
                  

            </InfiniteScroll>

            

            



      </>
      )
      
}
 

News.defaultProps = {
      country : 'in',
      pageSize : 8,
      category : 'general'
}

News.propTypes = {
      country : PropTypes.string,
      pageSize : PropTypes.number,
      category : PropTypes.string

}



export default News
