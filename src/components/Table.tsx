import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
  Box,
  Card,
  useToast
} from '@chakra-ui/react';

interface RowData {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  hobbies: string;
}



const TableList: React.FC= () => {
  const [data, setData] = useState<RowData[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [editMode, setEditMode] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();


  const initialFormData = {
    name: '',
    phoneNumber: '',
    email: '',
    hobbies: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://crud-lvlf.onrender.com/items');
        if (response.ok) {
          const result: RowData[] = await response.json();
          setData(result);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); 

  const handleCheckboxChange = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://crud-lvlf.onrender.com/items/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const newData = data.filter((row) => row._id !== id);
        setData(newData);
        setSelectedRows(selectedRows.filter((rowId) => rowId !== id));

        toast({
          title: 'Item Deleted',
          description: 'The item was deleted successfully.',
          status: 'success',
          duration: 2000, 
          isClosable: true,
        });
      } else {
        console.error('Failed to delete item');

        toast({
          title: 'Error',
          description: 'Failed to delete item. Please try again.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);

      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleUpdate = (id: string) => {
    setEditMode(id);
    onOpen();
    const selectedRow = data.find((row) => row._id === id);
    setFormData({
      name: selectedRow?.name || '',
      phoneNumber: selectedRow?.phoneNumber || '',
      email: selectedRow?.email || '',
      hobbies: selectedRow?.hobbies || '',
    });
  };

  const handleSave = async (id: string) => {
    try {
      const response = await fetch(`https://crud-lvlf.onrender.com/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          hobbies: formData.hobbies,
        }),
      });

      if (response.ok) {
        const newData = data.map((row) => (row._id === id ? { ...row, ...formData } : row));
        setData(newData);
        setEditMode(null);
        onClose();

        toast({
          title: 'Item Updated',
          description: 'The item was updated successfully.',
          status: 'success',
          duration: 5000, 
          isClosable: true,
        });
      } else {
        console.error('Failed to update item');

        toast({
          title: 'Error',
          description: 'Failed to update item. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);

      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const sendEmail = async () => {
    try {
      const response = await fetch('https://crud-lvlf.onrender.com/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedRows: data.filter((row) => selectedRows.includes(row._id)),
        }),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
          toast({
          title: 'Email Sent',
          description: 'The email was sent successfully.',
          status: 'success',
          duration: 2000, 
          isClosable: true,
        });
      } else {
        console.error('Failed to send email', responseData);
  
        toast({
          title: 'Error',
          description: 'Failed to send email. Please try again.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
  
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      height="100vh"
      bgGradient="linear(to-l, #7928CA, #FF0080)" 
      borderRadius="lg" 
      p={8} 
    >
      <Card
        width="100%" 
        p={5} 
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Check</Th>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Phone Number</Th>
              <Th>Email</Th>
              <Th>Hobbies</Th>
              <Th>Update/Delete</Th>
              <Th>Send a Mail 
              <Button
                    colorScheme="green"
                    size="sm"
                    ml={2}
                    onClick={() => sendEmail()}
                  >
                    Send
                  </Button>
              </Th>
             
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((row) => (
              <Tr key={row._id}>
                <Td>
                  <Checkbox
                    isChecked={selectedRows.includes(row._id)}
                    onChange={() => handleCheckboxChange(row._id)}
                  />
                </Td>
                <Td>{row._id}</Td>
                <Td>{row.name}</Td>
                <Td>{row.phoneNumber}</Td>
                <Td>{row.email}</Td>
                <Td>{row.hobbies}</Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleUpdate(row._id)}
                  >
                    Update
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    ml={2}
                    onClick={() => handleDelete(row._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>

      {/* Modal for editing */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Row</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              mb={4}
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              mb={4}
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
            <Input
              mb={4}
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Textarea
              mb={4}
              placeholder="Hobbies"
              value={formData.hobbies}
              onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleSave(editMode || '')}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TableList;
