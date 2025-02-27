import { Link } from 'react-router-dom'
import { GigPreviewCarrousel } from './GigPreviewCarrousel'

export function GigPreview({ gig }) {




    return <article className="gig-preview">
        <div className="img-container">
            <GigPreviewCarrousel images={gig.imgs} />
        </div>

        <header className='card-header'>
            <div className='owner-img'>
                <img  src={gig.owner.imgUrl}/>
            </div>
            <div className='owner-name'>
                <Link to={`/gig/${gig._id}`}>{gig.owner.fullname}</Link>
            </div>

        </header>

        <p><span className='gig-title'>{gig.title}</span></p>
        <p><span className='price-tag'>From {gig.price}$</span></p>
    </article>
}