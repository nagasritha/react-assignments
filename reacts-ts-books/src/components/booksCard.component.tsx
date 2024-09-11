import React, { useState, useEffect } from 'react';
import { Books } from '../services/book';
import { Link } from 'react-router-dom';


export interface BooksCardProps {

    book: Books

}


export const BookCard = ({ book }: BooksCardProps) => {

    const width='250px'
    const style={
        width,
        
    }

    const imageStyle={
        width,
    }

    //const bio= author.biography.length>50?`${author.biography.substring(0,50)}...`:author.biography;
    return (

        <div className="card mb-3" style={style}>
            <img src={book.cover} style={imageStyle} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    {/* <p className="card-text">{book.description.substring(0,50)}</p> */}
                    <Link className="btn btn-default" to={`/book/details/${book.id}`}>More...</Link>
                </div>
        </div>
    );

}
