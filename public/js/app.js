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

  resolve(cardsFromFakeDB);
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
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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

    this.setState({});
  }

  updateCard(card){


    // update my parent's cards state
    this.props.updateCard(card);

    const title = this.props.card.title;
    const priority = "";
    const status = "";
    const createdBy = "";
    const assignedTo = "";
    this.setState({
      title,
      priority,
      status,
      createdBy,
      assignedTo,
    });
  }

//prevents refresh
  handleSubmit(event) {
    event.preventDefault();
    this.updateCard(this.state);
  }


// DOM targets
  handleStatusChange(event) {
    console.log("event.target.value",event.target.value  );
    this.setState({ status : event.target.value });
  }


  render(){
    return (
  <div className = {`card ${this.props.card.priority}`}>
    <form onSubmit={this.handleSubmit}>
    <br />
    <p>Task: { this.props.card.title }</p>
    <div>Priority:  { this.props.card.priority }</div>
    <div onClick={() =>this.handleClick(this.props.card)} >Status: { this.props.card.status }</div>
    <div>Created By:  { this.props.card.createdBy }</div>
    <div>Assigned To:  { this.props.card.assignedTo }</div>
          <button type="submit">Update Card</button>
    </form>
  </div>
);
  }
}

const QueueSearch = filter =>
  ({ status }) =>
      status === 'Queue';

const ProgressSearch = filter =>
  ({ status }) =>
      status === 'In Progress';

const DoneSearch = filter =>
  ({ status }) =>
      status === 'Done';

const QueueList = ({ cards, filter, updateCard }) => (
  <p>
    { cards
      .filter(QueueSearch())
      .map( card => <Card card={card} updateCard={updateCard} /> )
    }
  </p>
);

const ProgressList = ({ cards, filter, updateCard  }) => (
  <p>
    { cards
      .filter(ProgressSearch())
      .map( card => <Card card={card} updateCard={updateCard} /> )
    }
  </p>
);

const DoneList = ({ cards, filter, updateCard  }) => (
  <p>
    { cards
      .filter(DoneSearch())
      .map( card => <Card card={card} updateCard={updateCard} /> )
    }
  </p>
);

const CardFilterInput = ({ setFilter }) => (
  <input type="text" placeholder="search" onChange={setFilter} />
);

class DoneColumn extends React.Component {
  //   constructor(props){
  //   super(props);
  // };

  render(){
    return (

          <div className="done">
            <p>Done</p>
            <DoneList cards={this.props.cards} updateCard={this.props.updateCard}></DoneList>
          </div>
    )
  }
}

//<ProgressList cards={this.props.cards}></ProgressList>
class ProgressColumn extends React.Component {
    // constructor(props){
    // super(props);
    // };

  render(){
    return (

          <div className="progress">
            <p>In Progress</p>
            <ProgressList cards={this.props.cards} updateCard={this.props.updateCard}></ProgressList>
          </div>

    )
  }
}

class QueueColumn extends React.Component {

  render(){
    return (

          <div className="queue">
            <p>Queue</p>
            <QueueList cards={this.props.cards} updateCard={this.props.updateCard}></QueueList>
          </div>

    )
  }
}




// const CardSearchFilter = filter =>
//   ({ status }) =>
//     filter === "" ||
//       status.toLowerCase().indexOf(filter.toLowerCase()) >= 0;

// const CardList = ({ cards, filter }) => (
//   <div>
//     { cards
//       .filter(CardSearchFilter(filter))
//       .map( card => <Card card={card} /> )
//     }
//     </div>
// );

// const CardFilterInput = ({ setFilter }) => (
//   <input type="text" placeholder="search" onChange={setFilter} />
// );

class NewCardForm extends React.Component {

  constructor(props){
    super(props);

    // set the initial state
    this.state = {
      cards: [],
      title: '',
      priority: '',
      status: '',
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

    // update my parent's cards state
    this.props.addCard(card);

    const title = "";
    const author = "";
    const status ='';
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
    NewForm.reset();

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

    return (
        <form id="NewForm" onSubmit={this.handleSubmit}>
          <input onChange={this.handleTitleChange} value={this.state.title } placeholder="Title" required/>
          <br/>
          <select value={this.state.value} onChange={this.handlePriorityChange} required>
            <option value="">Select Your Priority:</option>
            <option value="low" >Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="blocker" >Blocker</option>
          </select>
          <br /> <input type="radio" name="status" value="Queue" onChange={this.handleStatusChange}  required/>In Queue <br />
         <input type="radio" name="status" value="In Progress" onChange={this.handleStatusChange}  required/>In Progress <br />
         <input type="radio" name="status" value="Done" onChange={this.handleStatusChange}  required/>Done
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
      todo: [],
      inProgress: [],
      done: []
    };

    this.setFilter = this.setFilter.bind(this);
    this.addCard = this.addCard.bind(this);
    this.updateCard = this.updateCard.bind(this);

  }

  componentWillMount() {
    this.getCard().then( cards => {
      this.setState({ cards });
    });
  }


  getCard(){
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

  updateCard(card){
if(card === null){
  return;
}
    this.setState({
      cards : this.state.cards.concat(card)
    });
  }


  render(){
    return (
      <div id="board">
      <NewCardForm addCard={this.addCard}/>
        <QueueColumn cards={this.state.cards} updateCard={this.updateCard} />
        <ProgressColumn cards={this.state.cards} updateCard={this.updateCard} />
        <DoneColumn cards={this.state.cards} updateCard={this.updateCard} />
      </div>
    );
  }
};


// ReactDOM.render(
//   // component to render
//   <NewCardForm/>,
//   // dom element, or use getElementById
//   document.getElementById("root0")
// );
ReactDOM.render(
  // component to render
  <App />,
  // dom element, or use getElementById
  document.getElementById("root")
);