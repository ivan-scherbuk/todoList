import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { iTodo } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export interface TodoState {
    id: string;
    title: string;
    description: string;
    status: string;
}

const todoFromStorage = localStorage.getItem('TODO_LIST_TEST');

const initialState: TodoState[] = todoFromStorage
    ? JSON.parse(todoFromStorage)
    : [];

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (
            state,
            action: PayloadAction<{ title: string; description: string }>
        ) => {
            state.push({
                id: uuidv4(),
                title: action.payload.title,
                description: action.payload.description,
                status: 'not_started',
            });
            localStorage.setItem('TODO_LIST_TEST', JSON.stringify(state));
        },
        editTodo: (state, action: PayloadAction<Omit<iTodo, 'status'>>) => {
            const index = state.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index !== -1) {
                state[index] = {
                    ...state[index],
                    title: action.payload.title,
                    description: action.payload.description,
                };
                localStorage.setItem('TODO_LIST_TEST', JSON.stringify(state));
            }
        },
        changeTodoStatus: (
            state,
            action: PayloadAction<{ id: string; status: string }>
        ) => {
            const index = state.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index !== -1) {
                state[index] = {
                    ...state[index],
                    status: action.payload.status,
                };
                localStorage.setItem('TODO_LIST_TEST', JSON.stringify(state));
            }
        },
        deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index !== -1) {
                state.splice(index, 1);
                localStorage.setItem('TODO_LIST_TEST', JSON.stringify(state));
            }
        },
    },
});

export const { addTodo, editTodo, changeTodoStatus, deleteTodo } =
    todoSlice.actions;

export default todoSlice.reducer;
