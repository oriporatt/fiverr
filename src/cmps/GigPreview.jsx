import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {
    return <article className="gig-preview">
        <div className="img-container">
            <img src={gig.imgs[0]} alt="Description of image" />

        </div>

        <header>
            <Link to={`/gig/${gig._id}`}>{gig.owner.fullname}</Link>
        </header>

        <p><span>{gig.title}</span></p>
        <p><span>From {gig.price}</span></p>
    </article>
}