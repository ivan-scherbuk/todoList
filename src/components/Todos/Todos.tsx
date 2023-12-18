import React from 'react';
import styles from './Todos.module.scss';
import {
    Button,
    MenuItem,
    Select,
} from '@mui/material';
import { iTodo } from '../../types';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeTodoStatus, deleteTodo } from '../../features/todo/todoSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type TodosProps = {
    handleEdit: (id: string) => void;
};

const sortOrder = ['in_progress', 'not_started', 'done'];

const colors: Record<string, string> = {
    in_progress: 'orange',
    not_started: 'red',
    done: 'green',
};

const MOBILE_WIDTH = 720;

const Todos = ({ handleEdit }: TodosProps) => {
    const todos = useAppSelector((state: RootState) => state.todos);
    const dispatch = useAppDispatch();

    const handleDelete = (id: string) => {
        dispatch(deleteTodo({ id }));
    };

    const editStatus = (id: string, status: string) => {
        dispatch(changeTodoStatus({ id, status }));
    };

    return (
        <div className={styles.container}>
            {[...todos]
                .sort(
                    (a, b) =>
                        sortOrder.indexOf(a.status) -
                        sortOrder.indexOf(b.status)
                )
                .map((todo: iTodo) => (
                    <div className={styles.todo} key={todo.id}>
                        <Select
                            sx={{
                                padding: '0',
                                paddingLeft: '10px',
                                minWidth:
                                    window.innerWidth < MOBILE_WIDTH
                                        ? '125px'
                                        : '150px',
                                height: '50px',
                                '& .MuiSelect-select': {
                                    padding: '0',
                                    color: colors[todo.status],
                                    fontWeight: '600',
                                    fontSize:
                                        window.innerWidth < MOBILE_WIDTH
                                            ? '14px'
                                            : '16px',
                                },
                            }}
                            value={todo.status}
                            onChange={(e) =>
                                editStatus(todo.id, e.target.value)
                            }
                        >
                            <MenuItem
                                sx={{
                                    color: colors['not_started'],
                                    fontWeight: '600',
                                }}
                                value={'not_started'}
                            >
                                Not Started
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    color: colors['in_progress'],
                                    fontWeight: '600',
                                }}
                                value={'in_progress'}
                            >
                                In Progress
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    color: colors['done'],
                                    fontWeight: '600',
                                }}
                                value={'done'}
                            >
                                Done
                            </MenuItem>
                        </Select>
                        <div className={styles.text}>
                            <span className={styles.title}>{todo.title}</span>
                            <span>{todo.description}</span>
                        </div>
                        <Button
                            sx={
                                window.innerWidth < MOBILE_WIDTH
                                    ? {
                                          minWidth: '0px',
                                      }
                                    : {}
                            }
                            onClick={() => handleEdit(todo.id)}
                        >
                            <EditIcon />
                        </Button>
                        <Button
                            sx={
                                window.innerWidth < MOBILE_WIDTH
                                    ? {
                                          minWidth: '0px',
                                      }
                                    : {}
                            }
                            onClick={() => handleDelete(todo.id)}
                        >
                            <DeleteIcon />
                        </Button>
                    </div>
                ))}
        </div>
    );
};

export default Todos;
