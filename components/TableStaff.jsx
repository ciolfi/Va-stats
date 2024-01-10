/* THIS PAGE: Handles the code for all tables with column edit functionality in the app. */
'use client';
import styles from '../styles/Table.module.css';
import { searchTableData, generateTableColStaff, sortTable } from '@/utils/tableHelper';
import { useCallback, useState, useRef, useEffect } from 'react';
import Button from '@/components/Button';
import Link from "next/link";

export default function TableStaff({ columns, tableData, onEditSave, Title, batchId }) {
	const [sortColumn, setSortColumn] = useState(columns[0].accessor);
	const [todaysDate, setTodaysDate] = useState("");
	const [sortAsc, setSortAsc] = useState(true);
	const [editDate, setEditDate] = useState(null);
	const [editedBatch, setEditedBatch] = useState(null);
	const [data, setData] = useState(JSON.parse(JSON.stringify(tableData)));
	const orig = useRef(JSON.parse(JSON.stringify(tableData)));
	const inputClassName = styles.editableInput;
	const sortedData = useCallback(() => sortTable(sortColumn, data, sortAsc), [sortColumn, data, sortAsc]);

	function generateEditId(date) {
		let data = {};
		data.name = date;
		data.accessor = date;
		data.availableValues = [1, 0, 2];
		return data;
	}

	async function saveHandler() {
		const date = new Date(editDate);
		const formatDate = moment(date).utcOffset("+05:30").format('MMMM D, Y'); // IST Timezone used
		await onEditSave(editedBatch);
		setEditDate(null);
		setEditedBatch(null);
		orig.current = JSON.parse(JSON.stringify(data));
		confirm(formatDate + " Attendance was edited.");
	}

	function onEditClick(column, rowData) {
		setEditDate(column.name);
		setEditedBatch(rowData);
	}

	function onCancelClick() {
		setEditDate(null);
		setEditedBatch(null);
		setData(() => JSON.parse(JSON.stringify(orig.current)));
	}

	const changeHandler = (e, rowId, editId) => {
		const { name, value } = e.target;
		setEditedBatch((prev) => {
			const found = prev.find((rowData) => rowData["id"] === rowId);
			found[editId] = value == "P" ? 1 : 0;
			return prev;
		});
		setData((prev) => {
			const found = prev.find((rowData) => rowData["id"] === rowId);
			found[editId] = value == "P" ? 1 : 0;
			return prev;
		});
	};

	useEffect(() => {
		setData(tableData);
		{columns.forEach(col => {
			if(col.accessor != "name") setTodaysDate(col.name);
		})}
		orig.current = JSON.parse(JSON.stringify(tableData));
	}, [tableData]);

	return (
		<div className={styles.tableWrapper}>
			<div className={styles.genericTableHeader}>
				<h2>{Title + " (" + todaysDate + ")"}</h2>
				<input
					id="table-search"
					className={styles.tableSearch}
					onInput={(e) => searchTableData(setData, e.target.value, orig.current)}
					onKeyUp={(e) => {
						if (e.key == 'Enter') {
							document.getElementById("table-search").value = '';
							document.getElementById("table-search").blur();
						}
					}}
					placeholder={`Search in ${Title}`}
					autoFocus={true}
				></input>
				<Link legacyBehavior className={styles.csvbutton} href={"https://visionaid.dreamhosters.com/csv/"+Title.toLowerCase()+".php?ID="+batchId}>
					<a target="_blank" className={styles.csvbutton}><i className="fa fa-download"></i> View/Download {Title}</a>
				</Link>
			</div>

			<table tabIndex={0} title='Attendance' className={styles.genericTable} cellPadding="0" cellSpacing="0" height="350px">
				<thead>
					<tr>
						<th key="name" className={`${styles.stickyColTh} ${styles.studentNames}`}>Students</th>
						<th>P</th>
						<th>A</th>
					</tr>
				</thead>
				<tbody>
					{sortedData().map((rowData, index) => {
						return (
							<tr key={index}>
								{generateTableColStaff(columns, rowData, editDate, changeHandler, todaysDate)}
							</tr>
						);
					})}
				</tbody>
			</table>
			<br></br>
			{todaysDate != ''?
			<div>
				{editDate === todaysDate ?
				<Button text="Submit" onClick={() => saveHandler() } style={{'width': '100px'}}></Button>
				:
				<Button text="Edit" onClick={() => onEditClick(generateEditId(todaysDate), sortedData())} style={{'width': '100px'}}></Button>
				}
			</div>
			: <></>
			}
		</div>
	);
}
