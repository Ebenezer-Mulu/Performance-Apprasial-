import { MdSearch } from "react-icons/md";
import styled from "styled-components";
import Row from "./Row";
import PropTypes from "prop-types";
import { useSearchParams, useLocation } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  width: max-content;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #000;
  padding: 10px;
  border-radius: 10px;
  width: max-content;
`;

const SearchInput = styled.input`
  border: none;
  color: #000;
  outline: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const location = useLocation();
  //  const history = useHistory();

  const handleSearch = useDebouncedCallback((e) => {
    // search after finishing typing
    const currentSearchParams = new URLSearchParams(searchParams);
    const params = Object.fromEntries(currentSearchParams.entries());

    params.set("page", 1);

    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }

    //  history.replace(`${location.pathname}?${new URLSearchParams(params)}`);
  }, 300);

  return (
    <StyledSearch>
      <Row type="horizontal">
        <SearchInputContainer>
          <MdSearch />
          <SearchInput
            type="text"
            placeholder={placeholder}
            onChange={handleSearch}
          />
        </SearchInputContainer>
      </Row>
    </StyledSearch>
  );
};

// Add prop-type validation
Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default Search;
