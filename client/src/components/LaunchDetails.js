import React from 'react';
import { gql } from 'apollo-boost';
import { Link } from "react-router-dom";

import { Query } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import {
	CircularProgress,
	Divider,
	Grid,
	Typography,
} from '@material-ui/core';

const MissionInfo = gql`
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
}));

export default function LaunchDetails() {
  const classes = useStyles();
  return (
    <Grid
			container
			direction="column"
			justify="center"
			alignItems="center"
			className={classes.root}
		>
			<Typography variant="h2">Launch Details</Typography>

			<div className={classes.main}>
        <Link to="/" color="white">BACK</Link>
				<Query
					query={MissionInfo}
				>
					{({ loading, error, data }) => {
						if (loading) {
							return (
								<CircularProgress className={classes.progress} color="white" />
							)
						}
						if (error) {
							return <p>An Error Occeured :(</p>;
						}
            return (             
              <Divider component="li" />
						)
					}}
				</Query>
			</div>
		</Grid>
  )
};
