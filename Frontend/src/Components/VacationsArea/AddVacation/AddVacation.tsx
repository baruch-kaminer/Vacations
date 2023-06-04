import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/vacation-model";
import notifyService from "../../../Services/NotifyService";
import vacationsServices from "../../../Services/vacationsServices";
import "./AddVacation.css"

function AddVacation(): JSX.Element{

    const { register, handleSubmit } = useForm<VacationModel>();
    const navigate = useNavigate();
  


    const [labelImage, setLabelImage] = useState<string>('Image');
    const onChangeImage = (e:any) => {
        setLabelImage(e.target.value)
    }


    const submit = async (data:VacationModel):Promise<void> => {
        try { 

            const formData = new FormData();
            formData.append('description', data.description)
            formData.append('destination', data.destination)
            formData.append('image', data.image[0])
            formData.append('startDate', data.startDate)
            formData.append('endDate', data.endDate)
            formData.append('price', data.price.toString())
            await vacationsServices.addVacation(formData);


            notifyService.success("The vacation has been added!");
            navigate("/");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }
    
    return(
        
        <div className="AddVacation">
                <h2>Add Vacation</h2>
                <Box
                    component="form"
                    sx={{
                    "& .MuiTextField-root": { m: 1, width: "35ch" }
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className="formVacation">

                    <TextField
                        type="text"
                        id="outlined-basic"
                        label="Destination"
                        variant="outlined"
                        {...register("destination")}
                    />
                    <TextField
                        type="textarea"
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        {...register("description")}
                    />
                    <TextField
                        type="date"
                        id="outlined-basic"
                        label="Start Date"
                        variant="outlined"
                        {...register("startDate")}
                    />
                    <TextField
                        type="date"
                        id="outlined-basic"
                        label="End Date"
                        variant="outlined"
                        {...register("endDate")}
                    /> 
                    <TextField
                        type="number"
                        id="outlined-basic"
                        label="Price"
                        variant="outlined"
                        {...register("price")}
                    />
                    <TextField
                        required
                        className="inputFile"
                        type="file"
                        id="outlined-basic"
                        label={labelImage}
                        variant="outlined"
                        onInput={onChangeImage}
                        {...register("image")}  
                    />
                    <Button onClick={handleSubmit(submit)} type="button" variant="contained" >
                        Send
                    </Button>
                    </div>
                </Box>
        </div>
    )
}

export default AddVacation


