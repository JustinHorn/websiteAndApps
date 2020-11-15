import styles from "styles/Form.module.css";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

import Button from "@material-ui/core/Button";

import Link from "next/link";

const Form = () => {
  const cD = getCurrentDate();
  return (
    <main className={styles.page}>
      <img src="/hymt.PNG" alt="" className={styles.logo} />
      <section className="form">
        <h2>Where and when do you want to relocate?</h2>
        <div className={""}>
          <TextField variant="outlined" label="Enter Location"></TextField>
          <TextField
            variant="outlined"
            type="date"
            inputProps={{ min: cD }}
          ></TextField>
        </div>

        <h2>Which languages do you speak?</h2>
        <div className="">
          <Autocomplete
            multiple
            id="combo-box-demo"
            options={["Deutsch", "English", "Español"]}
            defaultValue={[]}
            style={{ width: 300 }}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Languages"
              ></TextField>
            )}
          />
        </div>
        <h2>Which services do you need?</h2>
        <div>
          <FormGroup row>
            <FormControlLabel
              value="Kindergarten"
              control={<Checkbox name="checkedD" color="primary" />}
              label="Kindergarten"
            />
            <FormControlLabel
              value="Job"
              control={<Checkbox name="checkedD" color="primary" />}
              label="Admission"
            />
            <FormControlLabel
              value="Apartment"
              control={<Checkbox name="checkedD" color="primary" />}
              label="Apartment"
            />

            <FormControlLabel
              value="Legal help"
              control={<Checkbox name="checkedD" color="primary" />}
              label="Legal help"
            />
          </FormGroup>
        </div>
      </section>
      <Link href="/suggestions">
        <Button variant="contained" color="primary">
          SUBMIT
        </Button>
      </Link>
    </main>
  );
};

const getCurrentDate = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  return today;
};

export default Form;
