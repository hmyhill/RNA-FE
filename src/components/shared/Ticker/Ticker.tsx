import { 
    Box, 
    Typography
} from "@mui/material";
import Marquee from "react-fast-marquee";

interface TickerProps {
    data: string[];
}

export default function TickerComponent(props: TickerProps){
    return (
        <Box sx = {{ backgroundColor: "#cccccc", color: "black", borderTop: "2px solid black", borderBottom: "2px solid black"}}>
            <Marquee autoFill={false} speed={70}>
                {props.data.map((story, index) => {
                    return (
                        <div style={{display: "flex", alignContent: "center"}} >
                            <Typography fontSize={"1.5rem"} marginLeft={"5vw"}> {props.data[index]} </Typography>
                        </div>
                    )
                })}
            </Marquee>
        </Box>
    )


}