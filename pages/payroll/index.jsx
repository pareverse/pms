import { useState } from 'react'
import NextHead from 'next/head'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { useForm } from 'react-hook-form'
import { Button, Container, Flex, FormControl, FormLabel, IconButton, Input, Select, Td, Text, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { FiEdit2, FiTrash } from 'react-icons/fi'
import Table from 'components/_table'
import Card from 'components/_card'
import Modal from 'components/_modal'
import Toast from 'components/_toast'

const AddModal = () => {
	const queryClient = useQueryClient()
	const disclosure = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast()

	const {
		register,
		formState: { errors },
		clearErrors,
		reset,
		handleSubmit
	} = useForm()

	const mutation = useMutation((data) => api.create('/', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('')
			setIsLoading(false)
			disclosure.onClose()

			toast({
				position: 'top',
				render: () => <Toast title="Success" description="Request success." />
			})
		}
	})

	const onSubmit = (data) => {
		console.log(data)
	}

	return (
		<Modal
			title="Add Modal"
			toggle={(onOpen) => (
				<Button colorScheme="brand" onClick={onOpen}>
					Add New
				</Button>
			)}
			disclosure={disclosure}
		>
			<form>
				<Flex direction="column" gap={6}>
					<FormControl>
						<FormLabel>Input</FormLabel>
						<Input size="lg" />
					</FormControl>

					<Flex gap={3} mt={6}>
						<Button size="lg" w="full" onClick={disclosure.onClose}>
							Close
						</Button>

						<Button type="submit" size="lg" colorScheme="brand" w="full" isLoading={isLoading}>
							Submit
						</Button>
					</Flex>
				</Flex>
			</form>
		</Modal>
	)
}

const UpdateModal = () => {
	const disclosure = useDisclosure()

	return <Modal title="Add Modal" toggle={(onOpen) => <IconButton variant="tinted" size="xs" colorScheme="brand" icon={<FiEdit2 size={12} />} onClick={onOpen} />} disclosure={disclosure}></Modal>
}

const DeleteModal = () => {
	const disclosure = useDisclosure()

	return <Modal title="Add Modal" toggle={(onOpen) => <IconButton variant="tinted" size="xs" colorScheme="red" icon={<FiTrash size={12} />} onClick={onOpen} />} disclosure={disclosure}></Modal>
}

const Payroll = () => {
	const { data, isFetched } = useQuery([''], () => api.all('/'), { enabled: false })

	return (
		<>
			<NextHead>
				<title>Payroll</title>
			</NextHead>

			<Container>
				<Flex justify="space-between" align="center" gap={6} mb={6}>
					<Text fontSize="xl" fontWeight="semibold" color="accent-1">
						Payroll
					</Text>

					<AddModal />
				</Flex>

				<Card>
					<Table
						data={[]}
						fetched={true}
						th={[]}
						td={(data) => (
							<Tr key={data._id}>
								<Td></Td>
							</Tr>
						)}
						select={(register) => (
							<Flex flex={1} justify="end" align="center" gap={3}>
								<Select size="lg" w="auto">
									<option></option>
								</Select>
							</Flex>
						)}
					/>
				</Card>
			</Container>
		</>
	)
}

Payroll.authentication = {
	authorized: 'Admin'
}

export default Payroll
