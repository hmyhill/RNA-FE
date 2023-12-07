import {
    Box,
    CardMedia,
    Container,
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
            <ThemeProvider theme = {theme}>
                <Box id="MainStoryWide" sx = {{ display: { xs: "none", sm: "flex" }, margin: "2%", height: "40vh", color: "black" }}>
                    <div style = {{ display: "flex", flexDirection: "column", width: "100%" }} >
                        <Box sx={{ backgroundColor: props.backgroundColour, height: "11%", marginBottom: "0.25%", border: "2px solid black", borderTopRightRadius: "1vw", borderTopLeftRadius: "1vw", overflow: "hidden"}}>
                            <Typography variant={"h6"}> {props.newsStories[0]?.title} </Typography>
                        </Box>

                        <div style = {{ display: "flex", height: "75%" }}>
                            <Box sx={{ backgroundColor: props.backgroundColour, width: "38%",  marginBottom: "0.25%", marginRight: "0.5%", border: "1px solid black"}}>
                                <CardMedia
                                    component="img"
                                    alt="Image Not Found"
                                    height="100%"
                                    image={props.newsStories[0]?.image_url}
                                />
                            </Box>
                            <Box sx={{ backgroundColor: props.backgroundColour, width: "62%", marginBottom: "0.25%", border: "2px solid black", overflow: "hidden"}}>
                                <Typography variant={"body"}> {props.newsStories[0]?.content} </Typography>
                            </Box>
                        </div>

                        

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

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: props.backgroundColour, height: "10vh", margin: "2%", margintTop: "0%", border: "1px solid black", borderRadius: "3vw"}}>
                    <Typography variant={"h4"} > Other {props.pageName} Stories For You </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columns= {12} rowSpacing={1} columnSpacing={2} margin="0px" width="100%">
                        {minorStories.map((story) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} sx={{ padding: "0 !important" }} style={{overflow: 'auto'}}>
                                    {/*added auto overflow for side scrolling*/}
                                    <Box sx={{ backgroundColor: props.backgroundColour, margin: "5%" }}>
                                        <MUIcard story={story} cardcolor={[props.backgroundColour]}/>
                                        {/*This is what is used for the cards at the buttom*/}
                                    </Box>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
                {/*Footer */}
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: props.backgroundColour, height: "10vh", margin: "0%", margintTop: "0%", border: "1px solid black", borderRadius: "0vw"}}>
                    <Container maxWidth="lg">
                        <Grid container direction="column" alignItems="center">
                            <Grid item xs={12}>
                                <Typography color="black" variant="h5">
                                    RNA NEWS
                                </Typography>
                            </Grid>
                        <Grid item xs={12}>
                        <Typography color="textSecondary" variant="subtitle1">
                            {`${new Date().getFullYear()} | Help | About Us | Contact Us`}
                        </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </ThemeProvider>
        </>
    )
}