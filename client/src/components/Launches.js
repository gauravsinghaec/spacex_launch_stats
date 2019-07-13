import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import {
	CircularProgress,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@material-ui/core';

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
    backgroundColor: theme.palette.background.paper,
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
					query={gql`
						{
							launches {
								flight_number
								mission_name
								launch_year
								launch_success
							}
						}
					`}
				>
					{({ loading, error, data }) => {
						if (loading) {
							return (
								<CircularProgress className={classes.progress} color="primary" />
							)
						}
						if (error) {
							return <p>Error :(</p>;
						}
						return (
							<List className={classes.list}>
								{data.launches.map(({ flight_number, mission_name, launch_year, launch_success }) => (
								<React.Fragment  key={flight_number}>
									<ListItem alignItems="flex-start">
										<ListItemText
											primary={mission_name}
											secondary={
												<React.Fragment>
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
												</React.Fragment>
											}
										/>
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