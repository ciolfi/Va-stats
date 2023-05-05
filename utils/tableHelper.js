export function generateTableRow(columns, rowData, editId, changeHandler, inputClassName) {
	const cell = [];
	for (const column of columns) {
		let cellContent = null;
		if (rowData.id === editId && column.accessor !== 'id') {
			if (column.type === 'enum') {
				if (column.isAttendance) {
					cellContent = (
						<select className={inputClassName} name={column.accessor} value={rowData[column.accessor] || '0'}  onChange={(e) => changeHandler(e, column.accessor)}>
							{column.availableValues.map((value) => {
								if (Number(value) == 1) {
									return <option key={value} value={value} selected={rowData[column.accessor] === value}>{ "Present" }</option>;
								} else if (Number(value) == 0) {
									return <option key={value} value={value} selected={rowData[column.accessor] === value}>{ "Absent" }</option>;
								} else if (!value) {
									return <option key={"0"} value={"0"} selected={true}>{ "Absent" }</option>;
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
				if (Number(rowData[column.accessor]) == 1) {
					cellContent = <p>{"Present"}</p>;
				} else if (Number(rowData[column.accessor]) == 0 || !rowData[column.accessor]) {
					cellContent = <p>{"Absent"}</p>;
				}
			} else {
				cellContent = <p>{rowData[column.accessor]}</p>;
			}
		}
		cell.push(<td key={column.accessor}>{cellContent}</td>);
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
