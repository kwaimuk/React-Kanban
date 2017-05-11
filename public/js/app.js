const reactContainer = document.getElementById("root");

const getCardsFromFakeXHR = () => new Promise((resolve, reject) => {
  const cardsFromFakeDB = [
    {
      title: "Dance",
      priority: "low",
      status: "Queue",
      createdBy: "Tim",
      assignedTo: "Lim"
    },
    {
      title: "Sing",
      priority: "medium",
      status: "In Progress",
      createdBy: "Kim",
      assignedTo: "Sim"
    },
    {
      title: "Shout",
      priority: "high",
      status: "Done",
      createdBy: "Pim",
      assignedTo: "Zim"
    }
  ];

  setTimeout(() => resolve(cardsFromFakeDB), 250);
});

const Card = (props) => (

<div className = {`card ${props.card.priority}`}>

          <strong>Card {props.card.id}: {props.card.title}</strong>
          <br />{props.card.priority}
          <br />{props.card.status}
          <br />{props.card.createdBy}
          <br />{props.card.assignedTo}
</div>

);

const CardSearchFilter = filter =>
  ({ title, author }) =>
    filter === "" ||
      title.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
      author.toLowerCase().indexOf(filter.toLowerCase()) >= 0;

const CardList = ({ cards, filter }) => (
  <ul>
    { cards
      .filter(CardSearchFilter(filter))
      .map( card => <Card card={card} /> )
    }
  </ul>
);

const CardFilterInput = ({ setFilter }) => (
  <input type="text" placeholder="search" onChange={setFilter} />
);

class NewCardForm extends React.Component {

  constructor(props){
    super(props);

    // set the initial state
    this.state = {
      title: "",
      author: ""
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  addCard(card){
    console.log(card);
    // update my parent's cards state
    this.props.addCard(card);

    const title = "";
    const author = "";
    this.setState({
      title,
      author
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addCard(this.state);
  }

  handleTitleChange(event) {
    this.setState({ title : event.target.value });
  }

  handleAuthorChange(event) {
    this.setState({ author : event.target.value });
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input type="text" placeholder="title" onChange={this.handleTitleChange} value={this.state.title} />
        </div>
        <div>
          <input type="text" placeholder="author" onChange={this.handleAuthorChange} value={this.state.author} />
        </div>
        <div>
          <button type="submit">Add Card</button>
        </div>
      </form>
    )
  }
}

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      cards : [],
      filter : ""
    };

    this.setFilter = this.setFilter.bind(this);
    this.addCard = this.addCard.bind(this);

  }

  componentWillMount() {
    this.getCards().then( cards => {
      this.setState({ cards });
    });
  }

  getCards(){
    return getCardsFromFakeXHR();
  }

  setFilter(e){
    // consgvole.log(e.target.value);
    this.setState({ filter : e.target.value });
  }

  addCard(card){
    this.setState({
      cards : this.state.cards.concat(card)
    });
  }

  render(){
    return (
      <div>
        <h1>Hello React</h1>
        <CardFilterInput setFilter={this.setFilter} />
        <CardList cards={this.state.cards} filter={this.state.filter}></CardList>
        <NewCardForm addCard={this.addCard}/>
      </div>
    );
  }
};

ReactDOM.render(
  // component to render
  <App />,

  // where to inject this component
  // dom element, or use getElementById
  reactContainer
);