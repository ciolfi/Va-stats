import Modal from "/components/ModalReg";
import { useState } from "react";


export default function Home() {
    var formcontent = ['test@email.com'];
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Open Modal</button>
            {showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <h1>Please confirm your submission:</h1>
                    Email: {formcontent}
                </Modal>
            }
        </div>
    );
}