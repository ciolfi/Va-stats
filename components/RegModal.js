import React, { useState } from "react";
import { Button, Form, Container, Row } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
// import "../styles/RegModal.css";

function RegModal() {
	const [showM, set_Show_M] = useState(false);

	// MODAL SECTION - USESTATE FOR MAIN FORM AND MODAL
	const [name, set_Name_Val] = useState("");
	const [email, set_Email_Val] = useState("");
	const [phone, set_Phone_Val] = useState("");
	const [firstchoice, set_Firstchoice_Val] = useState("");
	const [secondchoice, set_Secondchoice_Val] = useState("");
	const [thirdchoice, set_Thirdchoice_Val] = useState("");

	const [modalName, set_Modal_Name] = useState("");
	const [modalEmail, set_Modal_Email] = useState("");
	const [modalPhone, set_Modal_Phone] = useState("");
	const [modalFirstchoice, set_Modal_Firstchoice] = useState("");
	const [modalSecondchoice, set_Modal_Secondchoice] = useState("");
	const [modalThirdchoice, set_Modal_Thirdchoice] = useState("");

	const modalShow = () => {
		set_Show_M(true);
	};
	const closeModal = () => {
		set_Show_M(false);
	};

	// MODAL SECTION - CLOSE MODAL; CLEAR INPUTS AFTER REG
	const regSuccess = () => {
		alert('Registration succeeded!');
		set_Show_M(false);

		set_Name_Val("");
		set_Email_Val("");
		set_Phone_Val("");
		set_Firstchoice_Val("");
		set_Secondchoice_Val("");
		set_Thirdchoice_Val("");
	};

	// MODAL SECTION - HANDLE INPUTS' ONCHANGE
	const nameChange = (e) => {
		set_Name_Val(e.target.value);
	};
	const emailChange = (e) => {
		set_Email_Val(e.target.value);
	};
	const phoneChange = (e) => {
		set_Phone_Val(e.target.value);
	};
	const firstchoiceChange = (e) => {
		set_Firstchoice_Val(e.target.value);
	};
	const secondchoiceChange = (e) => {
		set_Secondchoice_Val(e.target.value);
	};
	const thirdchoiceChange = (e) => {
		set_Thirdchoice_Val(e.target.value);
	};

	// MODAL SECTION - SET VARIABLES TO INPUT VALUES & SHOW MODAL
	const openModalHandle = () => {
		set_Modal_Name(name);
		set_Modal_Email(email);
		set_Modal_Phone(phone);
		set_Modal_Firstchoice(firstchoice);
		set_Modal_Secondchoice(secondchoice);
		set_Modal_Thirdchoice(thirdchoice);

		modalShow();
	};

	return (
		<div className="App text-center">
			<div className="simHeaderCont">
				<span>
					<img
						alt="Hand holding an eye"
						className="valogo"
						height="100"
						src="logo-mainsite.avif"
						width="150"
					/>
				</span>
				<span className="simHeaderText">
					<h1>
						Modal Simulation
					</h1>
				</span>
			</div>
			<br />
			<Container className="formCont">
				<Row className="justify-content-center">
					<Form
						name="studregform"
					>

						{/* MODAL INPUTS BEGIN */}
						<div className="div-form-cont">
							<div className="form-row">
								<span className="form-label-col">
									<label htmlFor="name">Name:</label>
								</span>
								<span className="form-input-col">
									<Form.Control
										autoComplete="off"
										className="textInput"
										id="name"
										onChange={nameChange}
										placeholder="First & last name"
										type="text"
										value={name}
									/>
								</span>
							</div>
							<div className="form-row">
								<span className="form-label-col">
									<label htmlFor="email">Email:</label>
								</span>
								<span className="form-input-col">
									<Form.Control
										autoComplete="off"
										className="textInput"
										id="email"
										onChange={emailChange}
										type="text"
										value={email}
									/>
								</span>
							</div>
							<div className="form-row">
								<span className="form-label-col">
									<label htmlFor="phone">Phone:</label>
								</span>
								<span className="form-input-col">
									<Form.Control
										autoComplete="off"
										className="textInput"
										id="phone"
										onChange={phoneChange}
										type="text"
										value={phone}
									/>
								</span>
							</div>
							<div className="form-row">
								<span className="form-label-col">
									<label htmlFor="firstchoice">FirstChoice:</label>
								</span>
								<span className="form-input-col">
									<Form.Control
										autoComplete="off"
										className="textInput"
										id="firstchoice"
										onChange={firstchoiceChange}
										type="text"
										value={firstchoice}
									/>
								</span>
							</div>
							<div className="form-row">
								<span className="form-label-col">
									<label htmlFor="secondchoice">SecondChoice:</label>
								</span>
								<span className="form-input-col">
									<Form.Control
										autoComplete="off"
										className="textInput"
										id="secondchoice"
										onChange={secondchoiceChange}
										type="text"
										value={secondchoice}
									/>
								</span>
							</div>
							<div className="form-row">
								<span className="form-label-col">
									<label htmlFor="thirdchoice">ThirdChoice:</label>
								</span>
								<span className="form-input-col">
									<Form.Control
										autoComplete="off"
										className="textInput"
										id="thirdchoice"
										onChange={thirdchoiceChange}
										type="text"
										value={thirdchoice}
									/>
								</span>
							</div>
						</div>
						{/* MODAL INPUTS END */}

						<Button
							className="simButton"
							onClick={openModalHandle}
							variant="success"
							width="1em"
						>
							Submit
						</Button>
					</Form>
				</Row>
			</Container>

			{/*---------- MODAL BEGINS ---------*/}
			<Modal
				centered
				className="theModal"
				overlay={"background: 'black'"}
				show={showM}
				onHide={closeModal}>
				<Modal.Header
					className="modalHeader"
				>
					<Modal.Title>
						Confirm Student Registration Data
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>

					{/* MODAL DATA PRESENTATION BEGINS */}
					<div className="modalContTable">
						<div className="form-row">
							<span className="modalLabelCont">
								Name:
							</span>
							<span className="modalDataCont">
								{modalName}
							</span>
						</div>
						<div className="form-row">
							<span className="modalLabelCont">
								Email:
							</span>
							<span className="modalDataCont">
								{modalEmail}
							</span>
						</div>
						<div className="form-row">
							<span className="modalLabelCont">
								Phone:
							</span>
							<span className="modalDataCont">
								{modalPhone}
							</span>
						</div>
						<div className="form-row">
							<span className="modalLabelCont">
								FirstChoice:
							</span>
							<span className="modalDataCont">
								{modalFirstchoice}
							</span>
						</div>
						<div className="form-row">
							<span className="modalLabelCont">
								SecondChoice:
							</span>
							<span className="modalDataCont">
								{modalSecondchoice}
							</span>
						</div>
						<div className="form-row">
							<span className="modalLabelCont">
								ThirdChoice:
							</span>
							<span className="modalDataCont">
								{modalThirdchoice}
							</span>
						</div>
					</div>
					{/* MODAL DATA PRESENTATION ENDS */}

				</Modal.Body>
				<Modal.Footer>
					<Button
						className="modalButton"
						onClick={regSuccess}
						type="submit"
						variant="secondary"
					>
						Register Student
					</Button>
					<Button
						className="modalButton"
						onClick={closeModal}
						variant="secondary"
					>
						Edit Information
					</Button>&nbsp;
				</Modal.Footer>
			</Modal>
		</div >
	);
}

export default RegModal;
