import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: 3,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 800,
  overflow: "auto",
}));
const validateEmail = (email: FormDataEntryValue | null) => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (email === null) {
    return false;
  }
  return String(email).toLowerCase().match(re);
};
export { Item, validateEmail };
