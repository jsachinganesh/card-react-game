import './App.css';
import React from 'react';
import Card from './Card';

const herosArr = [
  {
    id:19,
    hero:'batman',
    url:'https://freepngimg.com/thumb/batman/7-2-batman-vector-png.png'
  },
  {
    id:28,
    hero:'super man',
    url:'https://freepngimg.com/thumb/superman/1-2-superman-animated-png-thumb.png'
  },
  {
    id:39,
    hero:'wonder Women',
    url:'http://pngimg.com/uploads/wonder_woman/wonder_woman_PNG58.png'
  },
  {
    id:47,
    hero:'spider man',
    url:'https://freepngimg.com/thumb/spiderman/4-2-spider-man-free-download-png-thumb.png'
  },
  {
    id:89,
    hero:'iron man',
    url:'https://freepngimg.com/thumb/iron_man/1-2-iron-man-picture-thumb.png'
  },
  {
    id:99,
    hero:'hulk',
    url:'https://freepngimg.com/thumb/hulk/20082-8-hulk-image-thumb.png'
  }
];

function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

let data = shuffle([...herosArr,...herosArr]);

function App() {

  const [open,setOpen] = React.useState([]);
  const [match,setMatch] = React.useState([]);
  const modalRef = React.useRef(null);

  React.useEffect(()=>{
    setTimeout(()=>{
      if(match.length === herosArr.length){
        modalRef.current.style.display = 'block';
      }
    },500)
  },[match])

  React.useEffect(()=>{
    if(open.length<2) return;
    const card1 = data[open[0]];
    const card2 = data[open[1]];
    if(card1.hero === card2.hero){
      if (match.includes(card1.id)) return;
      setMatch((matchs)=>[...matchs,card1.id]);
    }
  },[open]);


  React.useEffect(() => {
    if(open.length === 2){
      setTimeout(()=>{
        setOpen([]);
      },800)
    }
  }, [open]);

  function flipCardFun(i){
    if (open.includes(i)) return;
    setOpen((openns)=>[...openns,i]);
  }

  function resetHandler(){
    data = shuffle([...herosArr,...herosArr]);
    setOpen([]);
    setMatch([]);
    modalRef.current.style.display = 'none';
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="container">
        <div ref={modalRef} className="modal">
          <div className="modalContainer">
            <h1>GameOver</h1>
            <button onClick={resetHandler}>ReStart</button>
          </div>
        </div>
        {
            data.map((hero,i)=>{
              let flipedCard = false;
            
              if(open.includes(i)) flipedCard = true;
              if(match.includes(hero.id)) flipedCard = true;
              return <Card key={i} url={hero.url} index={i} hero={hero.hero} flipCardFun={flipCardFun} flipedCard={flipedCard}/>
            })
        }
      </div>
    </div>
  );
}

export default App;