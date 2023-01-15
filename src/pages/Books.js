import React from "react";

import * as api from '../services/api';
import './Books.css';

const Books = () => {

    const [books, setBooks] = React.useState({});

    React.useEffect(() => {
        api.get('https://testing-12da0-default-rtdb.europe-west1.firebasedatabase.app/books.json')
            .then(books => {
                console.log(Object.values(books));
                setBooks(books);
            })
            .catch(err => {
                err.then(error => {
                    alert(error.error);
                });
            })
    }, []);


    const booksTemplate = (author, title, description, image) => {
        console.log(author, title, description, image);
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

    return (
        <>
            <h1>All books</h1>
            <header className="all-books" >
                {Object.keys(books).length === 0 && <p>No books found!</p>}
                {Object.keys(books).length > 0 && Object.values(books).map(book => booksTemplate(book.author, book.title, book.description, book.image))}
            </header>
        </>
    );
};

export default Books;