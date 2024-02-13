import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

 const News =  (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        updateNews()
        document.title = `${props.category} - NewsMonkey`;
      },[]);


    const  updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        props.setProgress(50);
        let data = await fetch(url)
        let pasredata = await data.json();
        setArticles(pasredata.articles);
        setLoading(false);
        setTotalResults(pasredata.totalResults);
            props.setProgress(100);
    }
    const handlePrevClick = async () => {
        setPage(page - 1)
        updateNews()
    }
    const handleNextClick = async () => {
        setPage(page + 1)
        updateNews()
    }
     const fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url)
        let pasredata = await data.json();
        setTotalResults(pasredata.totalResults);
        setArticles(articles.concat(pasredata.articles));
        }

        return (
            <>
            <h2 className='text-center mb-2' style={{margin: '10y', marginTop: "90px"}}>NewMonkey - Top {props.category} headlines</h2>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}>
                <div className="container">
                    <div className="row">
                        {articles.map((element)=>{
                        return <div className="col-md-4" key = {element.url}>
                                <NewsItem  title ={element.title ? element.title : ""} description = {element.description ? element.description : ""} 
                                imageUrl = {element.urlToImage} newUrl = {element.url} author = {element.author ? element.author : "unknown"} 
                                date={element.publishedAt ? element.publishedAt : "--"} source = {element.source.name}/>
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
        )
}

export default News

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }