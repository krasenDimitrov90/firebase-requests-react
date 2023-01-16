

const Book = ({author, title, description, image}) => {
    return (
        <div className="book-container" >
            <h3>{author}</h3>
            <h4>{title}</h4>
            <h4>{description}</h4>
            <img src={image} alt="some book cover" className="book-image" />
            <button>Details</button>
        </div>
    );
};

export default Book;