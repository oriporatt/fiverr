import { useState, useEffect,useRef } from 'react'

export function StatusModal({ dialogRef, initialStatus }) {

    const [buttonStatus, setButtonStatus] = useState(initialStatus);


    function changeStatus(newStatus) {
        setButtonStatus(newStatus);
    }
    
    function handleOutsideClick(event) {
        if (event.target === dialogRef.current) {
            dialogRef.current.close();
        }
    }

    return <section className="status-modal">
        <dialog ref={dialogRef} onClick={handleOutsideClick}>
            <div className="modal-content">
                <h2>Change Button Status</h2>
                <button onClick={() => changeStatus('Active')}>Set Active</button>
                <button onClick={() => changeStatus('Inactive')}>Set Inactive</button>
                <button onClick={() => dialogRef.current.close()}>Close</button>
            </div>
        </dialog>
    </section>
}