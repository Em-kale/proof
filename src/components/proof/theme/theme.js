import { createTheme } from '@mui/material/styles';

const DefaultTheme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
      },
      secondary: {
        main: "#75b6ee",
      },
    },
    components: {
        MuiAppBar: {
            variant: [
                {
                    props: {variant: "footer"},
                    style: {bottom: 0, top: "auto"}
                }
            ]
        }
    }
  });

export default DefaultTheme