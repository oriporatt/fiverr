import { Link } from 'react-router-dom'
import { GigPreviewCarrousel } from './GigPreviewCarrousel'
import { useNavigate } from 'react-router-dom';

export function GigPreview({ gig }) {
    const navigate = useNavigate();




    return <article className="gig-preview">
        <div className="img-container"
        >
            <GigPreviewCarrousel images={gig.imgs} gigId={gig._id} />
        </div>

        <header className='card-header'>
            <div className='owner-img'>
                <img  src={gig.owner.imgUrl}/>
            </div>
            <div className='owner-name'>
                {/* <Link to={`/gig/${gig._id}`}>{gig.owner.fullname}</Link> */}
                <h4>{gig.owner.fullname}</h4>
            </div>

        </header>

        <p><span className='gig-title'>{gig.title}</span></p>
        <p><span className='price-tag'>From {gig.price}$</span></p>
    </article>
}