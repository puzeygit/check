import React, { useCallback, useState } from 'react';
import styles from './index.module.scss';

interface IInputPlus {
  onAdd: (title: string) => void
}
 
const InputPlus: React.FC<IInputPlus> = ({onAdd}) => {

  const [value, setValue] = useState('');
  const addTask = useCallback(() => {
    onAdd(value);
    setValue('')
  }, [value])
  
  return (
    <div className={styles.inputPlus}>
      <input
        type='text'
        className={styles.inputPlusValue}
        value={value}
        placeholder='Введите текст...'
        onChange={(e)=> setValue(e.target.value)}
        onKeyDown={(e)=>{
          if (e.key === 'Enter'){
            addTask();
          }
        }} 
      />
      <button onClick={addTask}
      aria-label='Add'
      className={styles.inputPlusButton}
      />
    </div>
  )
}

export default InputPlus;