import {
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { format } from 'date-fns'

import type { NextPage } from 'next'

import { useAppSelector } from 'state/hooks'
import { selectUsers } from 'state/users/selectors'
import { wrapper } from 'state/store'
import { loadUsers } from 'state/users/actions'

import { Container } from 'components/Container'

const Home: NextPage = () => {
  const users = useAppSelector(selectUsers)

  const tableHeads = [
    {
      name: 'id',
      value: '#id',
    },
    {
      name: 'name',
      value: 'Name',
    },
    {
      name: 'email',
      value: 'Email',
    },
    {
      name: 'createdAt',
      value: 'Create date',
    },
    {
      name: 'updatedAt',
      value: 'Last updated date',
    },
  ]
  return (
    <Container as="main">
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            <Heading>This is users list</Heading>
          </TableCaption>
          <Thead>
            <Tr>
              {tableHeads.map(({ name, value }) => (
                <Th key={name}>{value}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {users?.map(({ id, name, email, createdAt, updatedAt }) => (
              <Tr key={id}>
                <Td isNumeric>{id}</Td>
                <Td>{name}</Td>
                <Td>{email}</Td>
                <Td>{format(new Date(createdAt), 'dd/MM/yyyy')}</Td>
                <Td>{format(new Date(updatedAt), 'dd/MM/yyyy')}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(loadUsers())
  return {
    props: {},
    revalidate: 900,
  }
})

export default Home
