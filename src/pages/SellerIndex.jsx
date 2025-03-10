import { useState, useEffect,useRef } from 'react'
import { useSelector,useDispatch } from 'react-redux'

import {  loadGigs } from '../store/actions/gig.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig/index'
import { userService } from '../services/user'
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

export function SellerIndex() {
    const dispatch = useDispatch()
    const orders =useSelector(storeState => storeState.orderModule.orders)
    const users =useSelector(storeState => storeState.userModule.users)
    const user =useSelector(storeState => storeState.userModule.user)
    let seller=''
    if (user){
        const sellerArray=users.filter(thisUser=>thisUser._id===user._id)

        if (sellerArray.length===1){
            seller=sellerArray[0]
        }
    }



    let rateInt=''
    let sellerOrders=[]
    if (seller){
        rateInt=Math.round(seller.rate)
        sellerOrders = orders.filter(order => seller._id === order.providerId);
        sellerOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        sellerOrders=sellerOrders.map(thisOrder=>{
            return {
                ...thisOrder, 
                createdAtFormatted: formatTimestamp(thisOrder.createdAt),
                clientUrl: getUserImgUrl(thisOrder.clientId),
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

    const dialogRef = useRef(null);
    
    function toggleShowStatusModal() {
        if (dialogRef.current) {
            dialogRef.current.showModal(); 
        }
    }



    useEffect(() => {
        loadOrders(orderService.getDefaultFilter())
    }, [])

    if (!seller) return <h1>Loading..</h1>

    return (
        <main className="seller-index">  
            <div className='seller-profile'>
                <div className='top-details'>
                    <div className='img-container'>
                        <img  src={seller.imageUrl}/>
                        {seller.level==='premium'&& <div className='premium'>
                            <RatePremium />
                            <h5>Premium member</h5>
                        </div>}
                    </div>
                    <div className='rate'>
                        {Array.from({ length: rateInt}, (_, index) => (
                            <BlackStar key={index} />
                        ))}
                        <p>{seller.rate}</p>
                    </div>
                </div>

                <div className='buttom-details'>

                    <div className='name-line'>
                        <Fullname/>
                        <h6>Full Name</h6>
                        <h6 className='data-bold'>{seller.fullname}</h6>
                    </div>
                    <div className='from-line'>
                        <Location/>
                        <h6>From</h6>
                        <h6 className='data-bold'>{seller.from}</h6>
                    </div>
                    <div className='member-since'>
                        <Member/>
                        <h6>Member Since</h6>
                        <h6 className='data-bold'>{seller.memberSince}</h6>
                    </div>

                    <div className='response-line'>
                        <ResponseTime/>
                        <h6>Avg. Response Time</h6>
                        <h6 className='data-bold'>{seller.avgResponseTime} min.</h6>
                    </div>

                </div>
            </div>

            <div className='manage-orders'>
                <table className='gig-order-table'>
                    <thead>
                        <tr>
                            <th>BUYER</th>
                            <th>GIG</th>
                            <th>ORDER AT</th>
                            <th>DELIVERY AT</th>
                            <th>TOTAL</th>
                            <th>STATUS</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {sellerOrders.map((thisOrder) => (
                            <tr key={thisOrder._id}>
                                <td>
                                    <div className='client-element'>
                                        <img  src={thisOrder.clientUrl}/>
                                        <h4>{thisOrder.clientFullName}</h4>
                                    </div>
                                </td>
                                <td>{thisOrder.gigTitle}</td>
                                <td className='order-at'>{thisOrder.createdAtFormatted}</td>
                                <td className='delivery-at'>{thisOrder.deliveryDateFormatted}</td>
                                <td>{thisOrder.total}$</td>
                                <td className='gig-status'>
                                    {thisOrder.status}                                    
                                </td>
                                <td className='gig-status-menu'>
                                    <div>
                                        <ThreeDots onClick={toggleShowStatusModal} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <StatusModal dialogRef={dialogRef} initialStatus="Inactive"/>
            </div>
            

        </main>
    )
}