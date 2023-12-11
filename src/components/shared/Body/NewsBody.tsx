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
import MainMUICard from "../MainMUICard/MainMUICard";

interface BodyProps {
    pageName: string;
    backgroundColour: string;
    newsStories: any[]
}


export default function Body(props: BodyProps){
    let theme = createTheme({
        typography: {
          fontFamily: [
            'DM Serif Display',
          ].join(','),
        },});
    const responsiveTheme = responsiveFontSizes(theme);

    const minorStories = props.newsStories.slice(1);

    return (
        <>
            <TickerComponent data={props.newsStories.map(story => story.title)} />
            <ThemeProvider theme = {responsiveTheme}>
                <MainMUICard cardColour={props.backgroundColour} story={props.newsStories[0]} />

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: props.backgroundColour, marginX: "2%", height: "8vh", border: "1px solid black", borderRadius: "3vw"}}>
                    <Typography variant={"h4"} > Other {props.pageName} Stories For You </Typography>
                </Box>

                <Box sx={{ flexGrow: 1, marginBottom: "2vh"}}>
                    <Grid container columns= {12} rowSpacing={1} columnSpacing={2} margin="0px" width="100%">
                        {minorStories.map((story) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} sx={{ padding: "0 !important" }} >
                                    <Box sx={{ backgroundColor: props.backgroundColour, margin: "5%" }}>
                                        <MUIcard story={story} cardColour={[props.backgroundColour]}/>
                                        {/*This is what is used for the cards at the bottom of the page*/}
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