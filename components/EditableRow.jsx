import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

const EditableRow = ({ student, handleUpdateStudent, cancelEdit }) => {
  const [editedStudent, setEditedStudent] = useState(student);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <tr className={styles.tablestudentsrow}>
      <td className={styles.tablestudentscell}>
        {student.id}
      </td>
      <td className={styles.tablestudentscell}>
        <input
          type="email"
          name="email"
          value={editedStudent.email}
          onChange={handleChange}
        />
      </td>
      <td className={styles.tablestudentscell}>
        <input
          type="text"
          name="name"
          value={editedStudent.name}
          onChange={handleChange}
        />
      </td>
      <td className={styles.tablestudentscell}>
        <input
          type="text"
          name="phone_number"
          value={editedStudent.phone_number}
          onChange={handleChange}
        />
      </td>
      <td className={styles.tablestudentscell}>
        <input
          type="text"
          name="gender"
          value={editedStudent.gender}
          onChange={handleChange}
        />
      </td>
      <td className={styles.tablestudentscell}>
        <input
          type="number"
          name="age"
          value={editedStudent.age}
          onChange={handleChange}
        />
      </td>
      <td className={styles.tablestudentscell}>
        <input
          type="text"
          name="location"
          value={editedStudent.location}
          onChange={handleChange}
        />
      </td>
      <td className={styles.tablestudentscell}>
        <textarea
          name="objectives"
          value={editedStudent.objectives}
          onChange={handleChange}
          rows="2"
        />
      </td>
      <td className={styles.tablestudentscell}>
        <textarea
          name="vision_impairment"
          value={editedStudent.vision_impairment}
          onChange={handleChange}
          rows="2"
        />
      </td>
      <td className={styles.tablestudentscell}>
        <input
          type="text"
          name="usable_vision"
          value={editedStudent.usable_vision}
          onChange={handleChange}
        />
      </td>
      <td className={styles.tablestudentscell}>
        <button onClick={() => handleUpdateStudent(editedStudent)}>
          Save
        </button>
        <button onClick={cancelEdit}>Cancel</button>
      </td>
    </tr>
  );
};

export default EditableRow;
