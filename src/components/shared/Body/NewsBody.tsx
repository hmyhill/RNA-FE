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

    function cutStringToLastWord(str: String, maxLength: number) {
        if (str !== undefined && str !== null){
            if (str.length <= maxLength) {
            // Return the original string if its length is less than or equal to the maximum length
            return str;
            }
        
            // Find the index of the last sentence-ending punctuation mark before the maximum length
            const lastSentenceIndex = Math.max(
            str.lastIndexOf('.', maxLength),
            str.lastIndexOf('?', maxLength),
            str.lastIndexOf('!', maxLength)
            )
        
            if (lastSentenceIndex !== -1 && lastSentenceIndex < maxLength) {
            // Display all characters before the last sentence-ending punctuation mark within the maximum length
            const result = str.slice(0, lastSentenceIndex + 1);
            return result;
            }
        
            // If no sentence-ending punctuation mark is found or the index is beyond the maximum length, cut the string to the last full word before the maximum length
            const lastSpaceIndex = str.lastIndexOf(' ', maxLength);
            return lastSpaceIndex !== -1 ? str.slice(0, lastSpaceIndex) : str.slice(0, maxLength);
        }
    }

    const nav = () => {
        const url = props.newsStories[0]?.link; 

        if (url) {
            window.open(url, '_blank');
        }
    }

    const minorStories = props.newsStories.slice(1);

    return (
        <>
            <TickerComponent data={props.newsStories.map(story => story.title)} />
            <ThemeProvider theme = {responsiveTheme}>
                <Box sx = {{ display: "flex", margin: "2%", height: "55vh", color: "black" }}>
                    <div style = {{ display: "flex", flexDirection: "column", width: "100%" }} >
                        <Box sx={{ backgroundColor: props.backgroundColour, height: "16%", paddingTop: "5px", marginBottom: "0.25%", border: "2px solid black", borderTopRightRadius: "1vw", borderTopLeftRadius: "1vw", overflow: "hidden"}}>
                            <Typography variant={"h6"} lineHeight="1"> {props.newsStories[0]?.title} </Typography>
                        </Box>

                        <Box id="MainStoryRow" sx = {{ display: { xs:"none", sm: "flex"}, height: "79%" }}>
                            <Box sx={{ backgroundColor: props.backgroundColour, width:"30%",  marginBottom: "0.25%", marginRight: "0.25%", border: { xs: "0", sm: "2px solid black" }}}>
                                <img
                                    src={props.newsStories[0]?.image_url}
                                    alt="Image Not Found"
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                            <Box sx={{ backgroundColor: props.backgroundColour, display: {xs: "none", sm: "flex", md: "none"}, width: "70%", paddingX: "1px", marginBottom: "0.25%", border: "2px solid black", overflow: "hidden"}}>
                                <Typography variant={"body1"} lineHeight="1.2"> {cutStringToLastWord(props.newsStories[0]?.content, 875)} </Typography>
                            </Box>
                            <Box sx={{ backgroundColor: props.backgroundColour, display: {xs: "none", md: "flex", lg: "none"}, width: "70%", paddingX: "1px", marginBottom: "0.25%", border: "2px solid black", overflow: "hidden"}}>
                                <Typography variant={"body1"} lineHeight="1.2"> {cutStringToLastWord(props.newsStories[0]?.content, 1340)} </Typography>
                            </Box>
                            <Box sx={{ backgroundColor: props.backgroundColour, display: {xs: "none", lg: "flex", xl: "none"}, width: "70%", paddingX: "1px", marginBottom: "0.25%", border: "2px solid black", overflow: "hidden"}}>
                                <Typography variant={"body1"} lineHeight="1.2"> {cutStringToLastWord(props.newsStories[0]?.content, 1830)} </Typography>
                            </Box>
                            <Box sx={{ backgroundColor: props.backgroundColour, display: {xs: "none", xl:"flex"}, width: "70%", paddingX: "1px", marginBottom: "0.25%", border: "2px solid black", overflow: "hidden"}}>
                                <Typography variant={"body1"} lineHeight="1.2"> {cutStringToLastWord(props.newsStories[0]?.content, 2360)} </Typography>
                            </Box>
                        </Box>

                        <Box id="MainStoryColumn" sx = {{ display: { xs:"flex", sm: "none"}, flexDirection: "column", height: "79%", width: "100%"}}>
                            <Box sx={{ backgroundColor: props.backgroundColour, height:"50%",  marginBottom: "0.25%", border: "2px solid black" }}>
                                <img
                                    src={props.newsStories[0]?.image_url}
                                    alt="Image Not Found"
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                            <Box sx={{ backgroundColor: props.backgroundColour, height: "50%", paddingX: "1px", marginBottom: "0.25%", border: "2px solid black", overflow: "hidden"}}>
                                <Typography variant={"body2"} lineHeight="1"> {cutStringToLastWord(props.newsStories[0]?.content, 515)} </Typography>
                            </Box>
                        </Box>

                        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: props.backgroundColour, height: "5%", border: "2px solid black", borderBottomRightRadius: "1vw", borderBottomLeftRadius: "1vw"}} onClick={nav}>
                            <Typography variant={"body2"}> Click Here For Full Story </Typography>
                        </Box>
                    </div>
                </Box>

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