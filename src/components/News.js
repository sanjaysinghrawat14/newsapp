import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
      }
      static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
      }
    async componentDidMount(){
        this.updateNews()
        // this.setState({ laoding: true})
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=87d5440f2784416493f65aadab405cbd&page=1&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url)
        // let pasredata = await data.json();
        // this.setState({articles: pasredata.articles, 
        //     totalResults: pasredata.totalResults,
        //     laoding: false
        // })
    }

    constructor(props){
        super(props);
        console.log('cons');
        this.state = {
            articles: [],
            laoding:false,
            page: 1,
            nextBtnCheck: false,
            totalResults: 0
        }
        document.title = `${this.props.category} - NewsMonkey`
    }
    async updateNews(){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ laoding: true})
        this.props.setProgress(50);
        let data = await fetch(url)
        let pasredata = await data.json();
        this.setState({
            totalResults: pasredata.totalResults, 
            articles: pasredata.articles,
            laoding: false})
            this.props.setProgress(100);
    }
    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1})
        this.updateNews()
        // this.setState({ laoding: true})
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=87d5440f2784416493f65aadab405cbd&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url)
        // let pasredata = await data.json();
        // this.setState({
        //     page: this.state.page - 1, 
        //     articles: pasredata.articles,
        //     laoding: false})
    }
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1})
        this.updateNews()
        // if(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize) ){
        //     // this.setState({ nextBtnCheck: true})
        // }else{
        //     this.setState({ laoding: true})
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=87d5440f2784416493f65aadab405cbd&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     let data = await fetch(url)
        //     let pasredata = await data.json();
        //     this.setState({           
        //          page: this.state.page + 1, 
        //         articles: pasredata.articles,
        //         laoding: false})
        // }
    }
     fetchMoreData = async () => {
          this.setState({
            page: this.state.page + 1
          });
        //   this.setState({ laoding: true}) #hide in infinite scroll
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url)
        let pasredata = await data.json();
        this.setState({
            totalResults: pasredata.totalResults, 
            articles: this.state.articles.concat(pasredata.articles), 
            // laoding: false 
        })
        }
    
    render() {
        // console.log(this.state.articles);

        return (
            <>
        {/* <div className = "container my-3"> */}
            <h2 className='text-center mb-2'>NewMonkey - Top {this.props.category} headlines</h2>
            {/* {this.state.laoding && <Spinner />} */}
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner/>}>
                <div className="container">
                    <div className="row">
                        {!this.state.laoding && this.state.articles.map((element)=>{
                        return <div className="col-md-4" key = {element.url}>
                                <NewsItem  title ={element.title ? element.title : ""} description = {element.description ? element.description : ""} 
                                imageUrl = {element.urlToImage} newUrl = {element.url} author = {element.author ? element.author : "unknown"} 
                                date={element.publishedAt ? element.publishedAt : "--"} source = {element.source.name}/>
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
            </div> */}
             
        {/* </div> */}
        </>
        )
    }
}
