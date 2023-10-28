import {
    Box,
    Typography
} from "@mui/material";

import { 
    createTheme,
    ThemeProvider,
    responsiveFontSizes 
} from '@mui/material/styles';
import TickerComponent from "../Ticker/Ticker";

interface BodyProps {
    pageName: string;
    backgroundColour: string;
}

export default function Body(props: BodyProps){
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    /* NEED TO ADD REQUEST TO GET STORIES RELEVANT TO PAGE NAME */

    return (
        <>
            <TickerComponent data={["Test to see if this works", "story2"]} />
            <ThemeProvider theme = {theme}>
                <Box id="MainStory" sx = {{ display: "flex", margin: "2%", height: "50vh", color: "black", border: "2px solid black" }}>
                    <Box sx={{ backgroundColor: props.backgroundColour, width: "38%", height: "100%", marginRight: "2%", borderRight: "2px solid black"}}>
                        <Typography variant={"h6"}> Image Goes Here </Typography>
                    </Box>

                    <div style = {{ display: "flex", flexDirection: "column", width: "60%" }}>
                        <Box sx={{ backgroundColor: props.backgroundColour, height: "13%", marginBottom: "2%", borderLeft: "2px solid black", borderBottom: "2px solid black"}}>
                            <Typography variant={"h4"}> Headline Goes Here </Typography>
                        </Box>

                        <Box sx={{ backgroundColor: props.backgroundColour, height: "85%", borderTop: "2px solid black", borderLeft: "2px solid black" }}>
                            <Typography variant={"h6"}> Article Goes Here </Typography>
                        </Box>
                    </div>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: props.backgroundColour, height: "10vh", marginLeft: "5%", marginRight: "5%", border: "2px solid black", borderRadius: "3vw"}}>
                    <Typography variant={"h4"} > Other {props.pageName} Stories For You </Typography>
                </Box>
            </ThemeProvider>
        </>
    )
}