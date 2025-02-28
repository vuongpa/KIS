import { Box } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { useDebounce } from "@uidotdev/usehooks";
import { useDispatch } from "react-redux";
import { setSearchKeyword } from '../../redux_logic';
import { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search'; // Use Material UI search icon
import { useWindowSize } from "react-use";

export function SearchBar() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300); // renamed to debouncedKeyword
  const [isSearchVisible, setIsSearchVisible] = useState(true); // state to control search visibility on mobile

  const { width } = useWindowSize();

  useEffect(() => {
    if (width < 768) {
      setIsSearchVisible(false);
    }
  }, [width]);

  useEffect(() => {
    dispatch(setSearchKeyword(debouncedKeyword)); // using debouncedKeyword
  }, [debouncedKeyword, dispatch]);

  return isSearchVisible
    ? (
      <Box
        className="relative flex items-center"
        sx={{
          borderRadius: "100px",
          backgroundColor: "#F5F5F5",
          height: "36px",
          padding: "0 16px",
          width: width < 768 ? "150px" : "300px",  // Adjust the width for mobile view
          display: "flex",
          alignItems: "center",
          transition: "width 0.3s ease",  // Smooth transition when resizing
        }}
      >
        <InputBase
          placeholder="Search project"
          inputProps={{
            "aria-label": "search",
          }}
          sx={{ width: "100%" }}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <SearchIcon
          sx={{ cursor: "pointer" }}
          onClick={() => setIsSearchVisible(currentVal => !currentVal)}
        />
      </Box>
    )
    : (
      <SearchIcon
        sx={{ cursor: "pointer" }}
        onClick={() => setIsSearchVisible(true)}
      />
    )
}
