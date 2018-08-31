import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {

    class ToDoTask extends React.Component {
        handleRemoveTask = () => {
            if (typeof this.props.done === 'function' ){
                this.props.done(this.props.taskTxt);
            }
        };
        render(){
            return <li>
                <span>{this.props.taskTxt}</span>
                <button onClick={this.handleRemoveTask}>remove</button>
            </li>;
        };
    }

    class Clock extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                time: new Date().toLocaleString('pl-PL', { hour: 'numeric', minute: 'numeric', second: 'numeric' }),
            };
        }

        componentDidMount() {
            this.intervalID = setInterval(() => this.count(), 1000);
        }

        count() {
            this.setState({
                time: new Date().toLocaleString('pl-PL', { hour: 'numeric', minute: 'numeric', second: 'numeric' }),
            });
        };

        componentWillUnmount() {
            clearInterval(this.intervalID);
        }

        render() {
            return <p>{this.state.time}</p>
        }
    }

    class ToDoList extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                tasks: [...this.props.startTasks],
                startTasks: this.props.startTasks,
                text: '',
            };
        };

        handleTaskIsDone = taskTxt => {
            const curTasks = this.state.tasks.filter(task => {
                return task !== taskTxt;
            });
            this.setState({
                tasks: curTasks,
            });
        };

        handleAddNewText = (event) => {
            this.setState({
                text: event.target.value,
            });
        };

        handleAddNewTask = (event) => {
            event.preventDefault();
            this.setState({
                tasks: [...this.state.tasks, this.state.text],
                text: '',
            });
        };

        render(){
            const tasks = this.state.tasks.map((task, i) => {
                return <ToDoTask taskTxt={task} key={i} done={this.handleTaskIsDone}/>
            });

            return <div className='container'>
                    <div className='toDoList'>
                        <h1>Tasks to complete</h1>
                        <form onSubmit={this.handleAddNewTask}>
                            <input type="text" value={this.state.newTask} onChange={this.handleAddNewText}/>
                            <button>add</button>
                        </form>
                        <ul>
                            {tasks}
                        </ul>
                    </div>
                    <div><img src='images/pen.png' className='pen' /></div>
                    <div className='clock'>
                        <Clock></Clock>
                    </div>
                </div>
        };
    }

    const startTasks = ['Go shopping','Cook a dinner', 'Feed my cat'];

    ReactDOM.render(
        <ToDoList startTasks={startTasks} />,
        document.getElementById('app')
    );
});