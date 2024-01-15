import React from "react";
import styles from './index.module.scss'
import {useToDoStore} from "../../data/stores/useToDoStore";
import InputPlus from '../components/InputPlus';
import InputTask from '../components/inputTask';



export const App: React.FC = () => {

    const tasks = useToDoStore((state) => state.tasks)
    const createTask = useToDoStore((state) => state.createTask)
    const updateTask = useToDoStore((state) => state.updateTask)
    const removeTask = useToDoStore((state) => state.removeTask)
    const changeStatus = useToDoStore((state) => state.changeStatus)

    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>Чек-лист</h1>
            <section className={styles.articleSection}>
                <InputPlus 
                    onAdd={(title: string) => {
                        if (title){
                            createTask(title)
                        }
                    }}
                />
            </section>
            <section className={styles.articleSection}>
                {
                    !tasks.length && (
                        <p className={styles.articleText}>Чек-лист пуст</p>
                    )
                }
                {
                    tasks.map((task) => {
                        return (
                        <InputTask 
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            status={task.status}
                            onEdited={updateTask}
                            onRemoved={removeTask}
                            changeStatus={changeStatus}
                        />)
                    })
                }
            </section>
        </article>
    )
}