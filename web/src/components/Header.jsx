const Header = () => {
    return (
        <>
        <div className="title">
            <h3>DoxCollege</h3>
        </div>
        <div className="inputField">
        <input type="text" placeholder="Search for an item here"/>
        <button>Search</button>
        </div>
        <ul className="heading">
            <li><strong>Title</strong></li>
            <li><strong>Category</strong></li>
            <li><strong>Year</strong></li>
            <li><strong>Price</strong></li>
            <li><strong>Buy</strong></li>
        </ul>
        </>
    );
}
 
export default Header;