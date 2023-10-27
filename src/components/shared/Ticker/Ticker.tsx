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
            <Marquee delay={1}>
                {props.data.map((story, index) => {
                    return (
                        <Typography fontSize={"1.5rem"}> {props.data[index]} </Typography>
                    )
                })}
            </Marquee>
            
                
        </Box>
    )


}