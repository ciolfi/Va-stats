/*  
THIS FILE: Contains the code to edit the
attendance dropdown in batches.
*/
const dateFields = ['registration_date', 'age', 'joindate'];
function dateConverter(input){
	if (input === null) {
		return null;
	}
	var a = new Date(Date.parse(input));
	return a.toLocaleDateString("en-US");
}

export function generateTableRow(columns, rowData, editId, changeHandler, inputClassName) {
	const cell = [];
	for (const column of columns) {
		let cellContent = null;
		if (rowData.id === editId && column.accessor !== 'id') {
			if (column.type === 'enum') {
				if (column.isAttendance) {
					cellContent = (
						// <select className={inputClassName} name={column.accessor} value={rowData[column.accessor] || '0'}  onChange={(e) => changeHandler(e, column.accessor)}>
						<select className={inputClassName} name={column.accessor} defaultValue={rowData[column.accessor]}  onChange={(e) => changeHandler(e, column.accessor)}>
							{column.availableValues.map((value) => {
								if (Number(value) == 1) {
									// return <option key={value} value={value} selected={rowData[column.accessor] === value}>{ "Present" }</option>;
									return <option key={value} value={Number(value)}>{ "P" }</option>;
								} else if (Number(value) == 0) {
									// return <option key={value} value={value} selected={rowData[column.accessor] === value}>{ "Absent" }</option>;
									return <option key={value} value={Number(value)}>{ "A" }</option>;
								} else if (!value) {
									// return <option key={"0"} value={"0"} selected={true}>{ "Absent" }</option>;
									return <option key={"1"} value={1}>{ "P" }</option>;
								}
						})}
						</select>
					);
				} else {
					cellContent = (
						<select className={inputClassName} name={column.accessor} onChange={(e) => changeHandler(e, column.accessor)}>
							{column.availableValues.map((value) => <option key={value} value={value} selected={rowData[column.accessor] === value}>{value}</option>)}
						</select>
					);
				}
			} else {
				cellContent = <input className={inputClassName} name={column.accessor} value={rowData[column.accessor]} onInput={(e) => changeHandler(e, column.accessor)}/>;
			}
		} else {
			if (column.isAttendance) {
				// if (Number(rowData[column.accessor]) == 1) {
				// 	cellContent = <p>{"Present"}</p>;
				if (Number(rowData[column.accessor]) == 1) {
					cellContent = <p>{"P"}</p>;
				// } else if (Number(rowData[column.accessor]) == 0 || !rowData[column.accessor]) {
				// 	cellContent = <p>{"Absent"}</p>;
			} else if (Number(rowData[column.accessor]) == 0 || !rowData[column.accessor]) {
				cellContent = <p>{"A"}</p>;
				}
			} else {
				if (dateFields.includes(column.accessor)) {
					cellContent = <p>{dateConverter(rowData[column.accessor])}</p>;
				} else {
					cellContent = <p>{rowData[column.accessor]}</p>;
				}
			}
		}
		cell.push(<td key={column.accessor}>{cellContent}</td>);
	}
	return cell;
}

const minAttendance = 50.0;
export function generateTableCol(columns, rowData, editId, changeHandler, inputClassName) {
	const cell = [];
	var daysPresent = 0;
	const totalSize = columns.length - 2;
	var isAttendance;
	for (const column of columns) {
		let cellContent = null;
		if (column === editId && column.accessor !== 'id') {
			if (column.type === 'enum') {
				if (column.isAttendance) {
					cellContent = (
						<select className={inputClassName} name={column.accessor} defaultValue={rowData[column.accessor]}  onChange={(e) => changeHandler(e, rowData.id)}>
							{column.availableValues.map((value) => {
								if (Number(value) == 1) {
									return <option key={value} value={Number(value)}>{ "P" }</option>;
								} else if (Number(value) == 0) {
									return <option key={value} value={Number(value)}>{ "A" }</option>;
								} else if (!value) {
									return <option key={"1"} value={1}>{ "P" }</option>;
								}
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
				if (Number(rowData[column.accessor]) == 1) {
					cellContent = <p  style={{color:"green"}}>{"P"}</p>;
					daysPresent += 1;
				} else if (Number(rowData[column.accessor]) == 0 || !rowData[column.accessor]) {
					cellContent = <p style={{color:"red"}}>{"A"}</p>;
				}
			} else {
				cellContent = <p>{rowData[column.accessor]}</p>;
			}
		}
		cell.push(<td key={column.accessor}>{cellContent}</td>);
	}
	if (isAttendance) {
		const attendance = (daysPresent/totalSize * 100).toFixed(1);
		const mark = (attendance < minAttendance) ? "red" : "";
		cell.splice(1, 1, <td key={"percent"}><p style={{color:mark}}>{attendance}%</p></td>);
	}
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
