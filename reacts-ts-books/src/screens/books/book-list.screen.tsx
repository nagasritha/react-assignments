import React,{useState, useEffect} from'react';
import { useBooksContext } from '../../contexts/books.context';
import { useStatusContext } from '../../contexts/status.context';
import { Books } from '../../services/book';
import { BookCard } from '../../components/booksCard.component';



export const BookListScreen = () => {
    

        let {booksData,getAllBooks} = useBooksContext();
        
        useEffect(getAllBooks,[]);
        console.log(booksData);

        let status = useStatusContext();
        console.log(status);

    return (

        <div className='BookListScreenComponent'>

            <h2>Book List</h2>
            <div className='row'>
                {
                    booksData.map((book:Books) => (
                        <div key={book.id} className='col col-md-4'>
                            <BookCard book={book} />
                        </div>
                    ))
                }
            </div>
            
        </div>
    );

}
