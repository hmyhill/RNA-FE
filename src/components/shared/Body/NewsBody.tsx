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
import MUIcard from "../MUICard/MUIcard";

interface BodyProps {
    pageName: string;
    backgroundColour: string;
}


export default function Body(props: BodyProps){
    let theme = createTheme({
        typography: {
          fontFamily: [
            'DM Serif Display',
          ].join(','),
        },});
    theme = responsiveFontSizes(theme);
    //Added A new News font to News body pages, if you want to change this
        //or add additional fonts switch out font in the typeography square brackets[]

    /* NEED TO ADD REQUEST TO GET STORIES RELEVANT TO PAGE NAME */

    let data: string[] = ["Story 1.", "Story 2.", "Story 3."]
    
    //You can place variables with the news paper details in the story 1 -3 sections.

    return (
        <>
            <TickerComponent data={data} />
            <ThemeProvider theme = {theme}>
            <Box id="MainStoryWide" sx = {{ display: { xs: "none", sm: "flex" }, margin: "2%", height: {sm: "35vh", md:"45vh" }, color: "black" }}>
                    <div style = {{ display: "flex", flexDirection: "column", width: "100%" }}>
                        <Box sx={{ backgroundColor: props.backgroundColour, height: "14%", marginBottom: "1%", border: "1px solid black", borderRadius: "1vw"}}>
                            <Typography variant={"h4"}> Headline Goes Here </Typography>
                        </Box>
                        
                        <div style = {{ display: "flex", height: "85%" }}>
                            <Box sx={{ backgroundColor: props.backgroundColour, width: "38%", marginRight: "2%", border: "1px solid black", borderRadius: "0.3vw"}}>
                                <Typography variant={"h6"}> Image Goes Here </Typography>
                            </Box>
                            <Box sx={{ backgroundColor: props.backgroundColour, width: "60%", border: "1px solid black", borderRadius: "0.3vw"}}>
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


                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: props.backgroundColour, height: "10vh", margin: "2%", margintTop: "0%", border: "1px solid black", borderRadius: "3vw"}}>
                    <Typography variant={"h4"} > Other {props.pageName} Stories For You </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columns= {12} rowSpacing={1} columnSpacing={2} margin="0px" width="100%">
                        {data.map((story, index) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} sx={{ padding: "0 !important" }} style={{overflow: 'auto'}}>
                                    {/*added auto overflow for side scrolling*/}
                                    <Box sx={{ backgroundColor: props.backgroundColour, margin: "5%" }}>
                                        <MUIcard cardcolor={[props.backgroundColour]}/>
                                        {/*This is what is used for the cards at the buttom*/}
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