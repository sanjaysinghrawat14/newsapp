import React from 'react'

 const NewsItem  = (props) =>  {
   
    let {title, description, imageUrl, newUrl, author, date, source} = props
    return (
      <div>
        <div className="card" style={{}}>
            <img src={imageUrl ? imageUrl : "https://staticg.sportskeeda.com/editor/2024/02/e407f-17069574612875-1920.jpg"} className="card-img-top" alt="..." />
            <div className="card-body">
              <div style ={{left: "90%", zIndex: '1'}}>
                <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" > {source}</span>
                </div>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toUTCString()}</small></p>
                <a href={newUrl} target ="_blank" className="btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
      </div>
    )
  }

export default NewsItem