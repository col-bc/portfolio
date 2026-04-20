import { Box } from "@chakra-ui/react";

export default function SplitFlag({ width = 100, height = 100 }) {
    const style = `

  .flag-half {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  .flag-canada {
    background-image: url('/Canada.svg'); 
    clip-path: polygon(0 0, 100% 0, 100% 100%); 
  }

  .flag-us {
    background-image: url('/USA.svg'); 
    clip-path: polygon(0 0, 0 100%, 100% 100%); 
  }
  `;

    return (
        <Box
            w={width}
            h={height}
            overflow="hidden"
            position="relative"
            borderRadius="full"
            border="4px solid"
            borderColor="cyan.border">
            <style>{style}</style>
            <div className="flag-half flag-canada"></div>
            <div className="flag-half flag-us"></div>
        </Box>
    );
}
