import React, { useState } from "react";
import { Button, Paper, TextField} from "@mui/material";
import { Controller, useForm} from "react-hook-form";

const defaultValues = {
    textValue: "",
    checkboxValue: [],
};

export const FormInputText = ({ name, control, label }) => {
    return (
        <Controller control={control} name={name}
            render={({ 
                field: { onChange, value } 
                }) => (
                    <TextField onChange={onChange} value={value || ""} label={label} />
                )}
        />
    );
};

export const AddPosts = () => {
    //const [textValue, setTextValue] = useState("");

    const { handleSubmit, reset, control } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <form>
            <FormInputText name={"textInput"} control={control} label={"Text Input"}/>
            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            <Button onClick={() => reset()} variant={"outlined"}>Reset</Button>
        </form>
    );
}