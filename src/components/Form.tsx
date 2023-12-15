import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
  Stack,
  Text,
  Icon,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { PiUserSwitchFill } from "react-icons/pi";

interface FormData {
  name: string;
  phoneNumber: string;
  email: string;
  hobbies: string;
}

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>(); 

  const toast = useToast(); 

  const onSubmit = async (data: FormData) => {
    console.log('Form data submitted:', data);

    try {
      const response = await fetch('https://crud-lvlf.onrender.com/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          phoneNumber: data.phoneNumber,
          email: data.email,
          hobbies: data.hobbies,
        }),
      });

      console.log(response);

      if (response.ok) {
        toast({
          title: 'Data Submitted',
          description: 'Your data has been successfully submitted.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        reset(); 
      } else {
        toast({
          title: 'Error',
          description: 'Failed to submit data. Please try again.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const validateEmail = (value:string) => {
    if (!value.endsWith('gmail.com')) {
      return 'Email must be a Gmail address';
    }
    return true; 
  };

  return (
    <Box bg="black" p={4} h="100%" >
      <Flex p={45}>
        <Box w="30%" p={35} bg="#131313" borderRadius=" 35px 0  0 35px" sx={{
          '@media screen and (max-width: 600px)': {
           display:"none"
          },
        }}>
          <Box mt={200}>
            <Heading size="xl" ml={30} mb={2} color="white">
              <Icon
                as={PiUserSwitchFill}
                h={5}
                w={6}
                color="white"
                mr="8px"
                m={1}
              />
              User Data
            </Heading>
          </Box>
        </Box>
        <Flex direction="column" w="70%" p={4} bg="#242424" color="white" sx={{
            '@media screen and (max-width: 600px)': {
             width:"100%"
             },
        }}>
          <Stack spacing={4}>
            <Box    sx={{
                paddingLeft: "100px",
                '@media screen and (max-width: 600px)': {
                  paddingLeft: "0px", // Adjust this value as needed
                },
  }} >
              <Box p={4}  >
                <Heading color="white" pb={4}>
                  Craft your User Details
                </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl mb={4}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      {...register('name', { 
                        required: 'Name is required',
                        pattern: {
                          value: /^[A-Za-z\s]+$/, 
                          message: 'Name should not contain numeric characters',
                        }, 
                      })}
                    />
                    <span style={{ color: 'red' }}>{errors.name && errors.name.message}</span>
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      type="tel"
                      {...register('phoneNumber', {
                        required: 'Phone Number is required',
                        pattern: {
                          value: /^[0-9]{10}$/, 
                          message: 'Invalid phone number format',
                        },
                      })}
                    />
                    <span style={{ color: 'red' }}>
                      {errors.phoneNumber && errors.phoneNumber.message}
                    </span>
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      {...register('email', { required: 'Email is required',
                      validate: validateEmail, })}
                      
                    />
                    <span style={{ color: 'red' }}>{errors.email && errors.email.message}</span>
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Hobbies</FormLabel>
                    <Textarea {...register('hobbies' ,{
                        required: 'hobbies is required',
                      })} />
                    <span style={{ color: 'red' }}>{errors.hobbies && errors.hobbies.message}</span>
                  </FormControl>
                  <Button
                    type="submit"
                    bg="white"
                    mr={3}
                    onClick={handleGoBack}
                  >
                    Back
                  </Button>
                  <Button type="submit" colorScheme="teal">
                    Submit
                  </Button>
                </form>
              </Box>
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Form;
