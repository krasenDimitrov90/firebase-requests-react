import React from "react";
import { useParams } from "react-router-dom";
import Book from "../components/Book";
import useHttp from "../hooks/use-http";

const BookDetails = () => {
    const params = useParams();

    const {isLoading, sendRequest: requestBook} = useHttp();

    const [book, setBook] = React.useState({});

    React.useEffect(() => {

        const bookDataHandler = (book) => {
            setBook(book);
        };

        const errorHandler = (err) => {
            alert(err);
        };

        const requestConfig = {action: 'getBook', id: params.bookId};

        requestBook(requestConfig, bookDataHandler, errorHandler);

    }, [])


    return (
        <>
            {isLoading && <h1>Loading...</h1>}
            {Object.keys(book).length > 0 && <Book
                ownerId={book.ownerId}
                author={book.author}
                title={book.title}
                description={book.description}
                image={book.image}
            />}
        </>
    );
};

export default BookDetails;