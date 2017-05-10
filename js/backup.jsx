const reactContainer = document.getElementById("root");
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleCreatedByChange = this.handleCreatedByChange.bind(this);
    this.handleAssignedToChange = this.handleAssignedToChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {cards: [], title: '', priority: '',status: 'queue',createdBy: '',assignedTo: ''};
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

  // handleChange(e) {
  //   this.setState({title: e.target.value});
  //   this.setState({priority: e.target.value});
  //   this.setState({status: e.target.value});
  //   this.setState({createdBy: e.target.value});
  //   this.setState({assignedTo: e.target.value});
  // }

  handleSubmit(e) {
    e.preventDefault();

    var newCard = {
      title: this.state.title,
      id: this.state.cards.length + 1
    };
    this.setState((prevState) => ({
      cards: prevState.cards.concat(newCard),
      title: '',
      priority: '',
      status: 'queue',
      createdBy: '',
      assignedTo: ''
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>

        {this.props.cards.map(item => (
<div>
          <li>Card {item.status}: {item.title}
          <p>{item.id}</p></li>


</div>
        ))}
      </ul>
    );
  }
}

  render() {
    return (
      <div>
        <h1>Kanban Board</h1>
        <TodoList cards={this.state.cards} />
        <form onSubmit={this.handleSubmit}>
          <div>
          <input onChange={this.handleTitleChange} value={this.state.title } placeholder="Title" />
          </div>
          <div>
          <input onChange={this.handlePriorityChange} value={this.state.priority} placeholder="Priority"/>
          </div>
          <div>
          <input onChange={this.handleStatusChange} value={this.state.status} placeholder="Status"/>
          </div>
          <div>
          <input onChange={this.handleCreatedByChange} value={this.state.createdBy} placeholder="Created By"/>
          </div>
          <div>
          <input onChange={this.handleAssignedToChange} value={this.state.assignedTo} placeholder="Assigned To"/>
          </div>
          <button>{'Add Card #' + (this.state.cards.length + 1)}</button>
        </form>
      </div>
    );
  }
ReactDOM.render(<TodoApp />, root);