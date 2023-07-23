import React from "react";
import { Formik, Form, Field } from "formik";
import styles from "./Search.module.css"

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => { 

  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, { resetForm }) => {
        onSearch(values.query);
        resetForm();
      }}
    >
      {() => (
        <Form className={styles.search}>
          <Field
            type="text"
            name="query"
            placeholder="Search for memes..."
          />
          <input type="submit" value="Search" />
        </Form>
      )}
    </Formik>
  );
};

export default Search;
