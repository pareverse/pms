import { Flex, GridItem, IconButton, Td, Text, Tr } from '@chakra-ui/react'
import Card from 'components/_card'
import Table from 'components/_table'
import { FiLink } from 'react-icons/fi'

const Attendance = () => {
	return (
		<GridItem colSpan={12}>
			<Card>
				<Flex justify="space-between" align="center" gap={6} mb={6}>
					<Text fontSize="xl" fontWeight="semibold" color="accent-1">
						Attendance
					</Text>

					<IconButton icon={<FiLink size={16} />} />
				</Flex>

				<Table
					data={[]}
					fetched={true}
					th={[]}
					td={(data) => (
						<Tr key={data._id}>
							<Td></Td>
						</Tr>
					)}
					settings={{
						search: 'off',
						show: [5]
					}}
				/>
			</Card>
		</GridItem>
	)
}

export default Attendance
