import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss';
import { TaskStatus } from '../../../data/stores/useToDoStore';


interface IInputTask {
  id: string;
  title: string;
  status: TaskStatus;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
  changeStatus: (id: string) => void;
}

const InputTask: React.FC<IInputTask> = ({
  id, 
  title,
  onEdited,
  onRemoved,
  status,
  changeStatus
}) => {

  const [checked, setChecked] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    if(isEditMode){
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode])

  return (
    <div className={styles.inputTask} style={{backgroundColor: `${status === TaskStatus.inProgress ? '#8ed7c0' : '#ff9393'}`}}>
      <label className={styles.inputTaskLabel}>
        <input 
          type='checkbox' 
          checked={checked}
          disabled={isEditMode}
          className={styles.inputTaskCheckbox}
          onChange={(e) => {
            setChecked(e.target.checked)
            setTimeout(()=>{
                  changeStatus(id)   
                }, 200)
            }}
        />
        { isEditMode ?
        <input
          value={value}
          ref={editTitleInputRef}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          onKeyDown={(e)=>{
            if(e.key === 'Enter'){
              onEdited(id, value)
              setIsEditMode(false)
            }
          }}
          className={styles.inputTaskEditTitle}
        />
        : (<h3 className={styles.inputTaskTitle}>{title}</h3>)
        }
      </label>
      {
        isEditMode ? 
              <button  
        className={styles.inputTaskSave}
        aria-label='Save'
        onClick={() => {
          onEdited(id, value)
          setIsEditMode(false)
        }}
      />
      :

      <button 
        className={styles.inputTaskEdit}
        aria-label='Edit'
        onClick={() => {
          setIsEditMode(true)
        }}
      />
      }
      <button 
      aria-label='Remove'
      className={styles.inputTaskRemove}
      onClick={() => onRemoved(id)}
      />
    </div>
  )
}
export default InputTask;
