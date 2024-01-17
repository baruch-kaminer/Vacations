import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/vacation-model";
import notifyService from "../../../Services/NotifyService";
import vacationsServices from "../../../Services/vacationsServices";
import "./EditVacations.css";



function EditVacations(): JSX.Element {

    const { register, handleSubmit, setValue} = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();
    const [labelImage, setLabelImage] = useState<string>('Image');
  

    const formattedDate = (date: string):string => {
    const newDate = new Date(date);
    const yyyy = newDate.getFullYear();
    let mm:any = newDate.getMonth() + 1; 
    let dd:any = newDate.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedDate = yyyy + '-' + mm + '-' + dd;
    return formattedDate;
}
 

  useEffect(() => {
    const id = +params.id;
    vacationsServices.getOneVacations(id)
    .then(vacation => {
        vacation.imageName && setLabelImage(vacation.imageName)
        setValue('description', vacation.description);
        setValue('destination', vacation.destination);
        setValue('startDate', formattedDate(vacation.startDate));
        setValue('endDate', formattedDate(vacation.endDate));
        setValue('price', vacation.price);
        setValue('imageName', vacation.imageName);
        setValue('amountFollowers', vacation.amountFollowers);
        setValue('vacationId', vacation.vacationId);
        })
    },[params.id, setValue]);
  



  const submit = async (data:VacationModel):Promise<void> => {
      try {            
          const formData = new FormData();
        
          formData.append('vacationId', data.vacationId.toString())
          formData.append('amountFollowers', data.amountFollowers.toString())
          formData.append('description', data.description)
          formData.append('destination', data.destination)
          formData.append('imageName', data.imageName)
          data.image.length > 0 && formData.append('image', data.image[0])            
          formData.append('startDate', data.startDate)
          formData.append('endDate', data.endDate)
          formData.append('price', data.price.toString())
        
          await vacationsServices.updateVacation(formData, data.vacationId);
          notifyService.success("The vacation has been update!");
          navigate("/");
      }
      catch (err: any) {
          notifyService.error(err);
      }
  }

  const onChangeImage = (e:any) => {
    setLabelImage(e.target.value)
}
  
    return(
        <div className="EditVacations">
            <h2>Edit Vacation</h2>
            <Box
                    component="form"
                    sx={{
                    "& .MuiTextField-root": { m: 1, width: "35ch" }
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className="formVacation">
                    <input type="hidden" {...register("vacationId")}/>
                    <input type="hidden" {...register("imageName")}/>
                    <input type="hidden" {...register("amountFollowers")}/>
                    <TextField
                        autoFocus
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

export default EditVacations;
