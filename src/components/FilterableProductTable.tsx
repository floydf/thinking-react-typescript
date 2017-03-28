
import * as React from "react";

export interface Product {
    category: string;
    price: string;
    stocked: boolean;
    name: string;
}

interface TableRowProps {
    cat?: string;
    prod?: Product;
    key: string;
}

class CategoryRow extends React.Component<TableRowProps, {}> {
    constructor(props: TableRowProps){
	super(props);
    }
    render() {
	return <tr><td colSpan={2}>{this.props.cat}</td></tr>;
    }
}

class ProductRow extends React.Component<TableRowProps, {}> {
    constructor(props: TableRowProps){
	super(props);
    }
    render() {
	let name = this.props.prod.name;
	return (
	    <tr>
		<td>{name}</td>
		<td>{this.props.prod.price}</td>
	    </tr>
	);
    }
}

interface ProductTableProps {
    prods: Product[];
    filterText: string;
    inStockOnly: boolean;
}

class ProductTable extends React.Component<ProductTableProps, {}> {
    constructor(props: ProductTableProps){
	super(props);
    }
    render() {
	let rows: React.ReactElement<TableRowProps>[] = [];
	let lastCategory = "";
	this.props.prods.forEach( (prod: Product) => {
	    if (prod.name.indexOf(this.props.filterText) === -1 ||
		(prod.stocked && this.props.inStockOnly)) {
		return;
	    }
	    if (prod.category !== lastCategory) {
		rows.push(<CategoryRow cat={prod.category} key={prod.category} />);
	    }
	    rows.push(<ProductRow prod={prod} key={prod.name}/>);
	    lastCategory = prod.category;
	});
	return (
	    <table>
		<thead>
		    <tr>
			<th>Item</th>
			<th>Price</th>
		    </tr>
		</thead>
		<tbody>{rows}</tbody>
	    </table>

	);
    }
}

interface SearchBarProps {
    filterText: string;
    inStockOnly: boolean;
    onFilterTextInput: (s: string) => void;
    onInStockInput: (b: boolean) => void;
}

class SearchBar extends React.Component<SearchBarProps, {}> {
    constructor(props: SearchBarProps){
	super(props);
	this.handleFilterTextInputChange =
	    this.handleFilterTextInputChange.bind(this);
	this.handleInStockInputChange =
	    this.handleInStockInputChange.bind(this);
    }
    handleFilterTextInputChange(e: any) {
	this.props.onFilterTextInput(e.target.value);
    }
    handleInStockInputChange(e: any) {
	this.props.onInStockInput(e.target.checked);
    }
    render() {
	return (
	    <form>
		<input
		    type="text"
		    placeholder="Search ..."
		    value={this.props.filterText}
		    onChange={this.handleFilterTextInputChange}
		/>
		<p>
		    <input
			type="checkbox"
			checked={this.props.inStockOnly}
			onChange={this.handleInStockInputChange}
		    />
		    {' '}
		    Only show products in stock
		</p>
	    </form>
	);
    }
}

export interface FilterableTableProps {
    prods: Product[];
}

interface FilterTableState {
    filterText: string;
    inStockOnly: boolean;
}

export class FilterableTable extends React.Component<FilterableTableProps, FilterTableState > {
    constructor(props: FilterableTableProps){
	super(props);
	this.state = {
	    filterText: "",
	    inStockOnly: false
	};
	this.handleFilterTextInput =
	    this.handleFilterTextInput.bind(this);
	this.handleInStockInput =
	    this.handleInStockInput.bind(this);
    }
    handleFilterTextInput(filterText: string) {
	console.log("handleFilterTextInput " + filterText);
	this.setState({
	    filterText: filterText
	})
    }
    handleInStockInput(inStockOnly: boolean) {
	console.log("handleInStockInput " + inStockOnly);
	this.setState({
	    inStockOnly: inStockOnly
	});
    }
    render() {
	return (
	    <div>
		<SearchBar
		    filterText={this.state.filterText}
		    inStockOnly={this.state.inStockOnly}
		    onFilterTextInput={this.handleFilterTextInput}
		    onInStockInput={this.handleInStockInput}
		/>
		<ProductTable
		    prods={this.props.prods}
		    filterText={this.state.filterText}
		    inStockOnly={this.state.inStockOnly} />
	    </div>
	);
    }
}
