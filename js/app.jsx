import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {

    class ToDoTask extends React.Component {
        handleRemoveTask = () => {
            if (typeof this.props.done === 'function' ){
                this.props.done(this.props.taskTxt);
            }
        }
        render(){
            return <li>
                <span>{this.props.taskTxt}</span>
                <button onClick={this.handleRemoveTask}>remove</button>
            </li>;
        };
    };

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
        }

        render(){
            const tasks = this.state.tasks.map((task, i) => {
                return <ToDoTask taskTxt={task} key={i} done={this.handleTaskIsDone}/>
            });

            return <div className='toDoList'>
                <h1>Tasks to do</h1>
            <form onSubmit={this.handleAddNewTask}>
                <input type="text" value={this.state.newTask} onChange={this.handleAddNewText}/>
                <button>add</button>
            </form>
            <ul>
                {tasks}
            </ul>
            </div>
        };
    };

    const startTasks = ['Do shopping','Cook a dinner', 'Feed my cat'];

    ReactDOM.render(
        <ToDoList startTasks={startTasks} />,
        document.getElementById('app')
    );
});