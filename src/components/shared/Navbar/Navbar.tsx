import { Toolbar, Typography } from "@mui/material";

interface NavbarProps {
  backgroundColor: string;
  page: String;
}

export default function Navbar(props: NavbarProps) {
  return (
    <>
      <Toolbar
        sx={{
          backgroundColor: props.backgroundColor,
          width: "100%",
          minHeight: "75px",
          height: "15vh",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        <Typography color={"white"} > TEST </Typography>


      </Toolbar>
    </>
  );
}
