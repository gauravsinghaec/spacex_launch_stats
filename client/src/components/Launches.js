import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardContent,
  CardActions,
	CircularProgress,
	Divider,
	Grid,
	List,
	ListItem,
	Typography,
} from '@material-ui/core';

const LaunchesQuery = gql`
  {
    launches {
      flight_number
      mission_name
      launch_year
      launch_success
    }
  }
`
const useStyles = makeStyles(theme => ({
  root: {
		flexShrink: 0,
	},
	main: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: '100%',
		height: '60vh',
		overflow: "auto",
    maxWidth: "50vw",
    backgroundColor: theme.palette.common.black,
	},
  list: {
		height: "100%",
		justifyContent: "flex-end",
		width: "100%",
  },
  inline: {
    display: 'inline',
	},
	indicator: {
		backgroundColor: ({ color }) => color,
		borderRadius: "50%",
		display: "inline-block",
		marginLeft: "20px",
		height: "10px",
		width: "10px",
  },
  card: {
    width: "100%",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));
function Indicator (props) {
	const classes = useStyles(props);
	return (
		<span className={classes.indicator} />
	);
}
export default function Launches () {
	const classes = useStyles();
	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="center"
			className={classes.root}
		>
			<Typography variant="h2">Launches</Typography>

			<div className={classes.main}>
				<Query
					query={LaunchesQuery}
				>
					{({ loading, error, data }) => {
						if (loading) {
							return (
								<CircularProgress className={classes.progress} color="primary" />
							)
						}
						if (error) {
							return <p>An Error Occeured :(</p>;
						}
						return (
							<List className={classes.list}>
								{data.launches.map(({ flight_number, mission_name, launch_year, launch_success }) => (
								<React.Fragment  key={flight_number}>
									<ListItem alignItems="flex-start">
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          {mission_name}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body1"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Year: {launch_year}
                        </Typography>
                        {launch_success ? (
                          <Indicator color="green" />
                        ) : (
                          <Indicator color="red" />
                        )}
                        <Typography variant="body2" component="p">
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">Learn More</Button>
                      </CardActions>
                    </Card>
									</ListItem>
									<Divider component="li" />
								</React.Fragment>
								))};
							</List>
						)
					}}
				</Query>
			</div>
		</Grid>
	);
}