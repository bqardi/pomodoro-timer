import { useReducer } from "react";

// Set the initial state here
const INITIAL_STATE = {
	tasks: [],
	activeTask: null,
	pomodoros: 1,
	type: "task",
	started: false,
	running: false,
	paused: false,
	showForm: true
};

// Define action types here (fake enums)
const ACTION_TYPES = {
	ACTIVE_TASK: "ACTIVE_TASK",
	ADD_TASK: "ADD_TASK",
	DELETE_TASK: "DELETE_TASK",
	INCREASE_POMODOROS: "INCREASE_POMODOROS",
	END_POMODOROS: "END_POMODOROS",
	UPDATE_POMODORO: "UPDATE_POMODORO",
	TYPE: "TYPE",
	TIMER: {
		START: "START",
		PAUSE: "PAUSE",
		RESUME: "RESUME",
		STOP: "STOP",
		RESET: "RESET",
		RUNNING: "RUNNING"
	},
	TOGGLE_FORM: "TOGGLE_FORM"
}

// Usage: dispatch({type: ACTION_TYPES.DELETE_TASK, payload: {id: the_id}});
function useGlobalReducer(){
	var [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case ACTION_TYPES.ACTIVE_TASK:
				return {...state, activeTask: action.payload};
			case ACTION_TYPES.ADD_TASK:
				return {...state, tasks: [...state.tasks, {id: "id-" + state.tasks.length, ...action.payload, completed: false}]};
			case ACTION_TYPES.DELETE_TASK:
				return {...state, tasks: state.tasks.filter(task => task.id !== action.payload.id)};
			case ACTION_TYPES.INCREASE_POMODOROS:
				return {...state, pomodoros: state.pomodoros + 1};
			case ACTION_TYPES.END_POMODOROS:
				let type = "task";
				let pomodoros = state.pomodoros;
				if (state.type === "task") {
					type = action.payload ? "longBreak" : "break";
				} else {
					pomodoros++
				}
				return {
					...state,
					pomodoros,
					type
				};
			case ACTION_TYPES.UPDATE_POMODORO:
				let arr = [...state.tasks];
				let index = state.tasks.findIndex(task => task.id === action.payload.id);
				let item = {
					...arr[index],
					pomodoros: arr[index].pomodoros + action.payload.amount
				}
				if (item.pomodoros === 0) {
					item.pomodoros = 1;
					item.completed = true;
				}
				arr[index] = item;
				return {...state, tasks: arr};
			case ACTION_TYPES.TYPE:
				return {...state, type: action.payload};
			case ACTION_TYPES.TIMER.START:
				return {...state, started: true, paused: false, running: true};
			case ACTION_TYPES.TIMER.PAUSE:
				return {...state, started: false, paused: true};
			case ACTION_TYPES.TIMER.RESUME:
				return {...state, started: true, paused: false};
			case ACTION_TYPES.TIMER.STOP:
				return {...state, started: false, paused: false, running: false};
			case ACTION_TYPES.TIMER.RUNNING:
				return {...state, running: action.payload};
			case ACTION_TYPES.TIMER.RESET:
				return INITIAL_STATE;
			case ACTION_TYPES.TOGGLE_FORM:
				return {...state, showForm: !state.showForm};
				
			default:
				throw new Error("Error in the reducer function! This shouldn't happen!");
		}
	}, INITIAL_STATE);

	return {state, dispatch, ACTION_TYPES};
}

export default useGlobalReducer;