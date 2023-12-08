import{
    Box,
    Container,
    Grid,
    Typography
} from "@mui/material"
import { 
    createTheme,
    ThemeProvider,
    responsiveFontSizes 
} from '@mui/material/styles';

interface FooterProps {
    backgroundColour: string;
}

export default function Footer(props: FooterProps){
    let theme = createTheme({
        typography: {
          fontFamily: [
            'DM Serif Display',
          ].join(','),
        },});
    theme = responsiveFontSizes(theme);

    return (
    <ThemeProvider theme={theme}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: props.backgroundColour, height: "10vh", margin: "0%", borderTop: "1px solid black"}}>
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
    )
}