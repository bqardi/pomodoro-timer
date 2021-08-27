import { useEffect, useState } from "react";
import useGlobalContext from "../contexts/GlobalContext";
import "./Todo.scss";

function Todo(){
	var {state, dispatch, ACTION_TYPES} = useGlobalContext();
	var [description, setDescription] = useState("");
	var [pomodoros, setPomodoros] = useState(1);
	var [error, setError] = useState("");
	
	function addTask(e){
		e.preventDefault();
		if (!description) {
			setError("Description required!");
			return;
		}
		dispatch({type: ACTION_TYPES.ADD_TASK, payload: {
			description,
			pomodoros
		}});
		setDescription("");
		setPomodoros(1);
	}
	function descriptionChangeHandler(e){
		error && setError("");
		setDescription(e.target.value);
	}
	function pomodorosChangeHandler(e){
		var value = e.target.value;
		if (!value) {
			value = "1";
			setTimeout(() => {
				e.target.select();
			});
		}
		setPomodoros(parseInt(value));
	}

	useEffect(() => {
		var taskList = state.tasks.filter(task => !task.completed);
		if (taskList.length) {
			dispatch({type: ACTION_TYPES.ACTIVE_TASK, payload: taskList[0]});
		} else {
			dispatch({type: ACTION_TYPES.ACTIVE_TASK, payload: null});
		}
	}, [state.tasks, dispatch, ACTION_TYPES]);

	return (
		<div className="Todo">
			<form className="Todo__form" onSubmit={addTask}>
				<div className="Todo__field">
					<label htmlFor="pomodoros" className="Todo__label">Pomodoro rounds</label>
					<div className="Todo__description">
						<input
							id="pomodoros"
							type="number"
							min="1"
							className="Todo__input"
							value={pomodoros}
							onChange={pomodorosChangeHandler}
						/>
						<div className="Todo__float">
							<button
								type="button"
								className="Todo__button"
								onClick={() => setPomodoros(prev => prev === 1 ? 1 : prev - 1)}
								title="Decrease pomodoros"
								tabIndex="-1"
							>
								<svg viewBox="0 0 24 24"><path d="M19,13H5V11H19V13Z"></path></svg>
							</button>
							<button
								type="button"
								className="Todo__button"
								onClick={() => setPomodoros(prev => prev + 1)}
								title="Increase pomodoros"
								tabIndex="-1"
							>
								<svg viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path></svg>
							</button>
						</div>
					</div>
				</div>
				<div className="Todo__field">
					<label htmlFor="task" className="Todo__label">Task description</label>
					<div className="Todo__description">
						<input
							id="task"
							type="text"
							className={`Todo__input${error ? " Todo__input--error" : ""}`}
							placeholder="My first task"
							value={description}
							onChange={descriptionChangeHandler}
						/>
						<div className="Todo__float">
							<button type="submit" className="Todo__button" title="Add to list">
								<svg viewBox="0 0 24 24"><path d="M2,16H10V14H2M18,14V10H16V14H12V16H16V20H18V16H22V14M14,6H2V8H14M14,10H2V12H14V10Z"></path></svg>
							</button>
						</div>
					</div>
					{error && <p className="Todo__error">{error}</p>}
				</div>
			</form>
			<div className="TodoList">
				{state.tasks.length === 0 ? null : <p className="TodoList__title">Task list</p>}
				{state.tasks.length === 0 ? <p style={{textAlign: "center"}}>No tasks added</p> : null}
				{state.tasks.filter(task => !task.completed).map(task => <TodoItem key={task.id} task={task} />)}
			</div>
			<div className="TodoList">
				{state.tasks.length === 0 ? null : <p className="TodoList__title">Completed list</p>}
				{state.tasks.filter(task => task.completed).map(task => <TodoItem key={task.id} task={task} />)}
			</div>
		</div>
	);
}

function TodoItem({task}){
	var {state, dispatch, ACTION_TYPES} = useGlobalContext();
	var [dragPos, setDragPos] = useState(0);
	
	function itemClickHandler(e){
		if (e.target.className !== "TodoList__pomodoroRounds") {
			if (task.completed || state.running) return;
			dispatch({type: ACTION_TYPES.ACTIVE_TASK, payload: task});
		}
	}
	function mouseUpHandler(e){
		if (state.running) return;
		e.preventDefault();
		e.stopPropagation();
		dispatch({type: ACTION_TYPES.UPDATE_POMODORO, payload: {id: task.id, amount: 1}});
	}
	function keyDownHandler(e){
		if (e.key === "ArrowUp") {
			dispatch({type: ACTION_TYPES.UPDATE_POMODORO, payload: {id: task.id, amount: 1}});
		}
		if (e.key === "ArrowDown" && task.pomodoros > 1) {
			dispatch({type: ACTION_TYPES.UPDATE_POMODORO, payload: {id: task.id, amount: -1}});
		}
	}
	function dragStartHandler(e){
		var target = e.touches?.[0] || e;
		e.stopPropagation();
		setDragPos(target.pageY);
		var img = new Image();
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    e.dataTransfer.setDragImage(img, 0, 0);
	}
	function dragHandler(e){
		var target = e.touches?.[0] || e;
		e.stopPropagation();
		if (dragPos - target.pageY >= 25) {
			dispatch({type: ACTION_TYPES.UPDATE_POMODORO, payload: {id: task.id, amount: 1}});
			setDragPos(target.pageY);
		}
		if (dragPos - target.pageY <= -25 && task.pomodoros > 1) {
			dispatch({type: ACTION_TYPES.UPDATE_POMODORO, payload: {id: task.id, amount: -1}});
			setDragPos(target.pageY);
		}
	}
	function dragEndHandler(e){
		if (!e.touches) {
			dispatch({type: ACTION_TYPES.UPDATE_POMODORO, payload: {id: task.id, amount: -1}});
		}
		setDragPos(0);
	}
	
	return (
		<div
			className={`TodoList__item${task.completed ? " TodoList__item--completed" : state.activeTask?.id === task.id ? " TodoList__item--active" : ""}`}
			onClick={itemClickHandler}
		>
			<button
				className={`TodoList__rounds${task.completed ? " TodoList__rounds--completed" : ""}`}
				onMouseUp={mouseUpHandler}
				onKeyDown={keyDownHandler}
				onDragStart={dragStartHandler}
				onDrag={dragHandler}
				onDragEnd={dragEndHandler}
				onTouchStart={dragStartHandler}
				onTouchMove={dragHandler}
				onTouchEnd={dragEndHandler}
				draggable={!state.started}
				disabled={state.started}
			>
				<span className={`TodoList__roundsIcon${task.completed ? " TodoList__roundsIcon--completed" : ""}`}>
					{task.completed
						? <svg viewBox="0 0 24 24"><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"></path></svg>
						: task.pomodoros
					}
				</span>
			</button>
			<span className="TodoList__description">{task.description}</span>
		</div>
	);
}

export default Todo;