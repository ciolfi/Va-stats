/* THIS PAGE: Handles the code for all tables with column edit functionality in the app. */
'use client';
import styles from '../styles/Table.module.css';
import { searchTableData, generateTableCol, sortTable, filterCompletedBatches } from '@/utils/tableHelper';
import { useCallback, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Button from './Button';
import Link from "next/link";

export default function TableCol({ columns, tableData, isDelete, onDeleteClick, isEditable, onEditSave, Title, FilterButton, isBatch, isStudent, batchId, isAccessible }) {
	const [sortColumn, setSortColumn] = useState(columns[0].accessor);
	const [sortAsc, setSortAsc] = useState(true);
	const [editId, setEditId] = useState(null);
	const [editedBatch, setEditedBatch] = useState(null);
	const [data, setData] = useState(JSON.parse(JSON.stringify(tableData)));
	const orig = useRef(JSON.parse(JSON.stringify(tableData)));
	const inputClassName = styles.editableInput;
	const [showOriginal, setShowOriginal] = useState(false);
	const tableHeaderClassName = sortAsc ? styles.genericTableColumnHeaderAsc : styles.genericTableColumnHeaderDesc;
	const sortedData = useCallback(() => sortTable(sortColumn, data, sortAsc), [sortColumn, data, sortAsc]);
	var leftWidthSticky = 0;

	const showCompletedBatchesText = showOriginal? 'Show all batches' : 'Show completed batches';

	async function saveHandler() {
		await onEditSave(editedBatch);
		setEditId(null);
		setEditedBatch(null);
		orig.current = JSON.parse(JSON.stringify(data));
	}

	function onEditClick(column, rowData) {
		setEditId(column);
		setEditedBatch(rowData);
	}

	function onCancelClick() {
		setEditId(null);
		setEditedBatch(null);
		setData(() => JSON.parse(JSON.stringify(orig.current)));
	}

	async function onFillX(column, rowData) {
		setEditId(column);
		rowData.map((row) => {
			row[column.accessor] = 2;
		});
		setEditedBatch(rowData);
	}

	const changeHandler = (e, rowId) => {
		const { name, value } = e.target;
		setEditedBatch((prev) => {
			const found = prev.find((rowData) => rowData["id"] === rowId);
			found[name] = Number(value);
			return prev;
		});
		setData((prev) => {
			const found = prev.find((rowData) => rowData["id"] === rowId);
			found[name] = Number(value);
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


	// If edit mode is flipped, save it in the local storage for implementing unsaved changes prompting
	useEffect(() => {
		if(editId) localStorage.setItem('editMode', 'true')
		else localStorage.setItem('editMode', 'false')
	},[editId])

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
						}
					}}
					placeholder={`Search in ${Title}`}
					autoFocus={true}
				></input>
				<Link legacyBehavior className={styles.csvbutton} href={"https://visionaid.dreamhosters.com/csv/"+Title.toLowerCase()+".php?ID="+batchId}>
					<a target="_blank" className={styles.csvbutton}><i className="fa fa-download"></i> View/Download {Title}</a>
				</Link>
			</div>
			<table tabIndex={0} title={Title} className={styles.genericTable} cellPadding="0" cellSpacing="0" height="350px">
				<thead>
					<tr>
					{columns.map((column) => {
						var stickyClass = null;
						var stickyLeftOverride = null;
						if (column.isSticky) {
							stickyClass = styles.stickyColTh;
							stickyLeftOverride = { '--left-override-th': (leftWidthSticky)+'px'};
							leftWidthSticky += column.stickyWidth;
						}
						return (
							<th
								key={column.accessor}
								className={`${stickyClass} ${(column.accessor == 'name') ? styles.studentNames : null}`}
								style={stickyLeftOverride}
								onClick={() => onClickHeader(sortColumn, setSortColumn, column.accessor, sortAsc, setSortAsc, column.isSortable)}
							>
							{!column.isFirstColumn ?
								<span>
								{column.isRotatedTh ?
									<div className={styles.rotatedthCol} style={{ '--table-height-th':column.height }}>
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
								<div>
									{editId === column ?
										<>
											<Image className={styles.actionItem} alt={'Save'} src={'/icons/save-icon.svg'} height={20} width={20} onClick={() => saveHandler() } />
											<Image className={styles.actionItem} alt={'Cancel'} src={'/icons/cancel-icon.svg'} height={20} width={20} onClick={() => onCancelClick()} />
										</>
									:
										<>
											{isEditable ? <Image className={styles.actionItem} alt={'Edit'} src={'/icons/edit-icon.svg'} height={20} width={20} onClick={() => onEditClick(column, sortedData())} />: <></>}
											{column.isAttendance ? <Image className={styles.actionItem} alt={'No Class'} src={'/icons/fillx-icon.svg'} height={15} width={15} onClick={() => onFillX(column, sortedData())} />: <></>}
										</>
									}
								</div>
								</span>
								:
								<div className={tableHeaderClassName}>
									{column.name}
									{column.isSortable ? displaySortIcon(sortColumn, column.accessor, sortAsc) : <></>}
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
							{generateTableCol(columns, rowData, editId, changeHandler, inputClassName, isAccessible)}
						</tr>
					);
				})}
				</tbody>
			</table>
		</div>
	);
}

function onClickHeader(sortColumn, setSortColumn, accessor, sortAsc, setSortAsc, isSortable) {
	if (!isSortable){
		return;
	}
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
		return <Image alt={'Sort Ascending'} src={'/icons/sort-up-icon.svg'} height={16} width={16} />;
	}
	return <Image alt={'Sort Descending'} src={'/icons/sort-down-icon.svg'} height={16} width={16} />;
}
