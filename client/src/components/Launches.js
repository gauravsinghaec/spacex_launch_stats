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
  list: {
		width: '100%',
		height: '100vh',
		overflow: "auto",
    maxWidth: "50vw",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
	},
	progress: {
    margin: theme.spacing(2),
  },
}));

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
			<br />
			<List className={classes.list}>
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
							return <CircularProgress className={classes.progress} color="secondary" />
						}
						if (error) {
							return <p>Error :(</p>;
						}
						return data.launches.map(({ flight_number, mission_name, launch_year }) => (
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
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
							</React.Fragment>
						));
					}}
				</Query>
			</List>
		</Grid>
	);
}