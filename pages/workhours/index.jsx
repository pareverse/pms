import { useState } from 'react'
import NextHead from 'next/head'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { useForm } from 'react-hook-form'
import { Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, Icon, IconButton, Input, Select, Td, Text, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { FiAlertTriangle, FiEdit2, FiTrash } from 'react-icons/fi'
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

	const mutation = useMutation((data) => api.create('/workhours', data), {
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
		setIsLoading(true)
		mutation.mutate(data)
	}

	return (
		<Modal
			title="Add Work Hours"
			toggle={(onOpen) => (
				<Button colorScheme="brand" onClick={() => clearErrors() || reset() || onOpen()}>
					Add New
				</Button>
			)}
			disclosure={disclosure}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex direction="column" gap={6}>
					<FormControl isInvalid={errors.timein}>
						<FormLabel>Timein</FormLabel>
						<Input type="time" size="lg" {...register('timein', { required: true })} />
						<FormErrorMessage>This field is required.</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.timeout}>
						<FormLabel>Timeout</FormLabel>
						<Input type="time" size="lg" {...register('timeout', { required: true })} />
						<FormErrorMessage>This field is required.</FormErrorMessage>
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

const UpdateModal = ({ workhour }) => {
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

	const mutation = useMutation((data) => api.update('/workhours', workhour._id, data), {
		onSuccess: () => {
			queryClient.invalidateQueries('workhours')
			setIsLoading(false)
			disclosure.onClose()

			toast({
				position: 'top',
				render: () => <Toast title="Success" description="Request success." />
			})
		}
	})

	const onSubmit = (data) => {
		setIsLoading(true)
		mutation.mutate(data)
	}

	return (
		<Modal title="Add Modal" toggle={(onOpen) => <IconButton variant="tinted" size="xs" colorScheme="brand" icon={<FiEdit2 size={12} />} onClick={() => clearErrors() || reset() || onOpen()} />} disclosure={disclosure}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex direction="column" gap={6}>
					<FormControl isInvalid={errors.timein}>
						<FormLabel>Timein</FormLabel>
						<Input type="time" defaultValue={workhour.timein} size="lg" {...register('timein', { required: true })} />
						<FormErrorMessage>This field is required.</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.timeout}>
						<FormLabel>Timeout</FormLabel>
						<Input type="time" defaultValue={workhour.timeout} size="lg" {...register('timeout', { required: true })} />
						<FormErrorMessage>This field is required.</FormErrorMessage>
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

const DeleteModal = ({ workhour }) => {
	const queryClient = useQueryClient()
	const disclosure = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast()

	const mutation = useMutation((data) => api.remove('/workhours', workhour._id, data), {
		onSuccess: () => {
			queryClient.invalidateQueries('workhours')
			setIsLoading(false)
			disclosure.onClose()

			toast({
				position: 'top',
				render: () => <Toast title="Success" description="Request success." />
			})
		}
	})

	const onSubmit = () => {
		setIsLoading(true)
		mutation.mutate({})
	}

	return (
		<Modal size="sm" header="off" toggle={(onOpen) => <IconButton variant="tinted" size="xs" colorScheme="red" icon={<FiTrash size={12} />} onClick={onOpen} />} disclosure={disclosure}>
			<Flex align="center" direction="column" gap={6} p={6}>
				<Flex bg="red.alpha" justify="center" align="center" borderRadius="full" h={24} w={24}>
					<Icon as={FiAlertTriangle} boxSize={8} color="red.default" />
				</Flex>

				<Flex align="center" direction="column" textAlign="center" gap={3}>
					<Text fontSize="xl" fontWeight="semibold" color="accent-1">
						Remove Work Hours
					</Text>

					<Text fontSize="sm">
						Are you sure you want to remove
						<br /> work hours permanently?
					</Text>
				</Flex>

				<Flex gap={3}>
					<Button size="lg" onClick={disclosure.onClose}>
						No, cancel
					</Button>

					<Button size="lg" colorScheme="red" isLoading={isLoading} onClick={onSubmit}>
						Yes, sure!
					</Button>
				</Flex>
			</Flex>
		</Modal>
	)
}

const Workhours = () => {
	const { data: workhours, isFetched: isWorkhoursFetched } = useQuery(['workhours'], () => api.all('/workhours'))

	return (
		<>
			<NextHead>
				<title>Work Hours</title>
			</NextHead>

			<Container>
				<Flex justify="space-between" align="center" gap={6} mb={6}>
					<Text fontSize="xl" fontWeight="semibold" color="accent-1">
						Work Hours
					</Text>

					<AddModal />
				</Flex>

				<Card>
					<Table
						data={workhours}
						fetched={isWorkhoursFetched}
						th={['Timein', 'Timeout']}
						td={(workhour) => (
							<Tr key={workhour._id}>
								<Td>
									<Text>{workhour.timein}</Text>
								</Td>

								<Td>
									<Text>{workhour.timeout}</Text>
								</Td>

								<Td>
									<Flex justify="end" align="center" gap={3}>
										<UpdateModal workhour={workhour} />
										<DeleteModal workhour={workhour} />
									</Flex>
								</Td>
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

Workhours.authentication = {
	authorized: 'Admin'
}

export default Workhours
