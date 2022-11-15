import { Box, Flex, GridItem, Icon, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { FiCheckCircle, FiUsers, FiUserX, FiX } from 'react-icons/fi'
import Card from 'components/_card'

const Statistics = () => {
	return (
		<GridItem colSpan={8}>
			<Card p={6}>
				<Stack spacing={6}>
					<Stack justify="space-between" align="center" direction="row">
						<Text fontWeight="medium" color="accent-1">
							Statistics
						</Text>

						<Text fontSize="sm">Today</Text>
					</Stack>

					<SimpleGrid columns={4}>
						<Stack align="center" direction="row" spacing={3}>
							<Flex bg="brand.default" justify="center" align="center" h={12} w={12} borderRadius="full">
								<Icon as={FiUsers} boxSize={6} color="white" />
							</Flex>

							<Box>
								<Text fontSize="2xl" fontWeight="bold" color="accent-1">
									25
								</Text>

								<Text mt="-4px" fontSize="xs" color="muted">
									Employees
								</Text>
							</Box>
						</Stack>

						<Stack align="center" direction="row" spacing={3}>
							<Flex bg="brand.default" justify="center" align="center" h={12} w={12} borderRadius="full">
								<Icon as={FiCheckCircle} boxSize={6} color="white" />
							</Flex>

							<Box>
								<Text fontSize="2xl" fontWeight="bold" color="accent-1">
									20
								</Text>

								<Text mt="-4px" fontSize="xs" color="muted">
									On Time Today
								</Text>
							</Box>
						</Stack>

						<Stack align="center" direction="row" spacing={3}>
							<Flex bg="brand.default" justify="center" align="center" h={12} w={12} borderRadius="full">
								<Icon as={FiX} boxSize={6} color="white" />
							</Flex>

							<Box>
								<Text fontSize="2xl" fontWeight="bold" color="accent-1">
									8
								</Text>

								<Text mt="-4px" fontSize="xs" color="muted">
									Late Today
								</Text>
							</Box>
						</Stack>

						<Stack align="center" direction="row" spacing={3}>
							<Flex bg="brand.default" justify="center" align="center" h={12} w={12} borderRadius="full">
								<Icon as={FiUserX} boxSize={6} color="white" />
							</Flex>

							<Box>
								<Text fontSize="2xl" fontWeight="bold" color="accent-1">
									5
								</Text>

								<Text mt="-4px" fontSize="xs" color="muted">
									Absent Today
								</Text>
							</Box>
						</Stack>
					</SimpleGrid>
				</Stack>
			</Card>
		</GridItem>
	)
}

export default Statistics
