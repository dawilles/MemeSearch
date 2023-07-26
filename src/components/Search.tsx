import React from "react";
import { Formik, Form, Field } from "formik";
import { FieldProps } from "formik";
import { TextField, Button, Box } from "@mui/material";
import { SearchProps } from "../utils/types";

const Search = ({ onSearch }: SearchProps) => {
	return (
		<Formik
			initialValues={{ query: "" }}
			onSubmit={(values, { resetForm }) => {
				onSearch(values.query);
				resetForm();
			}}>
			{({ isSubmitting }) => (
				<Form>
					<Box display='flex' justifyContent='center' marginBottom='20px'>
						<Field name='query'>
							{({ field }: FieldProps) => (
								<TextField
									{...field}
									variant='outlined'
									placeholder='Search memes...'
								/>
							)}
						</Field>
						<Button
							type='submit'
							variant='contained'
							color='primary'
							disabled={isSubmitting}
              sx={{ marginLeft: 1 }}>
							Search
						</Button>
					</Box>
				</Form>
			)}
		</Formik>
	);
};

export default Search;
