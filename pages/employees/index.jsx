import NextHead from 'next/head'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { useForm } from 'react-hook-form'
import { Avatar, Badge, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, position, Select, Td, Text, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { FiEdit2 } from 'react-icons/fi'
import Table from 'components/_table'
import Card from 'components/_card'
import Modal from 'components/_modal'
import Toast from 'components/_toast'

const UpdateModal = ({ user }) => {
	const queryClient = useQueryClient()
	const disclosure = useDisclosure()
	const { data: positions, isFetched: isPositionsFetched } = useQuery(['positions'], () => api.all('/positions'))
	const { data: workhours, isFetched: isWorkhoursFetched } = useQuery(['workhours'], () => api.all('/workhours'))
	const toast = useToast()

	const {
		register,
		formState: { errors },
		clearErrors,
		reset,
		handleSubmit
	} = useForm()

	const mutation = useMutation((data) => api.update('/users', user._id, data), {
		onSuccess: () => {
			queryClient.invalidateQueries('users')
			disclosure.onClose()

			toast({
				position: 'top',
				render: () => <Toast title="Success" description="Request success." />
			})
		}
	})

	const onSubmit = (data) => {
		mutation.mutate({
			position: data.position.split(' ')[0],
			rate: data.position.split(' ')[1],
			workhours: {
				timein: data.workhours.split(' ')[0],
				timeout: data.workhours.split(' ')[1]
			}
		})
	}

	return (
		<Modal title="Add Modal" toggle={(onOpen) => <IconButton variant="tinted" size="xs" colorScheme="brand" icon={<FiEdit2 size={12} />} onClick={onOpen} />} disclosure={disclosure}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex direction="column" gap={6}>
					<FormControl isInvalid={errors.position}>
						<FormLabel>Position</FormLabel>

						<Select size="lg" {...register('position', { required: true })}>
							{isPositionsFetched &&
								positions.map((pos) => (
									<option key={pos._id} value={`${pos.title} ${pos.rate}`}>
										{pos.title}
									</option>
								))}
						</Select>

						<FormErrorMessage>This field is required.</FormErrorMessage>
					</FormControl>

					<FormControl>
						<FormLabel>Schedule</FormLabel>

						<Select size="lg" {...register('workhours', { required: true })}>
							{isWorkhoursFetched &&
								workhours.map((wh) => (
									<option key={wh._id} value={`${wh.timein} ${wh.timeout}`}>
										{wh.timein} - {wh.timeout}
									</option>
								))}
						</Select>
					</FormControl>

					<Flex align="center" gap={3}>
						<Button w="full" size="lg">
							Cancel
						</Button>

						<Button type="submit" w="full" size="lg" colorScheme="brand">
							Submit
						</Button>
					</Flex>
				</Flex>
			</form>
		</Modal>
	)
}

const Employees = () => {
	const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () => api.all('/users'))

	return (
		<>
			<NextHead>
				<title>Employees</title>
			</NextHead>

			<Container>
				<Flex justify="space-between" align="center" gap={6} mb={6}>
					<Text fontSize="xl" fontWeight="semibold" color="accent-1">
						Employees
					</Text>
				</Flex>

				<Card>
					<Table
						data={users}
						fetched={isUsersFetched}
						th={['Full Name', 'Position', 'Rate Per Hour', 'Work Hours', 'Role', '']}
						td={(user) => (
							<Tr key={user._id}>
								<Td maxW={200}>
									<Flex align="center" gap={3}>
										<Avatar name={user.name} src={user.image} />

										<Text overflow="hidden" textOverflow="ellipsis" color="accent-1">
											{user.name}
										</Text>
									</Flex>
								</Td>

								<Td>
									<Text>{user.position ? user.position : '-'}</Text>
								</Td>

								<Td>
									<Text>₱{user.rate ? user.rate : '-'}</Text>
								</Td>

								<Td>
									{user.workhours.timein} - {user.workhours.timeout}
								</Td>

								<Td>
									<Badge variant="tinted" colorScheme={user.role === 'Admin' ? 'yellow' : user.role === 'Employee' ? 'blue' : user.role === 'User' && 'red'}>
										{user.role}
									</Badge>
								</Td>

								<Td>
									<Flex justify="end" align="center" gap={3}>
										<UpdateModal user={user} />
									</Flex>
								</Td>
							</Tr>
						)}
						filters={(data) => {
							return data.filter((data) => data.role === 'Employee')
						}}
						settings={{
							search: 'off'
						}}
					/>
				</Card>
			</Container>
		</>
	)
}

Employees.authentication = {
	authorized: 'Admin'
}

export default Employees
