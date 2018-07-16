import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Jumbotron from "./components/Jumbotron";
import Wrapper from "./components/Wrapper";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import cards from "./data.json";

class App extends Component {
  state = {
    cards,
    score: 0,
    topScore: 0
  };

  componentDidMount() {
    this.setState({ cards: this.shuffleCards(this.state.cards) });
  }

  shuffleCards = cards => {
    console.log("shuffle");
    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
    return cards;
  }

  handleCardClick = id => {
    let correctGuess = false;
    const newData = this.state.cards.map(card => {
      const newCard = { ...card };
      if (newCard.id === id) {
        if (!newCard.clicked) {
          newCard.clicked = true;
          correctGuess = true;
        }
      }
      return newCard;
    });

    correctGuess ? this.handleCorrectGuess(newData): this.handleIncorrectGuess(newData);
  };

  handleCorrectGuess = newData => {
    const { topScore, score } = this.state;
    const newScore = score + 1;
    const newTopScore = newScore > topScore ? newScore : topScore;
    this.setState({
      cards: this.shuffleCards(newData),
      score: newScore,
      topScore: newTopScore
    });
  };

  handleIncorrectGuess = cards => {
    this.setState({
      cards: this.resetCards(cards),
      score: 0
    });
  };

  resetCards = cards => {
    const resetCards = cards.map(card => ({ ...card, clicked: false }));
    return this.shuffleCards(resetCards);
  };

  renderMessage = () => {
    let message = "";
    if (this.state.score === 0 && this.state.topScore === 0) {
      message = "Click an image to begin!";
    } else if (this.state.score === 0 && this.state.topScore > 0) {
      message = "You guessed incorrectly!";
    } else if (this.state.score > 0 && this.state.topScore > 0) {
      message = "You guessed correctly!";
    }
    return message;
  };

  render() {
    return (
      <Wrapper>
      <div className="main">
        <Jumbotron score={this.state.score} topScore={this.state.topScore} />
        <div className="container">
          <h6 className="score-message"> {this.renderMessage()} </h6>
          {this.state.cards.map(card => (
            <Cards
              id={card.id}
              key={card.id}
              handleClick={this.handleCardClick}
              name={card.name}
              image={card.image}
            />
          ))}
        </div>
        <Footer />
      </div>
      </Wrapper>
    );
  }
}

export default App;
