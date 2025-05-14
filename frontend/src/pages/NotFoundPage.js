import {Link} from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <dev className="flex flex-col gap-2">
            404 not found.

            <Link to="/">Home</Link>
        </dev>
    )
}