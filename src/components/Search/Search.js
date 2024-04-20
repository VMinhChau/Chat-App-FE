import { styled } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: "#F0F0EF",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  "& .MuiInputBase-root": {
    width: "95%",
  },
}));

export default Search;
