import React from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import {
	TextField,
	Button,
	Stack,
	Typography,
	InputAdornment,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

type SearchProps = {
	onSearch: (query: string) => void;
};

export const Search = ({ onSearch }: SearchProps) => {
	return (
		<>
			<Typography
				variant='h1'
				component='h1'
				gutterBottom
				style={{
					textAlign: "center",
					border: "solid 4px",
				}}>
				GIPHY Meme Searcher
			</Typography>
			<Formik
				initialValues={{ query: "" }}
				onSubmit={(values, { resetForm }) => {
					onSearch(values.query);
					resetForm();
				}}>
				{({ isSubmitting }) => (
					<Form>
						<Stack direction='row' spacing={2}>
							<Field name='query'>
								{({ field }: FieldProps) => (
									<TextField
										{...field}
										variant='outlined'
										placeholder='Search memes...'
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<SearchIcon />
												</InputAdornment>
											),
										}}
									/>
								)}
							</Field>
							<Button
								color='inherit'
								type='submit'
								variant='contained'
								disabled={isSubmitting}>
								<Typography variant='h3'>Search</Typography>
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</>
	);
};
