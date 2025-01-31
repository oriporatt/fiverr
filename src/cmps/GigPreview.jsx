import { Link } from 'react-router-dom'
import { GigPreviewCarrousel } from './GigPreviewCarrousel'

export function GigPreview({ gig }) {




    return <article className="gig-preview">
        <div className="img-container">
            {/* <img src={gig.imgs[0]} alt="Description of image" /> */}
            <GigPreviewCarrousel images={gig.imgs} />
        </div>

        <header>
            <Link to={`/gig/${gig._id}`}>{gig.owner.fullname}</Link>
        </header>

        <p><span className='gig-title'>{gig.title}</span></p>
        <p><span className='price-tag'>From {gig.price}$</span></p>
    </article>
}