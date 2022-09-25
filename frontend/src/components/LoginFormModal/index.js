import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);
    // console.log(showModal)
    return (
        <>
            <button
                className="nav-signup-button"
                onClick={() => setShowModal(true)}
            >
                Log In
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
