


import { useState, useEffect,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'

import BlackStar from '../assets/svgs/blackStar.svg?react'
import RatePremium from '../assets/svgs/ratePremium.svg?react'
import Location from '../assets/svgs/location.svg?react'
import Member from '../assets/svgs/member.svg?react'
import Fullname from '../assets/svgs/fullname.svg?react'
import ResponseTime from '../assets/svgs/responseTime.svg?react'
import ThreeDots from '../assets/svgs/threeDots.svg?react'

import { loadOrders } from '../store/actions/order.actions'
import { orderService } from '../services/order'
import { StatusModal } from '../cmps/StatusModal'
import { updateOrder } from '../store/actions/order.actions'

export function OrdersModal({onCloseMyOrders}) {
    const dispatch = useDispatch()
    const orders =useSelector(storeState => storeState.orderModule.orders)
    const users =useSelector(storeState => storeState.userModule.users)
    const user =useSelector(storeState => storeState.userModule.user)

    let myOrders;
    if (users && user && orders){
        myOrders = orders.filter(orderIdx=>orderIdx.clientId===user._id)
        myOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        myOrders=myOrders.map(thisOrder=>{
            return {
                ...thisOrder, 
                createdAtFormatted: formatTimestamp(thisOrder.createdAt),
                providerUrl: getUserImgUrl(thisOrder.providerId),
                deliveryDateFormatted: formatDeliveryDate(thisOrder.deliveryDate)
            }
        })
    }

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
    
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = date.toLocaleString('en-US', { month: 'long' }); 
        const year = date.getFullYear();
    
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }
    function formatDeliveryDate(isoDate) {
        const date = new Date(isoDate);
    
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
    
        return `${day}-${month}-${year}`;
    }
    function getUserImgUrl(userId){
        let url=''
        const thisUser=users.filter(thisUser=>thisUser._id===userId) 
        if (thisUser.length===1){
            url=thisUser[0].imageUrl
        }
        return url
    }



    useEffect(() => {
        loadOrders(orderService.getDefaultFilter())
    }, [])

    return (
        <main className="orders-modal">  
            <div className='orders-modal-div'>
                <table className='gig-order-table-modal'>
                    <thead>
                        <tr>
                            <th>Creator</th>
                            <th>GIG</th>
                            <th>ORDER AT</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myOrders.map((thisOrder,row) => (
                            <tr key={thisOrder._id} className='this-row'>
                                <td>
                                    <div className='client-element'>
                                        <img  src={thisOrder.providerUrl}/>
                                        <h4>{thisOrder.providerFullname}</h4>
                                    </div>
                                </td>
                                <td>{thisOrder.gigTitle}</td>
                                <td className='order-at'>{thisOrder.createdAtFormatted}</td>
                                <td className='gig-status'>
                                    {thisOrder.status==="pending"&&<span className='pending'>Pending</span>}                                    
                                    {thisOrder.status==="approved"&&<span className='approved'>Approved</span>}                                    
                                    {thisOrder.status==="in-progress"&&<span className='in-progress'>In Progress</span>}                                    
                                    {thisOrder.status==="completed"&&<span className='completed'>Completed</span>}                                    
                                    {thisOrder.status==="rejected"&&<span className='rejected'>Rejected</span>}                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='close-modal-btn' onClick={()=>onCloseMyOrders()}>Close</button>
            </div>
        </main>
    )
}
