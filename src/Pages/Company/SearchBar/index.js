import "./searchbar.css";
//Assets
import { IoSearch } from "react-icons/io5";
export default function SearchBar({ value, onChange, placeholder, disabled }) {
    return (
        <div className="company_search_bar">
            <IoSearch />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            />
        </div>
    );
}
SearchBar.defaultProps = {
    value: "",
    onChange: () => {},
    placeholder: "Search...",
    disabled: false,
};
