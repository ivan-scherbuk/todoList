import React, { useEffect, useState } from 'react';
import styles from './AddEditModal.module.scss';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addTodo, editTodo } from '../../features/todo/todoSlice';
import { RootState } from '../../store';

type AddEditModalProps = {
    open: boolean;
    handleClose: () => void;
    idToEdit: string;
};

const AddEditModal = ({ open, handleClose, idToEdit }: AddEditModalProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useAppDispatch();
    const todos = useAppSelector((state: RootState) => state.todos);

    useEffect(() => {
        if (idToEdit) {
            const index = todos.findIndex((item) => item.id === idToEdit);
            setTitle(todos[index].title);
            setDescription(todos[index].description);
        }
    }, [idToEdit]);

    const handleSubmit = () => {
        idToEdit
            ? dispatch(
                  editTodo({
                      id: idToEdit,
                      title,
                      description,
                  })
              )
            : dispatch(
                  addTodo({
                      title,
                      description,
                  })
              );
        setTitle('');
        setDescription('');
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={styles.container}>
                <Typography variant="h6" component="h2">
                    {idToEdit ? 'Edit' : 'Add'} Task
                </Typography>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className={styles.form}
                >
                    <TextField
                        value={title}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setTitle(event.target.value);
                        }}
                        label="Title"
                        variant="standard"
                    />
                    <TextField
                        value={description}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setDescription(event.target.value);
                        }}
                        label="Description"
                        variant="standard"
                    />
                    <Button
                        sx={{
                            fontWeight: '700',
                        }}
                        variant="contained"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AddEditModal;
