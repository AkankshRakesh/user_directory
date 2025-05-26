"use client"

import { useState, useMemo } from "react"
import {
  Container,
  Title,
  TextInput,
  Select,
  Group,
  Stack,
  ActionIcon,
  Text,
  Badge,
  SimpleGrid,
  Skeleton,
  Alert,
  Paper,
  Flex,
  Button,
} from "@mantine/core"
import { Search, ArrowUpDown, ArrowUp, ArrowDown, AlertCircle } from "lucide-react"
import { useUsers } from "@/hooks/use-users"
import { UserCard } from "@/components/user-card"
import { UserTable } from "@/components/user-table"

type SortOrder = "asc" | "desc" | null
type ViewMode = "cards" | "table"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [companyFilter, setCompanyFilter] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("cards")

  const { data: users, error, isLoading } = useUsers()

  // companies for dropdown
  const companies = useMemo(() => {
    if (!users) return []
    const uniqueCompanies = [...new Set(users.map((user) => user.company.name))]
    return uniqueCompanies.sort()
  }, [users])

  // filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    if (!users) return []

    let filtered = users.filter((user) => {
      const matchesSearch =
        searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCompany = !companyFilter || user.company.name === companyFilter

      return matchesSearch && matchesCompany
    })

    if (sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        const comparison = a.name.localeCompare(b.name)
        return sortOrder === "asc" ? comparison : -comparison
      })
    }

    return filtered
  }, [users, searchQuery, companyFilter, sortOrder])

  const handleSortToggle = () => {
    setSortOrder((current) => {
      if (current === null) return "asc"
      if (current === "asc") return "desc"
      return null
    })
  }

  const getSortIcon = () => {
    if (sortOrder === "asc") return <ArrowUp size={16} />
    if (sortOrder === "desc") return <ArrowDown size={16} />
    return <ArrowUpDown size={16} />
  }

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Alert icon={<AlertCircle size={16} />} title="Error" color="red">
          Failed to load users. Please try again later.
        </Alert>
      </Container>
    )
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="xs">
            User Directory
          </Title>
          <Text c="dimmed">Browse and search through our user database with advanced filtering options.</Text>
        </div>

        <Paper p="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between" align="flex-end">
              <Group flex={1} align="flex-end">
                <TextInput
                  placeholder="Search by name or email..."
                  leftSection={<Search size={16} />}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.currentTarget.value)}
                  style={{ flex: 1, minWidth: 200 }}
                />

                <Select
                  placeholder="Filter by company"
                  data={companies}
                  value={companyFilter}
                  onChange={setCompanyFilter}
                  clearable
                  style={{ minWidth: 200 }}
                />

                <ActionIcon
                  variant="light"
                  size="lg"
                  onClick={handleSortToggle}
                  title={`Sort by name ${sortOrder === "asc" ? "descending" : sortOrder === "desc" ? "clear sort" : "ascending"}`}
                >
                  {getSortIcon()}
                </ActionIcon>
              </Group>

              <Group>
                <Button
                  variant={viewMode === "cards" ? "filled" : "light"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                >
                  Cards
                </Button>
                <Button
                  variant={viewMode === "table" ? "filled" : "light"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                >
                  Table
                </Button>
              </Group>
            </Group>

            <Flex gap="xs" align="center">
              <Text size="sm" c="dimmed">
                {isLoading ? "Loading..." : `${filteredAndSortedUsers.length} users found`}
              </Text>
              {searchQuery && (
                <Badge variant="light" size="sm">
                  Search: {searchQuery}
                </Badge>
              )}
              {companyFilter && (
                <Badge variant="light" size="sm">
                  Company: {companyFilter}
                </Badge>
              )}
              {sortOrder && (
                <Badge variant="light" size="sm">
                  Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
                </Badge>
              )}
            </Flex>
          </Stack>
        </Paper>

        {isLoading ? (
          <SkeletonLoader viewMode={viewMode} />
        ) : viewMode === "cards" ? (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
            {filteredAndSortedUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </SimpleGrid>
        ) : (
          <UserTable users={filteredAndSortedUsers} />
        )}

        {!isLoading && filteredAndSortedUsers.length === 0 && (
          <Paper p="xl" ta="center">
            <Text c="dimmed" size="lg">
              No users found matching your criteria.
            </Text>
            <Text c="dimmed" size="sm" mt="xs">
              Try adjusting your search or filter settings.
            </Text>
          </Paper>
        )}
      </Stack>
    </Container>
  )
}

function SkeletonLoader({ viewMode }: { viewMode: ViewMode }) {
  if (viewMode === "cards") {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {Array.from({ length: 6 }).map((_, index) => (
          <Paper key={index} p="md" withBorder>
            <Stack gap="sm">
              <Skeleton height={20} width="70%" />
              <Skeleton height={16} width="90%" />
              <Skeleton height={16} width="60%" />
              <Skeleton height={16} width="80%" />
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    )
  }

  return (
    <Paper withBorder>
      <Stack gap="xs" p="md">
        {Array.from({ length: 8 }).map((_, index) => (
          <Group key={index} justify="space-between">
            <Skeleton height={16} width="25%" />
            <Skeleton height={16} width="30%" />
            <Skeleton height={16} width="20%" />
            <Skeleton height={16} width="15%" />
          </Group>
        ))}
      </Stack>
    </Paper>
  )
}
