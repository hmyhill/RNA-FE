import {
    Box,
    Grid,
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

interface LShapedProps {
    text: string;
}

export default function Body(props: BodyProps){
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    /* NEED TO ADD REQUEST TO GET STORIES RELEVANT TO PAGE NAME */

    let data: string[] = ["Test to see if this works", "story2", "story3"]

    return (
        <>
            <TickerComponent data={data} />
            <ThemeProvider theme = {theme}>
                <Box id="MainStoryWide" sx = {{ display: { xs: "none", sm: "flex" }, margin: "2%", height: {sm: "35vh", md:"45vh" }, color: "black" }}>
                    <div style = {{ display: "flex", flexDirection: "column", width: "100%" }}>
                        <Box sx={{ backgroundColor: props.backgroundColour, height: "14%", marginBottom: "1%", border: "2px solid black"}}>
                            <Typography variant={"h4"}> Headline Goes Here </Typography>
                        </Box>
                        
                        <div style = {{ display: "flex", height: "85%" }}>
                            <Box sx={{ backgroundColor: props.backgroundColour, width: "38%", marginRight: "2%", border: "2px solid black"}}>
                                <Typography variant={"h6"}> Image Goes Here </Typography>
                            </Box>
                            <Box sx={{ backgroundColor: props.backgroundColour, width: "60%", border: "2px solid black" }}>
                                <Typography variant={"h6"}> Article Goes Here </Typography>
                            </Box>
                        </div>
                    </div>
                </Box>

                <Box id="MainStoryNarrow" sx = {{ display: { xs: "flex", sm: "none" }, flexDirection: "column", margin: "2%", height: "50vh", color: "black", backgroundColor: props.backgroundColour }}>
                    <Box sx={{ backgroundColor: "#fff", height: "9%", marginBottom: "1%", border: "2px solid black" }}>
                        <Typography variant={"h3"}> Headline Goes Here </Typography>
                    </Box>
                    
                        <Box sx={{ backgroundColor: "#fff", width: "50%", height: "44%", border: "2px solid black", marginLeft: "auto", marginRight: "auto", marginBottom: "1%" }}>
                            <Typography variant={"h6"}> Image Goes Here </Typography>
                        </Box>

                        <Box sx={{ backgroundColor: "#fff", height: "45%", border: "2px solid black" }}>
                            <Typography variant={"h6"}> Article Goes Here </Typography>
                        </Box>
                </Box>


                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: props.backgroundColour, height: "10vh", margin: "2%", margintTop: "0%", border: "2px solid black", borderRadius: "3vw"}}>
                    <Typography variant={"h4"} > Other {props.pageName} Stories For You </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columns= {12} rowSpacing={1} columnSpacing={2} margin="0px" width="100%">
                        {data.map((story, index) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} sx={{ padding: "0 !important" }}>
                                    <Box sx={{ backgroundColor: props.backgroundColour, margin: "2%" }}>
                                        <Box sx={{ backgroundColor: "white", margin: "2%", height: "25vh", border: "2px solid black"}}>
                                            
                                        </Box>
                                        <Box sx={{ margin: "2%", height: "25vh" }}>
                                            <Typography variant={"h6"} > {data[index]} </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </ThemeProvider>
        </>
    )
}