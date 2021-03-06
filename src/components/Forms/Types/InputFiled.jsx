import React from 'react'
import { ErrorMessage, useField } from 'formik'
import { Input } from '@chakra-ui/react'

export default function InputFiled(props) {
    const [field, meta] = useField(props)
    return (
        <div style={{position:"relative"}}>
            <label htmlFor={field.name} style={{marginBottom:"3px"}}>{props.label}</label>
            <Input {...field} {...props} value={meta.value} isInvalid={meta.touched && meta.error} errorBorderColor='crimson'/>  
            <ErrorMessage name={field.name} component="div" style={{color:"#f00", textTransform:"capitalize", fontSize:"14px", paddingLeft:"7px", position:"absolute", bottom:"0px"}}/> 
        </div>
    )
}