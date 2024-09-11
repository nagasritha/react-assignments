import axios from "axios";
import {Books} from "./book";

const url = 'http://localhost:3000/books.json';

export class ApiBookService{

    getAllBooks= async()=>{
        let books = await axios.get(url);
        return books.data;
    }

    getBookById = async(id:string)=>{
        let books = await this.getAllBooks();
        let book = books.find((item:Books)=>item.id===id);
        return book;
    }

    removeBookById = async(id:string)=>{
        let books = await this.getAllBooks();
        let filteredBooks = books.filter((item:Books)=>item.id!==id);
        return filteredBooks; 
    }

    updateBookById = async(id:string)=>{
        let books = await this.getAllBooks();
        let bookUpdation = books.map((item:Books)=>item.id===id?{...item,title:item.title.split(" ")[0]} : item)
        let updatedBook = await this.getBookById(id);
        return updatedBook;
    }

}