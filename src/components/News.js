import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";











export default class News extends Component {

      static defaultProps = {
            country : 'in',
            pageSize : 8,
            category : 'general'
      }

      static propTypes = {
            country : PropTypes.string,
            pageSize : PropTypes.number,
            category : PropTypes.string

      }

      constructor(props){

            super(props);
            
            this.state = {
                  articles : [],
                  loading : false,
                  page : 1,
                  totalResults : 0
            }
      }



      updateNews = async () => {
      
            this.props.setProgress(50);
            
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            
            let data = await fetch(url);
            this.props.setProgress(70);


            let parsedData = await data.json();
            this.props.setProgress(85);
 

            this.setState({articles : parsedData.articles,
                   totalResults : parsedData.totalResults,
                   loading : false});

            this.props.setProgress(100);       

      }



      async componentDidMount(){
            this.updateNews();
      }


    
      capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);



      fetchMoreData = async () =>{
            this.setState({page : this.state.page + 1});
            
            
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);

            let parsedData = await data.json();
           
            this.setState({articles :  this.state.articles.concat(parsedData.articles),
                   totalResults : parsedData.totalResults,
                  loading : false});
      }






















      render() {
            return (

                  <>

                        {/* {this.state.loading && <Spinner/>} */}
                

                        <div className="container">

                              <h4 className="text-center my-3 text-dark" style={{borderRadius: "1rem", border: "none", padding: "15px", backgroundColor:"#abc4ff"}}>Top headlines on {this.capitalize(this.props.category)}</h4>
                        

                              <InfiniteScroll
                              dataLength={this.state.articles.length}
                              next={this.fetchMoreData}
                              hasMore={this.state.articles.length !== this.state.totalResults}
                              loader={<Spinner/>}>
                                          
                                    <div className="container row text-center">
                                          {this.state.articles.map( (element) => { 

                                                return (
                                                      <div className="col-md-4" key={element.url}>
                                                            <NewsItem title={element.title} imageUrl={element.urlToImage} 
                                                            newsUrl={element.url} source={element.source.name} date={element.publishedAt}/>
                                                      </div>
                                                      
                                                )

                                          } )}

                                    </div>

                              </InfiniteScroll>

                        </div>



                  </>
            )
      } 
}
 
