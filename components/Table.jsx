/* THIS PAGE: Handles the code for all tables in the app. */
'use client';
import styles from '../styles/Table.module.css';
import { searchTableData, generateTableRow, sortTable, filterCompletedBatches } from '@/utils/tableHelper';
import { useCallback, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Button from './Button';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

export default function Table({ columns, tableData, isDelete, onDeleteClick, isEditable, onEditSave, Title, FilterButton, isBatch, isStudent }) {
	const [sortColumn, setSortColumn] = useState(columns[0].accessor);
	const [sortAsc, setSortAsc] = useState(true);
	const [editId, setEditId] = useState(null);
	const [editedBatch, setEditedBatch] = useState(null);
	const [data, setData] = useState(JSON.parse(JSON.stringify(tableData)));
	const orig = useRef(JSON.parse(JSON.stringify(tableData)));
	const inputClassName = styles.editableInput;
	const [showOriginal, setShowOriginal] = useState(false);
	const router = useRouter();
	const tableHeaderClassName = sortAsc ? styles.genericTableColumnHeaderAsc : styles.genericTableColumnHeaderDesc;
	const sortedData = useCallback(() => sortTable(sortColumn, data, sortAsc), [sortColumn, data, sortAsc]);
	var leftWidthSticky = 0;
	var actionClass = styles.stickyColTh;
	var actionLeftOverride = { '--left-override-th': (0)+'px'};

	/* STYLE THE COLUMN HEADER TEXT, E.G., -70 DEG, FOR:
	students, batches, specific batch */
	const pathname = usePathname().toString();
	const studentspgurl = "/students";
  // const studentspgurl = "../pages/students";
	const batchespgurl = "/batches";
  	const { id } = router.query;
	const batchespgurldyn = "/batch/"+id;
	const isMatch = ((pathname == studentspgurl)||(pathname == batchespgurl)||(pathname == batchespgurldyn));

	const showCompletedBatchesText = showOriginal? 'Show all batches' : 'Show completed batches';

	async function saveHandler() {
		await onEditSave(editedBatch);
		setEditId(null);
		setEditedBatch(null);
		orig.current = JSON.parse(JSON.stringify(data));
	}

	function onEditClick(rowData) {
		setEditId(rowData.id);
		setEditedBatch(rowData);
	}

	function onCancelClick() {
		setEditId(null);
		setEditedBatch(null);
		setData(() => JSON.parse(JSON.stringify(orig.current)));
	}

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setEditedBatch((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
		setData((prev) => {
			const found = prev.find((rowData) => rowData.id === editedBatch.id);
			found[name] = value;
			return prev;
		});
	};

	function deleteHandler(id) {
		const confirmDelete = confirm(`Are you sure you want to delete row with id ${id}`);
		if (!confirmDelete) {
			return;
		}
		onDeleteClick(id);
		setEditId(null);
		setEditedBatch(null);
	}

	function onShowCompletedBatchesClick() {
		filterCompletedBatches(setData, orig.current, showOriginal);
		setShowOriginal((prev) => !prev);
	}

	useEffect(() => {
		setData(tableData);
		orig.current = JSON.parse(JSON.stringify(tableData));
	}, [tableData]);

	return (
		<div className={styles.tableWrapper}>
			<div className={styles.genericTableHeader}>
				<h2>{Title}</h2>
				{FilterButton ? <Button onClick={() => onShowCompletedBatchesClick()} text={showCompletedBatchesText} isLight={false}/> : <></>}
				<input
					id="table-search"
					className={styles.tableSearch}
					onInput={(e) => searchTableData(setData, e.target.value, orig.current)}
					onKeyUp={(e) => {
						if (e.key == 'Enter') {
							document.getElementById("table-search").value = '';
							document.getElementById("table-search").blur();
							window.focus();
						}
					}}
					placeholder={`Search in ${Title}`}
					autoFocus={true}
				></input>
			</div>			
			{Title === "Student Documents and Fees" ?
			<>
			<p className={styles.batchTextTotalStudents}>
				Total collected amount: {data["total_amount"]}&ensp;
				[Amount 1: {data["total_amount_1"]},&ensp;
				Amount 2: {data["total_amount_2"]},&ensp;
				Amount 3: {data["total_amount_3"]}]
			</p>
			<br/>
			</>
			:<></>}
			<table className={styles.genericTable} cellPadding="0" cellSpacing="0">
				<thead>
					<tr>
						{/* <th className={styles.actionscolheading} width={'8%'}>
							Students
						</th> */}
						{/* {isDelete || isEditable? <th width={'6%'}>Actions</th> : <></>} */}
						{true?
						<th className={`${styles.actionscolheading} ${actionClass}`} style={actionLeftOverride}>
							Actions
						</th> : <></>}
						{columns.map((column) => {
							var stickyClass = null;
							var stickyLeftOverride = null;
							if (column.isSticky) {
								stickyClass = styles.stickyColTh;
								leftWidthSticky += column.stickyWidth;
								stickyLeftOverride = { '--left-override-th': (leftWidthSticky)+'px'};
							}
							return (
								<th
									key={column.accessor}
									className={stickyClass}
									style={stickyLeftOverride}
									onClick={() => onClickHeader(sortColumn, setSortColumn, column.accessor, sortAsc, setSortAsc)}
								>
									{column.isRotatedTh && !column.isFirstColumn ?
										<div className={styles.rotatedth} style={{ '--table-height-th':column.height }}>
											<span className={styles.rotatedthlabel}>
												{column.name}
											</span>
											{displaySortIcon(sortColumn, column.accessor, sortAsc)}
										</div>
										:
										<div className={tableHeaderClassName}>
											{column.name}
											{displaySortIcon(sortColumn, column.accessor, sortAsc)}
										</div>
									}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{sortedData().map((rowData, index) => {
						return (
							<tr key={index}>
								{true ?
									<td className={styles.stickyColTd} key={rowData.accessor} style={actionLeftOverride}>
										{editId === rowData.id ? 
											<>
												<Image className={styles.actionItem} alt={'save edit'} src={'/icons/save-icon.svg'} height={20} width={20} onClick={() => saveHandler() } />
												<Image className={styles.actionItem} alt={'cancel edit'} src={'/icons/cancel-icon.svg'} height={20} width={20} onClick={() => onCancelClick()} />
											</>
										: <>
										{isDelete ? <Image className={styles.actionItem} alt={'delete row'} src={'/icons/delete-icon.svg'} height={20} width={20} onClick={() => deleteHandler(rowData.id)} /> : <></>}
										{isEditable ? <Image className={styles.actionItem} alt={'edit row'} src={'/icons/edit-icon.svg'} height={20} width={20} onClick={() => onEditClick(rowData)} />: <></>} </>}										
										{isBatch ? <Button text="Roster" onClick={() => {router.push("/batch/"+rowData.id);}} style={{'width': 'inherit'}}></Button>: <></>}
										{isStudent ? <Button text="Enrollment History" onClick={() => {router.push("/student/"+rowData.id);}}></Button>: <></>}
									</td>
								: <></>}
								{generateTableRow(columns, rowData, editId, changeHandler, inputClassName)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

function onClickHeader(sortColumn, setSortColumn, accessor, sortAsc, setSortAsc) {
	if (sortColumn === accessor) {
		setSortAsc(!sortAsc);
	} else {
		setSortColumn(accessor);
		setSortAsc(true);
	}
}

function displaySortIcon(sortColumn, accessor, sortAsc) {
	if (sortColumn !== accessor) {
		return <></>;
	}
	if (sortAsc) {
		return <Image alt={'sort-ascending'} src={'/icons/sort-up-icon.svg'} height={16} width={16} />;
	}
	return <Image alt={'sort-descending'} src={'/icons/sort-down-icon.svg'} height={16} width={16} />;
}
