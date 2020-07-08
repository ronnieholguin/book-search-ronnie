import React from 'react';
import './Search.css';

class Search extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            query:'',
            results: [],
            filter: ''
            
        }
    }
//   handleSearch = () => {
//         ('.container').submit('#search-button', event => {
//             event.preventDefault();
//             getBooks();

//         } )
//     };

   getBooks = (e) => {
        e.preventDefault();
        const URL = 'https://www.googleapis.com/books/v1/volumes?q=';
        const apiKey = 'AIzaSyAvLPUc690OA5YYi-EQQOsB79F55jV8qsA';
        const query = this.state.query
        fetch(`${URL}${query}&key=${apiKey}`)
            .then(response => response.json())
            .then(data => this.setState({results: data.items}))
    };
    forSale = (item) => {
            if (item.saleInfo.saleability === "NOT_FOR_SALE") {
               return "NOT FOR SALE"
            } else {
                return item.saleInfo.retailPrice.amount
            }
        }
  
 
    displayResultsItem = () => {
      const data = this.state.results;
      //console.log(data);
      return data.map(item =>
        <div key={item.id}>
            <li key={item.id}>
            <h2>{item.volumeInfo.title}
            </h2>
            <img src={item.volumeInfo.imageLinks.thumbnail} alt={item.volumeInfo.title}book-cover />
            <p>{item.volumeInfo.description}</p>
            <p>{this.forSale(item)}</p>
            </li>
        </div> 
            )
    };
    
     handleInputChange = (e) => {
         this.setState({query: e.target.value})
     }
     
     handleFilter = (e) => {
         e.preventDefault();
      this.setState({filter: e.target.value})
     }


	render() {
		return (
			<div className="container">

				<h2 className="heading">Book Search</h2>

				<label className="search-label" htmlFor="search-input">
                    <input
                        type="text"
                        value={this.state.query}
                        id="search-input"
                        placeholder="Search..."
                        onChange={this.handleInputChange}
                    />
					<i className="fa fa-search search-icon"/>
				</label>
                <button type="submit" id="search-button" onClick={this.getBooks}>Search</button>
                <label className="print-type-drop" htmlFor="print-type-selector">
                    <select id="print-type-selector" onChange={this.handleFilter} value={this.state.filter}>
                    <option value="">all</option>    
                    <option value="true">eBook</option>
                    <option value="false">printed</option>
                        
                    </select>
                </label>
                <section className="results">
                
                   <ul> 
                       {this.displayResultsItem()}
                   </ul>
                   
                
                </section>
				
			</div>
			)
	}
}

export default Search;