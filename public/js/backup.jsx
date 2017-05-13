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
resolve(cardsFromFakeDB);
});

const Cards = (props) => (
  <li>
    <h3>{ props.card.title }</h3>
    <p>{ props.card.status }</p>
  </li>
);


class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleCreatedByChange = this.handleCreatedByChange.bind(this);
    this.handleAssignedToChange = this.handleAssignedToChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {cards: [], title: '', priority: '',status: 'Queue',createdBy: '',assignedTo: ''};
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

  handleSubmit(e) {
    e.preventDefault();

    var newCard = {
      title: this.state.title,
      id: this.state.cards.length + 1,
      priority: this.state.priority,
      status: this.state.status,
      createdBy: this.state.createdBy,
      assignedTo: this.state.assignedTo

    };
    this.setState((prevState) => ({
      cards: prevState.cards.concat(newCard),
      title: '',
      priority: '',
      status: 'Queue',
      createdBy: '',
      assignedTo: ''
    }));
  }

buttonClick() {console.log("a")}

   render() {
    return (
      <div>
        <h1>Kanban Board</h1>
        <TodoList cards={this.state.cards} />
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
         <input type="radio" name="status" value="In_Progress" onChange={this.handleStatusChange}  />In Progress <br />
         <input type="radio" name="status" value="Done" onChange={this.handleStatusChange}  />Done
          <br/>

          <br/>

          <input onChange={this.handleCreatedByChange} value={this.state.createdBy} placeholder="Created By" required/>
          <br/>
          <input onChange={this.handleAssignedToChange} value={this.state.assignedTo} placeholder="Assigned To" required/>
          <br/>
          <button onClick= {this.buttonClick}>{'Add Card #' + (this.state.cards.length + 1)}</button>
        </form>
      </div>
    );
  }
}

class TodoList extends React.Component {

componentWillMount() {
    this.getCards().then( cards => {
      this.setState({ cards });
    });
  }

  getCards(){
    return getCardsFromFakeXHR();
  }


  render() {
    return (
      <div className="test">

        {this.props.cards.map(item => (
<div className = {`card ${item.priority}`}>

          <strong>Card {item.id}: {item.title}</strong>
          <br />{item.priority}
          <br />{item.status}
          <br />{item.createdBy}
          <br />{item.assignedTo}
</div>
        ))}
      </div>
    );
  }
}

ReactDOM.render(<TodoApp />, root);