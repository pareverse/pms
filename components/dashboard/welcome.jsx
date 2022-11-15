import { useSession } from 'next-auth/react'
import { Box, chakra, Flex, GridItem, Stack, Text } from '@chakra-ui/react'
import Card from 'components/_card'

const Welcome = () => {
	const { data: session } = useSession()

	return (
		<GridItem colSpan={4}>
			<Card p={6} h="full">
				<Stack direction="row" h="full">
					<Stack justify="center" spacing={1}>
						<Text fontSize="lg" fontWeight="semibold" color="accent-1" noOfLines={2}>
							Good Afternoon,
							<br /> <chakra.span color="brand.default">{session.user.name}!</chakra.span>
						</Text>

						<Text fontSize="sm">Here&apos;s what&apos;s happening today.</Text>
					</Stack>

					<Flex justify="end" align="center" flex={1} position="relative">
						<Text position="absolute" fontSize={64}>
							🎉
						</Text>

						<Box bg="brand.alpha" boxSize={24} borderRadius="full"></Box>
					</Flex>
				</Stack>
			</Card>
		</GridItem>
	)
}

export default Welcome
