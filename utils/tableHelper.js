/*  
THIS FILE: Contains the code to edit the
attendance dropdown in batches.
*/
import styles from '../styles/Table.module.css';
const dateFields = ['registration_date', 'age', 'joindate'];
const booleanValues = ["N", "Y"];
const booleanStyles = ["red", "green"];
const attendanceValues = ["A", "P", "X"];
const attendanceStyle = ["red", "green", "black"];
/** TODO: Need to write a better dateConverter */
function dateConverter(input){
	if (input === null) {
		return null;
	}
	var a = new Date(Date.parse(input)+28800000); /* Adding 28800000 to handle the GMT and EST conversion issues */
	return a.toLocaleDateString("en-US");
}

export function generateTableRow(columns, rowData, editId, changeHandler, inputClassName) {
	const cell = [];
	var leftWidthSticky = 0;
	var rowIdx;
	for (const column of columns) {
		let cellContent = null;
		if (rowData.id === editId && column.accessor !== 'id') {
			if (column.type === 'enum') {
				if (column.isAttendance) {
					cellContent = (
						// <select className={inputClassName} name={column.accessor} value={rowData[column.accessor] || '0'}  onChange={(e) => changeHandler(e, column.accessor)}>
						<select className={inputClassName} name={column.accessor} defaultValue={rowData[column.accessor]}  onChange={(e) => changeHandler(e, column.accessor)}>
							{column.availableValues.map((value) => {
								return <option key={value} value={Number(value)}>{ attendanceValues[Number(value)] }</option>;
						})}
						</select>
					);
				} else if (column.isBoolean) {
					cellContent = (
						<select className={inputClassName} name={column.accessor} defaultValue={rowData[column.accessor]}  onChange={(e) => changeHandler(e, column.accessor)}>
							{column.availableValues.map((value) => {
								return <option key={value} value={Number(value)}>{ booleanValues[Number(value)] }</option>;
						})}
						</select>
					);
				} else {
					cellContent = (
						<select className={inputClassName} name={column.accessor} onChange={(e) => changeHandler(e, column.accessor)}>
							<option></option>
							{column.availableValues.map((value) => <option key={value} value={value} selected={rowData[column.accessor] === value}>{value}</option>)}
						</select>
					);
				}
			} else {
				cellContent = <input className={inputClassName} name={column.accessor} value={rowData[column.accessor]} onInput={(e) => changeHandler(e, column.accessor)}/>;
			}
		} else {
			if (column.isAttendance) {
				cellContent = <p>{attendanceValues[Number(rowData[column.accessor])]}</p>;
			} else if (column.isBoolean) {
				rowIdx = Number(rowData[column.accessor]);
				cellContent = <p style={{color:booleanStyles[rowIdx]}}>{booleanValues[rowIdx]}</p>;
			} else {
				if (dateFields.includes(column.accessor)) {
					cellContent = <p>{dateConverter(rowData[column.accessor])}</p>;
				} else {
					cellContent = <p>{rowData[column.accessor]}</p>;
				}
			}
		}
		var stickyClass = null;
		var stickyLeftOverride = null;
		if (column.isSticky) {
			leftWidthSticky += column.stickyWidth;
			stickyLeftOverride = { '--left-override-th': (leftWidthSticky)+'px' };
			stickyClass = styles.stickyColTd;
		}
		cell.push(<td className={stickyClass} key={column.accessor} style={stickyLeftOverride}>{cellContent}</td>);
	}
	return cell;
}

const minAttendance = 50.0;
export function generateTableCol(columns, rowData, editId, changeHandler, inputClassName, isAccessible) {
	const cell = [];
	var daysPresent = 0;
	var totalSize = 0; //columns.length - 2;
	var isAttendance, rowIdx;
	var leftWidthSticky = 0;
	var percentClass, percentOverride = null;
	for (const column of columns) {
		let cellContent = null;
		if (column === editId && column.accessor !== 'id') {
			if (column.type === 'enum') {
				if (column.isAttendance) {
					cellContent = (
						<select className={inputClassName} name={column.accessor} defaultValue={rowData[column.accessor]}  onChange={(e) => changeHandler(e, rowData.id)}>
							{column.availableValues.map((value) => {
								return <option key={value} value={Number(value)}>{ attendanceValues[Number(value)] }</option>;
							})}
						</select>
					);
				} else {
					cellContent = (
						<select className={inputClassName} name={column.accessor} onChange={(e) => changeHandler(e, rowData.id)}>
							{column.availableValues.map((value) => <option key={value} value={value} selected={rowData[column.accessor] === value}>{value}</option>)}
						</select>
					);
				}
			} else {
				cellContent = <input className={inputClassName} name={column.accessor} defaultValue={rowData[column.accessor]} onInput={(e) => changeHandler(e, rowData.id)}/>;
			}
		} else {
			if (column.isAttendance) {
				isAttendance = true;
				rowIdx = Number(rowData[column.accessor]);
				cellContent = <p style={{color:attendanceStyle[rowIdx]}}>{attendanceValues[rowIdx]}</p>;
			} else {
				cellContent = <p>{rowData[column.accessor]}</p>;
			}
		}
		var stickyClass = null;
		var stickyLeftOverride = null;
		if (column.isSticky) {
			stickyLeftOverride = { '--left-override-th': (leftWidthSticky)+'px' };
			stickyClass = styles.stickyColTd;
			if (column.accessor == 'percent') {
				percentClass = stickyClass;
				percentOverride = stickyLeftOverride;
			}
			leftWidthSticky += column.stickyWidth;
		}
		cell.push(<td className={stickyClass} key={column.accessor} style={stickyLeftOverride}>{cellContent}</td>);
	}
	if (isAttendance && !isAccessible) {
		for (const column of columns) {
			if(column.isAttendance && Number(rowData[column.accessor]) != 2) {
				daysPresent += Number(rowData[column.accessor]);
				totalSize += 1;
			}
		}
		const attendance = (daysPresent/totalSize * 100).toFixed(1);
		const mark = (attendance < minAttendance) ? "red" : "";
		cell.splice(1, 1, <td className={percentClass} key={"percent"} style={percentOverride}><p style={{color:mark}}>{attendance}%</p></td>);
	}
	return cell;
}

export function generateTableColStaff(columns, rowData, editId, changeHandler, inputClassName) {
	const cell = [];
	var rowIdx, rowName;
	var isPresent = Number(rowData[columns[1].name]) == 1;
	var isFrozen = editId == null;
	let cellContent = null;

	// Name
	rowName = rowData["name"].replace(/\s+/g, '');
	cellContent = <p>{rowData["name"]}</p>;
	cell.push(<td key={"name"}>{cellContent}</td>);

	// Present
	cellContent = <input type="radio" name={rowName} id={rowName+"_P"} defaultChecked={isPresent} disabled={isFrozen} value="P" onChange={(e) => changeHandler(e, rowData.id, editId)} />;
	cell.push(<td key={"P"}>{cellContent}</td>);

	// Absent
	cellContent = <input type="radio" name={rowName} id={rowName+"_A"} defaultChecked={!isPresent} disabled={isFrozen} value="A" onChange={(e) => changeHandler(e, rowData.id, editId)} />;
	cell.push(<td key={"A"}>{cellContent}</td>);

	// TESTING: Adds a column of attendance (A/P) values for reference
	// rowIdx = Number(rowData[columns[1].name]);
	// cellContent = <p style={{color:attendanceStyle[rowIdx]}}>{attendanceValues[rowIdx]}</p>;
	// cell.push(<td key={"date"}>{cellContent}</td>);

	return cell;
}

export function sortTable(columnName, data, sortAsc) {
	if (!columnName) {
		return data;
	}
	const sortedData = data.sort((row1, row2) => {
		return row1[columnName] > row2[columnName] ? 1: -1;
	});
	if (sortAsc === false) {
		return sortedData.reverse();
	}
	return sortedData;
}

export function searchTableData(setData, filterValue, originalData) {
	if (!filterValue) {
		setData(() => JSON.parse(JSON.stringify(originalData)));
		return;
	}
	const lowerCaseFilterValue = filterValue.toLowerCase();
	const filteredData = originalData.filter((rowData) => {
		const rowDataValues = Object.values(rowData);
		for (const val of rowDataValues) {
			if (typeof(val) === 'number') {
				const stringVal = val.toString().toLowerCase();
				if (stringVal.includes(lowerCaseFilterValue)) {
					return true;
				}
			} else if (typeof(val) === 'string') {
				if (val.toLowerCase().includes(lowerCaseFilterValue)) {
					return true;
				}
			}
		}
		return false;
	});
	setData(() => filteredData);
}

export function filterCompletedBatches(setData, originalData, showOriginal) {
	if (showOriginal) {
		setData(() => JSON.parse(JSON.stringify(originalData)));
		return;
	}
	const completedBatches = originalData.filter((rowData) => rowData.status === 'COMPLETE');
	setData(() => completedBatches);
}
