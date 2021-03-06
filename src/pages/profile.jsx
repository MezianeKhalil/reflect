import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as yup  from 'yup'
import { Helmet } from "react-helmet"
import { AuthNavbar } from '../components/_index'
import { Box, Button, Flex, SimpleGrid, Text, Skeleton } from '@chakra-ui/react'
import InputFiled from '../components/Forms/Types/InputFiled'
import { useProfile } from './../hooks/useProfile'
import { UpdateProfileCall } from '../services/httpClient'
const updateSchemaValidation = yup.object({
    name:yup.string().min(6,'name to short').required('name is required')
})

export default function Profile() {
    const { user, mutate, isLoadingProfile } = useProfile()
    const [isLoading,setLoading] = useState(false)
    const handleFormSubmit = async(values, actions)=>{
        try{
            setLoading(true)
            await UpdateProfileCall(values)
            mutate()
            setLoading(false)
        }
        catch(error){
            setLoading(false)
        }
    }
    return (
        <>
            <Helmet>
                <title>Account | Reflect</title>
            </Helmet>
            <AuthNavbar/>
            <Box 
                border="2px" 
                borderStyle="solid" 
                borderColor="gray.200"
                rounded="md"
                mt="8"
                mx="auto"
                w={{base: 11/12, lg:10/12}}
            >
                <Box>
                    <Text 
                        color="gray.900" 
                        fontSize="2xl" 
                        p="5"
                        borderBottom="2px" 
                        borderStyle="solid" 
                        borderColor="gray.200"
                    >Personal info</Text>
                    <Box p="5">
                        <Text 
                            color="gray.700" 
                            fontSize="md"
                            mb="4" 
                        >
                            Your email
                        </Text>
                       <>
                            {
                             isLoadingProfile && !user && <Skeleton height='37px' width="300px" />
                            }
                            {
                                user && <Text color="gray.900" fontSize="xl">{ user?.data?.user?.email}</Text>
                            }
                       </>
                    </Box>
                    <hr/>
                    <SimpleGrid
                        columns={1}
                        p={5}
                        spacing={4}
                    >
                        {user &&
                            <Formik
                            initialValues={{ name: user?.data?.user?.name}}
                            validationSchema={updateSchemaValidation}
                            onSubmit={(values, actions)=>{
                                handleFormSubmit(values, actions)
                            }}
                        >
                            {
                                ()=>(
                                    <Form>
                                        <InputFiled 
                                            name="name"
                                            placeholder={"user name"}
                                            type="text"
                                            label="Name"
                                            mb="8"
                                            w="62"
                                            display="block"
                                        />
                                        <Flex gap="2" mt="3">
                                            <Button isLoading={isLoading} loadingText='Updating' colorScheme='green' type="submit">
                                                Update
                                            </Button>
                                            <Button colorScheme='green' variant={"outline"} type="reset">
                                                Reset
                                            </Button>
                                        </Flex>
                                    </Form>
                                )
                            }
                        </Formik>
                        }
                        
                    </SimpleGrid>
                </Box>
            </Box>
        </>
    )
}