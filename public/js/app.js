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

class Card extends React.Component {
  constructor(props){
    super(props);

    // set the initial state
    // this.state = {
    //   title: "",
    //   priority: "",
    //   status: "",
    //   createdBy: "",
    //   assignedTo: "",
    //   id: ""
    // };
    this.handleClick = this.handleClick.bind(this);

  }


 handleClick(card) {
  switch (card.status) {
    case "Queue":
        card.status = "In Progress";
        break;
    case "In Progress":
        card.status = "Done";
        break;
    case "Done":
        card.status = "Queue";
        break;
}
    console.log("card",card);
    this.setState({});
  }


  render(){
    return (
  <div className = {`card ${this.props.card.priority}`}>
    <h3>Task: { this.props.card.title }</h3>
    <div>Priority Level:  { this.props.card.priority }</div>
    <div onClick={() =>this.handleClick(this.props.card)} >Status of Task: { this.props.card.status }</div>
    <div>Created By:  { this.props.card.createdBy }</div>
    <div>Assigned To:  { this.props.card.assignedTo }</div>
  </div>
);
  }
}


// const Card = (props) => (

// <div className = {`card ${props.card.priority}`}>

//           <strong>Card {props.card.id}: {props.card.title}</strong>
//           <br />{props.card.priority}
//           <br />{props.card.status}
//           <br />{props.card.createdBy}
//           <br />{props.card.assignedTo}
// </div>

// );

const CardSearchFilter = filter =>
  ({ status }) =>
    filter === "" ||
      status.toLowerCase().indexOf(filter.toLowerCase()) >= 0;

const CardList = ({ cards, filter }) => (
  <div>
    { cards
      .filter(CardSearchFilter(filter))
      .map( card => <Card card={card} /> )
    }
    </div>
);

const CardFilterInput = ({ setFilter }) => (
  <input type="text" placeholder="search" onChange={setFilter} />
);

class NewCardForm extends React.Component {

  constructor(props){
    super(props);

    // set the initial state
this.state = {
  cards: [],
  title: '',
  priority: '',
  status: 'Queue',
  createdBy: '',
  assignedTo: ''};
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleCreatedByChange = this.handleCreatedByChange.bind(this);
    this.handleAssignedToChange = this.handleAssignedToChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
 }




  addCard(card){
    console.log(card);
    // update my parent's cards state
    this.props.addCard(card);

    const title = "";
    const author = "";
    const status ='Queue';
    const createdBy = "";
    const assignedTo = "";
    const priority = "";
    this.setState({
      title,
      priority,
      status,
      createdBy,
      assignedTo
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addCard(this.state);
  }

    handleTitleChange(event) {
    this.setState({ title : event.target.value });
  }
    handlePriorityChange(event) {
    this.setState({ priority : event.target.value });
  }
    handleStatusChange(event) {
    this.setState({ status : event.target.value });
  }
    handleCreatedByChange(event) {
    this.setState({ createdBy : event.target.value });
  }
    handleAssignedToChange(event) {
    this.setState({ assignedTo : event.target.value });
  }


  render(){
console.log('this.handleSubmit', this.cards)
    return (
        <form onSubmit={this.handleSubmit}>

          <input onChange={this.handleTitleChange} value={this.state.title } placeholder="Title" required/>
          <br/>
          <select value={this.state.value} onChange={this.handlePriorityChange}>
            <option  disabled selected>Select Your Priority:</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="blocker">Blocker</option>
          </select>
          <br /> <input type="radio" name="status" value="Queue" onChange={this.handleStatusChange}  defaultChecked={true}/>In Queue <br />
         <input type="radio" name="status" value="In Progress" onChange={this.handleStatusChange}  />In Progress <br />
         <input type="radio" name="status" value="Done" onChange={this.handleStatusChange}  />Done
          <br/>

          <input onChange={this.handleCreatedByChange} value={this.state.createdBy} placeholder="Created By" required/>
          <br/>
          <input onChange={this.handleAssignedToChange} value={this.state.assignedTo} placeholder="Assigned To" required/>
          <br/>
          <button>{'Add Card'}</button>
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

    console.log('props', this.state);
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
    console.log("card", card);
  }

 handleClick() {
    this.replaceState({
      status : "done"
    });
  }


  render(){
    return (
      <div>
        <h1>Kanban</h1>
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