import { ReactElement } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";

type IProps = {
  value: number;
  icon: ReactElement;
  onClick?: () => void;
  title: string;
};

export const JobCard = (props: IProps): JSX.Element => {
  const { value, icon, onClick, title } = props;

  return (
    <Card
      onClick={onClick}
      variant="outlined"
      sx={{ height: "100%", cursor: "pointer" }}
    >
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item flex={1}>
            <Typography variant="subtitle1" textTransform="uppercase">
              {title}
            </Typography>
            <Typography variant="h5">{value}</Typography>
          </Grid>
          <Grid item justifyContent="center" alignItems="center">
            {icon}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
