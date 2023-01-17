import React from "react";
import { useParams } from "react-router-dom";
import Book from "../components/Book";

const BookDetails = () => {
    const params = useParams();
    console.log(params);

    const [book, setBook] = React.useState({});

    React.useEffect(() => {
        // http://localhost:3000/books/-NLpvIliXTSFx7Nlg45X
        fetch(`https://testing-12da0-default-rtdb.europe-west1.firebasedatabase.app/books/${params.bookId}.json`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(book => {
                console.log(book);
                setBook(book)
            })
            .catch(err => {
                err.then(error => {
                    let errorMessage = error.error || error.error.message;
                    console.log(errorMessage);
                })
            })

    }, [])


    return (
        <>
            {/* {Object.keys(book).length === 0 && <h1>No details found</h1>} */}
            {Object.keys(book).length > 0 && <Book
                author={book.author}
                title={book.title}
                description={book.description}
                image={book.image}
            />}
        </>
    );
};

export default BookDetails;