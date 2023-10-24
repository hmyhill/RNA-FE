import { Toolbar } from "@mui/material";

interface NavbarProps {
  backgroundColor: string;
}

export default function Navbar(props: NavbarProps) {
  return (
    <>
      <Toolbar
        sx={{
          backgroundColor: props.backgroundColor,
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      ></Toolbar>
    </>
  );
}
