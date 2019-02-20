import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import friends from "./friends.json";

var bgColors ={
  "Default": "#e3f2fd",
  "main" : "#ECEFF1"
}

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    clicked:[],
    score: 0,
    highScore : 0,
    alertMessage : ""
  };

  shuffle = (array) => {
    //console.log(array.length)
    for (var i = array.length-1; i > 0  ; i--){
      const j = Math.floor(Math.random()* (i+1));
      [array[i],array[j]]= [array[j],array[i]]
    }
   // console.log(array);
    return array
  }

  

  clicked = id => {
    const shuffledArray = this.shuffle(friends);
    this.setState({friends :shuffledArray});
    if(this.state.clicked.includes(id)){
      this.setState({
        score : 0,
        clicked :[],
        alertMessage : "Game Over"
      }) 
     alert("Game Over");
    }else{
      this.state.clicked.push(id);
      var newScore = this.state.score+ 1 
      this.setState({
          score :  newScore   
        
        })
      this.checkHighScore(newScore)
      this.checkWin()
    }
  }
  checkHighScore = (newScore) =>{
    if (newScore > this.state.highScore){
      this.setState({
        highScore : newScore
      }) 
      //console.log(this.state.highScore)
      
    }
    console.log("new high score");
  }

  checkWin = () =>{
   // console.log(this.state.friends.length)
    if (this.state.highScore +1 === this.state.friends.length){
      alert("You win");
    this.setState({
        score :  0,
        clicked : []   
      })
    }     
  }

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
    <div style={{backgroundColor: bgColors.main}} >
      <nav  className="navbar navbar-light row" style={{backgroundColor: bgColors.Default}}>
          <div className="col-3"></div> 
            <div className="col-6">
            <h1>Click on the image Only Once! </h1>  
            </div>
            <div className="col-3">
            <div className="row">Score : {this.state.score}</div>
            <div className="row">highScore : {this.state.highScore}</div>
            </div>
       
      </nav>
      

      <Wrapper>
        {this.state.friends.map(friend => (  //dont understand this part
          <FriendCard
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            clicked ={this.clicked}

          />
        ))}
      </Wrapper>
      <div class="push"></div>
      <footer class="footer">
          <div class="container">
            <center>Copyright 2018</center>
           </div>
      </footer>
    </div>
    );
  }
}

export default App;
