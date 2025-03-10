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


    console.log(seller)
    let rateInt=''
    if (seller){
        rateInt=Math.round(seller.rate)
    
    }


    useEffect(() => {

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
            

        </main>
    )
}