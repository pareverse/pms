import NextHead from 'next/head'
import { Container, Grid } from '@chakra-ui/react'
import Welcome from 'components/dashboard/welcome'
import Statistics from 'components/dashboard/statistics'
import Attendance from 'components/dashboard/attendance'

const Dashboard = () => {
	return (
		<>
			<NextHead>
				<title>Dashboard</title>
			</NextHead>

			<Container>
				<Grid templateColumns="repeat(12, 1fr)" gap={6}>
					<Welcome />
					<Statistics />
					<Attendance />
				</Grid>
			</Container>
		</>
	)
}

Dashboard.authentication = {
	authorized: 'Admin'
}

export default Dashboard
