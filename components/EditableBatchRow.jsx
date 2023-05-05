import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

const EditableBatchRow = ({ batch, handleUpdateBatch, cancelEdit }) => {
  const [editedBatch, setEditedBatch] = useState(batch);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBatch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <tr className={styles.tablestudentsrow}>
      <td className={styles.tablestudentscell}>
        {batch.id}
      </td>
      <td className={styles.tablestudentscell}>
        <input
          type="text"
          name="coursename"
          value={editedBatch.coursename}
          onChange={handleChange}
        />
      </td>
      <td className={styles.tablestudentscell}>
        <input
          type="text"
          name="batch"
          value={editedBatch.batch}
          onChange={handleChange}
        />
      </td>
      <td className={styles.tablestudentscell}>
        <input
          type="text"
          name="coursestart"
          value={editedBatch.coursestart}
          onChange={handleChange}
        />
      </td>
      <td className={styles.tablestudentscell}>
        <input
          type="text"
          name="courseend"
          value={editedBatch.courseend}
          onChange={handleChange}
        />
      </td>
      <td className={styles.tablestudentscell}>
        <input
          type="text"
          name="coursedays"
          value={editedBatch.coursedays}
          onChange={handleChange}
        />
      </td>
      <td className={styles.tablestudentscell}>
        <input
          type="text"
          name="coursetimes"
          value={editedBatch.coursetimes}
          onChange={handleChange}
        />
      </td>
      <td className={styles.tablestudentscell}>
        <input
          type="text"
          name="instructor"
          value={editedBatch.instructor}
          onChange={handleChange}
        />
      </td>
      <td className={styles.tablestudentscell}>
        <select id="status" name="status" value={editedBatch.status} onChange={handleChange}>
					<option value="ONGOING">ONGOING</option>
					<option value="UNSTARTED">UNSTARTED</option>
					<option value="COMPLETE">COMPLETE</option>
				</select>
      </td>
      <td className={styles.tablestudentscell}>
        <input
          list='trainingmodes' 
          id='trainingmode' 
          name="trainingmode"
          value={editedBatch.trainingmode}
          onChange={handleChange}
        />
        <datalist id="trainingmodes">
					<option value="VIRTUAL"/>
					<option value="IN-PERSON"/>
					<option value="SELF-PACED"/>
				</datalist>
      </td>
      <td className={styles.tablestudentscell}>
        <input
          type="number"
          name="cost"
          value={editedBatch.cost}
          onChange={handleChange}
        />
      </td>
      <td className={styles.tablestudentscell}>
        <button onClick={() => handleUpdateBatch(editedBatch)}>
          Save
        </button>
        <button onClick={cancelEdit}>Cancel</button>
      </td>
    </tr>
  );
};

export default EditableBatchRow;
