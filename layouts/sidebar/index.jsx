import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, Button, chakra, Flex, Icon, IconButton, Link, Text } from '@chakra-ui/react'
import { FiBriefcase, FiCalendar, FiClock, FiFileMinus, FiFileText, FiLogOut, FiPieChart, FiStar, FiUsers } from 'react-icons/fi'
import Logo from 'components/_logos'

const Sidebar = ({ isSidebarOpen, onSidebarClose }) => {
	const router = useRouter()
	const { data: session } = useSession()

	const links = {
		admin: [
			{ pathname: 'dashboard', icon: FiPieChart },
			{ pathname: 'attendance', icon: FiCalendar },
			{ pathname: 'employees', icon: FiUsers },
			{ pathname: 'positions', icon: FiBriefcase },
			{ pathname: 'workhours', icon: FiClock },
			{ pathname: 'deductions', icon: FiFileText },
			{ pathname: 'payroll', icon: FiFileMinus },
			{ pathname: 'accounts', icon: FiStar }
		],
		user: [
			{ name: 'my profile', pathname: 'profile' },
			{ name: 'settings', pathname: 'settings' }
		],
		default: [
			{ name: 'home', pathname: '' },
			{ name: 'blogs', pathname: 'blogs' },
			{ name: 'services', pathname: 'services' },
			{ name: 'company', pathname: 'company' },
			{ name: 'call us', pathname: 'contact' }
		]
	}

	return (
		<>
			<chakra.div bg="hsla(0, 0%, 0%, 0.4)" position="fixed" top={0} left={0} h="100vh" w="full" visibility={isSidebarOpen ? 'visible' : 'hidden'} opacity={isSidebarOpen ? 1 : 0} transition="0.4s ease-in-out" zIndex={99} onClick={onSidebarClose} />

			<chakra.aside bg="white" position="fixed" top={0} left={isSidebarOpen ? 0 : -256} h="100vh" w={256} transition="0.4s ease-in-out" zIndex={100} _dark={{ bg: 'surface' }}>
				<Flex justify="space-between" align="center" px={6} py={3} h={20}>
					<Logo size={8} />
				</Flex>

				{session && session.user.role === 'Admin' && (
					<Flex direction="column" p={3} h="calc(100vh - 160px)">
						{links.admin.map((data, index) => (
							<NextLink href={`/${data.pathname}`} passHref key={index}>
								<Flex bg={router.pathname.includes(data.pathname) ? 'canvas-1' : 'transparent'} justify="space-between" align="center" gap={6} borderRadius={12} px={3} h="48px" color={router.pathname.includes(data.pathname) ? 'accent-1' : 'accent-3'} transition=".4s" _hover={{ color: 'accent-1' }} onClick={onSidebarClose}>
									<Flex align="center" gap={3}>
										<Icon as={data.icon} boxSize={4} />

										<Text fontSize="sm" fontWeight="medium" textTransform="capitalize">
											{data.pathname}
										</Text>
									</Flex>
								</Flex>
							</NextLink>
						))}
					</Flex>
				)}

				{(!session || (session && session.user.role !== 'Admin')) && (
					<Flex direction="column" gap={6} p={6} h={session ? 'calc(100vh - 160px)' : 'calc(100vh - 172px)'}>
						{session && session.user.role === 'Tenant' ? (
							<>
								{links.user.map((link, index) => (
									<NextLink href={`/${link.pathname}`} passHref key={index}>
										<Link as="span" display="block" active={router.pathname.includes(link.pathname) ? 1 : 0}>
											{link.name}
										</Link>
									</NextLink>
								))}
							</>
						) : (
							<>
								{links.default.map((link, index) => (
									<NextLink href={`/${link.pathname}`} passHref key={index}>
										<Link as="span" display="block" active={router.pathname.includes(link.pathname) ? 1 : 0}>
											{link.name}
										</Link>
									</NextLink>
								))}
							</>
						)}
					</Flex>
				)}

				<Flex p={6}>
					{session ? (
						<Flex flex={1} gap={3}>
							<Flex align="center" gap={3}>
								<Avatar name={session.user.name} src={session.user.image} />

								<Text fontSize="sm" fontWeight="medium" color="accent-1" noOfLines={1}>
									{session.user.name}
								</Text>
							</Flex>

							<IconButton variant="ghost" size="xs" color="accent-1" icon={<FiLogOut size={16} />} onClick={() => signOut()} />
						</Flex>
					) : (
						<Button size="lg" colorScheme="brand" w="full" onClick={() => signIn('google')}>
							Sign in
						</Button>
					)}
				</Flex>
			</chakra.aside>
		</>
	)
}

export default Sidebar
