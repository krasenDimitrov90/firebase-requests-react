import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth-context";

const Book = ({ id, author, title, description, image, ownerId }) => {

    const authCtx = React.useContext(AuthContext);
    const { isLoggedIn, getUserCredentials } = authCtx;

    const { userId } = getUserCredentials();

    console.log(`userId - ${userId} and ownerId - ${ownerId}`);
    return (
        <div className="book-container" >
            <h3>{author}</h3>
            <h4>{title}</h4>
            <h4>{description}</h4>
            <img src={image} alt="some book cover" className="book-image" />
            <Link to={`/books/${id}`} >Details</Link>
            {isLoggedIn && ownerId && userId === ownerId &&
                <>
                    <button>Edit</button>
                    <button>Delete</button>
                </>
            }
            {isLoggedIn && ownerId && userId !== ownerId &&
                <button>Like</button>
            }
        </div>
    );
};

export default Book;