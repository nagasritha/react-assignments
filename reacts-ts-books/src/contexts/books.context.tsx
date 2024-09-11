import { ApiBookService } from "../services/api-book.service";
import React, { useReducer } from "react";
import { Books } from "../services/book";
import { action } from '../utils/action-creator';
import { useStatusContext } from "./status.context";

interface booksContextProps {
    booksData: Books[],
    selectedBook: Books | null
}

let defaultBookStore: booksContextProps = {
    booksData: [],
    selectedBook: null
}

const BooksContext = React.createContext<any>(null);

export const useBooksContext = () => React.useContext(BooksContext);

const booksReducer = (booksStore: booksContextProps = defaultBookStore, action: any) => {
    switch (action.type) {
        case "BOOK_LIST":
            return {
                ...booksStore,
                booksData: action.payload
            };

        case "BOOK_SELECT":
            return {
                ...booksStore,
                selectedBook: action.payload
            };

        case "BOOK_REMOVE":
            return {
                ...booksStore,
                booksData: action.payload,
                selectedBook: null
            };

        case "BOOK_UPDATE":
            return {
                ...booksStore,
                selectedBook: action.payload
            };

        case "BOOK_ADD":
            return {
                ...booksStore,
                booksData: [...booksStore.booksData, action.payload],
                selectedBook: action.payload
            };

        default:
            return booksStore;
    }
}

export const BookProvider = ({ children }: any) => {
    const [bookStore, dispatch] = useReducer(booksReducer, defaultBookStore);

    let booksService = new ApiBookService();
    let { setStatus } = useStatusContext();
    
    let callAction = (serviceFunction: (...params: any[]) => any, actionName: string) =>
        action(serviceFunction, dispatch, setStatus, actionName);

    let actions = {
        getAllBooks: callAction(booksService.getAllBooks, 'BOOK_LIST'),
        getBookById: callAction(booksService.getBookById, 'BOOK_SELECT'),
        removeBookById: callAction(booksService.removeBookById, 'BOOK_REMOVE'),
        updateBookById: callAction(booksService.updateBookById, 'BOOK_UPDATE')
    }

    return (
        <BooksContext.Provider value={{ ...actions, ...bookStore }}>
            {children}
        </BooksContext.Provider>
    );
}
