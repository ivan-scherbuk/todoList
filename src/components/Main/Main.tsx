import React, { useState } from 'react';
import styles from './Main.module.scss';
import { Button } from '@mui/material';
import Todos from '../Todos/Todos';
import AddEditModal from '../AddEditModal/AddEditModal';

const Main = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [idToEdit, setIdToEdit] = useState('');

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Todo List</h1>
            <Button
                sx={{
                    width: '200px',
                    fontWeight: '700',
                    margin: '0 auto',
                    borderRadius: '100px',
                    height: '40px',
                }}
                variant="contained"
                onClick={() => setIsShowModal(true)}
            >
                Add Task
            </Button>
            <Todos
                handleEdit={(id: string) => {
                    setIdToEdit(id);
                    setIsShowModal(true);
                }}
            />
            <AddEditModal
                open={isShowModal}
                handleClose={() => {
                    setIdToEdit('');
                    setIsShowModal(false);
                }}
                idToEdit={idToEdit}
            />
        </div>
    );
};

export default Main;
