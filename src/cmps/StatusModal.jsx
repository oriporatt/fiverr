import { useState, useEffect,useRef } from 'react'
import RadioOff from '../assets/svgs/radioOff.svg?react'
import RadioOn from '../assets/svgs/radioOn.svg?react'
import CloseModal2 from '../assets/svgs/closeModal2.svg?react'


export function StatusModal({ setActiveRow,initialStatus }) {
    const [statusState, setStatusState] = useState(initialStatus);

    function onToggleStatus(newStatus){
        
        setStatusState(newStatus)
    }

    return <section className="status-modal">
        <div className="modal-div">
            <p>Update Status</p>
            <div  onClick={()=>onToggleStatus('pending')}>
                {statusState==='pending'? <RadioOn/>:<RadioOff/>}
                <button className='pending'>Pending</button>
            </div>
            <div onClick={()=>onToggleStatus('approved')}>
                {statusState==='approved'? <RadioOn/>:<RadioOff/>}
                <button className='approved'>Approved</button>
            </div>
            <div onClick={()=>onToggleStatus('in-progress')}>
                {statusState==='in-progress'? <RadioOn/>:<RadioOff/>}
                <button className='in-progress'>In Progress</button>
            </div>
            <div onClick={()=>onToggleStatus('completed')}>
                {statusState==='completed'? <RadioOn/>:<RadioOff/>}
                <button className='completed'>Completed</button>
            </div>
            <div onClick={()=>onToggleStatus('rejected')}>
                {statusState==='rejected'? <RadioOn/>:<RadioOff/>}
                <button className='rejected'>Rejected</button>
            </div>

            <button className='menu-btn'>Apply</button>
            <button className='menu-btn' onClick={() => setActiveRow(null)} >Close</button>
            <div className='x-corner' onClick={() => setActiveRow(null)}>
                <CloseModal2 className='x-svg' />
            </div>

        </div>
    </section>
}