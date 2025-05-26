import { Table, Text, Anchor, ScrollArea, Paper } from "@mantine/core"
import type { User } from "@/hooks/use-users"

interface UserTableProps {
  users: User[]
}

export function UserTable({ users }: UserTableProps) {
  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <div>
          <Text fw={500} size="sm">
            {user.name}
          </Text>
          <Text size="xs" c="dimmed">
            @{user.username}
          </Text>
        </div>
      </Table.Td>
      <Table.Td>
        <Anchor href={`mailto:${user.email}`} size="sm" style={{ textDecoration: "none" }}>
          {user.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Anchor href={`tel:${user.phone}`} size="sm" style={{ textDecoration: "none" }}>
          {user.phone}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{user.company.name}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">
          {user.address.city}, {user.address.zipcode}
        </Text>
      </Table.Td>
      <Table.Td>
        <Anchor href={`https://${user.website}`} target="_blank" size="sm" style={{ textDecoration: "none" }}>
          {user.website}
        </Anchor>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Paper withBorder>
      <ScrollArea>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Company</Table.Th>
              <Table.Th>Location</Table.Th>
              <Table.Th>Website</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  )
}
