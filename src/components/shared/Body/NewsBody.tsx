import {
    Box,
    Grid,
    Stack,
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
    newsStories: any[]
}

export default function Body(props: BodyProps){
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

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
            {/*<ThemeProvider theme = {theme}>*/}
                <Box id="MainStoryWide" sx = {{ display: { xs: "none", sm: "flex" }, margin: "2%", height: "40vh", color: "black" }}>
                    <div style = {{ display: "flex", flexDirection: "column", width: "100%" }} >
                        <Box sx={{ backgroundColor: props.backgroundColour, height: "11%", marginBottom: "0.25%", border: "2px solid black", borderTopRightRadius: "1vw", borderTopLeftRadius: "1vw", overflow: "hidden"}}>
                            <Typography variant={"h6"}> {props.newsStories[0]?.title} </Typography>
                        </Box>

                        <Box sx={{ backgroundColor: props.backgroundColour, height: "75%", marginBottom: "0.25%", border: "2px solid black", overflow: "hidden"}}>
                            <Typography variant={"body"}> {props.newsStories[0]?.content} </Typography>
                        </Box>

                        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: props.backgroundColour, height: "10%", border: "2px solid black", borderBottomRightRadius: "1vw", borderBottomLeftRadius: "1vw"}} onClick={nav}>
                            <Typography variant={"body"}> Click Here For Full Story </Typography>
                        </Box>
                    </div>
                </Box>

                <Box id="MainStoryNarrow" sx = {{ display: { xs: "flex", sm: "none" }, flexDirection: "column", margin: "2%", height: "50vh", color: "black", backgroundColor: "#fff" }}>
                    <Box sx={{ backgroundColor: props.backgroundColour, height: "9%",  marginBottom: "0.25%", border: "2px solid black", borderTopRightRadius: "1vw", borderTopLeftRadius: "1vw", overflow: "hidden" }}>
                        <Typography variant={"h6"}> {props.newsStories[0]?.title} </Typography>
                    </Box>
                    
                    <Box sx={{ backgroundColor: props.backgroundColour, height: "77%",  marginBottom: "0.25%", border: "2px solid black", overflow: "hidden"}}>
                        <Typography variant={"body"}> {props.newsStories[0]?.content} </Typography>
                    </Box>

                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: props.backgroundColour, height: "8%", border: "2px solid black", borderBottomRightRadius: "1vw", borderBottomLeftRadius: "1vw"}} onClick={nav}>
                        <Typography variant={"body"}> Click Here For Full Story </Typography>
                    </Box>
                </Box>



                {minorStories.length !== 0 ? (
                    <Stack>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: props.backgroundColour, height: "10vh", margin: "2%", margintTop: "0%", border: "2px solid black", borderRadius: "3vw"}}>
                            <Typography variant={"h4"} > Other {props.pageName} Stories For You </Typography>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container columns= {12} rowSpacing={1} columnSpacing={2} margin="0px" width="100%">
                                {minorStories.map((story, index) => {
                                    return (
                                        <Grid item xs={12} sm={6} md={4} sx={{ padding: "0 !important" }}>
                                            <Box sx={{ backgroundColor: props.backgroundColour, margin: "2%" }} onClick={nav}>    
                                                <Box sx={{ backgroundColor: "white", margin: "2%", height: "25vh", border: "2px solid black"}}>
                                                    {story[index].image_url}
                                                </Box>
                                                <Box sx={{ margin: "2%", height: "25vh" }}>
                                                    <Typography variant={"h6"} > {story[index].content} </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Box>
                    </Stack>
                    ) : null
                }
            {/*</ThemeProvider>*/}
        </>
    )
}