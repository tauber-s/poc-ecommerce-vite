import { SearchBarProps } from "./SearchBar.props";

const SearchBar = ({ searchText, setSearchText, className, ...props }: SearchBarProps) => {
  return (
    <form className={className} {...props}>
      <input 
        type="text" 
        value={searchText} 
        placeholder="Search for a product..." 
        onChange={(e) => setSearchText(e.target.value)}  
      />
    </form>
  )
};

export default SearchBar;
