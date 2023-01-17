import { Link } from "react-router-dom";

const Book = ({id, author, title, description, image}) => {
    return (
        <div className="book-container" >
            <h3>{author}</h3>
            <h4>{title}</h4>
            <h4>{description}</h4>
            <img src={image} alt="some book cover" className="book-image" />
            <Link to={`/books/${id}`} >Details</Link>
        </div>
    );
};

export default Book;