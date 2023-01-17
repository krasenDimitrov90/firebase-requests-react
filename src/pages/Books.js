import React from "react";
import Book from "../components/Book";
import useHttp from "../hooks/use-http";

import './Books.css';

const Books = () => {

    const { isLoading, sendRequest: getBooks } = useHttp();
    const [books, setBooks] = React.useState({});

    React.useEffect(() => {
        const setBooksHandler = (books) => setBooks(books);
        const errorHandler = (error) => alert(error.error);

        const requestConfig = {action: 'getAllBooks'};

        getBooks(requestConfig, setBooksHandler, errorHandler);
    }, [getBooks]);

    return (
        <>
            <h1>All books</h1>
            <header className="all-books" >
                {isLoading && <h1>LOADINGGGGGGGGGGGGGGGGGGGGGGGGG</h1>}
                {Object.keys(books).length === 0 && <p>No books found!</p>}
                {Object.keys(books).length > 0 && Object.values(books).map(book => {
                    return <Book
                        key={book.title}
                        author={book.author}
                        title={book.title}
                        description={book.description}
                        image={book.image}
                    />
                })}
            </header>
        </>
    );
};

export default Books;