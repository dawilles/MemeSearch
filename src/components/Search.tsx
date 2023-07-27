import React from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { TextField, Button, Stack } from "@mui/material";

type SearchProps = {
	onSearch: (query: string) => void;
};

export const Search = ({ onSearch }: SearchProps) => {
	return (
		<Formik
			initialValues={{ query: "" }}
			onSubmit={(values, { resetForm }) => {
				onSearch(values.query);
				resetForm();
			}}>
			{({ isSubmitting }) => (
				<Form>
					<Stack direction='row'>
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
					</Stack>
				</Form>
			)}
		</Formik>
	);
};
