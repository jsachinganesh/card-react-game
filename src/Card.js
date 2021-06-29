import React from 'react';

const Card = ({hero,flipCardFun,flipedCard,url,index}) => {
    const name = `flip-card-inner ${flipedCard?'rotateCard':''}`
    return (
      <button onClick={()=>flipCardFun(index)} className="flip-card">
          <div className={name}>
            <div className="flip-card-front">
              <div className="box1"></div>
            </div>
            <div className="flip-card-back" style={{
              backgroundImage:`url(${url})`
            }}>
              <h1>{hero}</h1> 
              
            </div>
          </div>
      </button>
    );
}
  

export default Card;
