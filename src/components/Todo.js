import { useEffect, useState } from "react";
import useGlobalContext from "../contexts/GlobalContext";
import "./Todo.scss";

function Todo(){
	var {state, dispatch, ACTION_TYPES, moveCompleted} = useGlobalContext();
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
			var activeTaskIndex = taskList.findIndex(task => task.id === state.activeTask?.id);
			dispatch({type: ACTION_TYPES.ACTIVE_TASK, payload: taskList[activeTaskIndex === -1 ? 0 : activeTaskIndex]});
		} else {
			dispatch({type: ACTION_TYPES.ACTIVE_TASK, payload: null});
		}
		// eslint-disable-next-line
	}, [state.tasks, dispatch, ACTION_TYPES]);

	return (
		<div className="Todo">
			{state.showForm
				? (
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
					)
				: null
			}
			{(() => {
				var tasks = state.tasks;
				if (moveCompleted) {
					tasks = state.tasks.filter(task => !task.completed);
				}
				return (
					<div className="TodoList">
						{(state.tasks.length === 0 && tasks.length === 0) ? null : <p className="TodoList__title">Task list</p>}
						{tasks.length === 0 ? <p style={{textAlign: "center"}}>No tasks added</p> : null}
						{tasks.map(task => <TodoItem key={task.id} task={task} />)}
					</div>
				);
			})()}
			{(() => {
				if (!moveCompleted) return null;
				var tasks = state.tasks.filter(task => task.completed);
				return (
					<div className="TodoList">
						{tasks.length === 0 ? null : <p className="TodoList__title">Completed tasks</p>}
						{(!state.tasks.length === 0 && tasks.length === 0) ? <p style={{textAlign: "center"}}>None completed</p> : null}
						{tasks.map(task => <TodoItem key={task.id} task={task} />)}
					</div>
				);
			})()}
		</div>
	);
}

function TodoItem({task}){
	var {state, dispatch, ACTION_TYPES} = useGlobalContext();
	var [dragPos, setDragPos] = useState(0);
	var [confirm, setConfirm] = useState(false);
	
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
			e.preventDefault();
			dispatch({type: ACTION_TYPES.UPDATE_POMODORO, payload: {id: task.id, amount: 1}});
		}
		if (e.key === "ArrowDown" && task.pomodoros > 1) {
			e.preventDefault();
			dispatch({type: ACTION_TYPES.UPDATE_POMODORO, payload: {id: task.id, amount: -1}});
		}
	}
	function dragStartHandler(e){
		var target = e;
		e.stopPropagation();
		if (e.touches) {
			target = e.touches[0];
		} else {
			var img = new Image();
			img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
			e.dataTransfer.setDragImage(img, 0, 0);
		}
		setDragPos(target.pageY);
		document.body.classList.add("no-scroll");
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
		document.body.classList.remove("no-scroll");
	}
	function deleteTodo(e){
		if (confirm) {
			dispatch({type: ACTION_TYPES.DELETE_TASK, payload: {id: task.id}});
			setConfirm(false);
			return;
		}
		setConfirm(true);
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
			<button
				className={`TodoList__delete${confirm ? " TodoList__delete--confirm" : ""}`}
				onClick={deleteTodo}
				onBlur={() => setConfirm(false)}
			>
				<svg viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
			</button>
		</div>
	);
}

export default Todo;