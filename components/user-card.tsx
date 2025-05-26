import { Card, Text, Group, Stack, Badge, Anchor } from "@mantine/core"
import { Mail, Phone, Globe, MapPin } from "lucide-react"
import type { User } from "@/hooks/use-users"

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Stack gap="sm">
        <Group justify="space-between" align="flex-start">
          <div>
            <Text fw={600} size="lg" lineClamp={1}>
              {user.name}
            </Text>
            <Text size="sm" c="dimmed">
              @{user.username}
            </Text>
          </div>
          <Badge variant="light" size="sm">
            ID: {user.id}
          </Badge>
        </Group>

        <Stack gap="xs">
          <Group gap="xs" wrap="nowrap">
            <Mail size={16} />
            <Anchor href={`mailto:${user.email}`} size="sm" style={{ textDecoration: "none" }} lineClamp={1}>
              {user.email}
            </Anchor>
          </Group>

          <Group gap="xs" wrap="nowrap">
            <Phone size={16} />
            <Anchor href={`tel:${user.phone}`} size="sm" style={{ textDecoration: "none" }} lineClamp={1}>
              {user.phone}
            </Anchor>
          </Group>

          <Group gap="xs" wrap="nowrap">
            <Globe size={16} />
            <Anchor
              href={`https://${user.website}`}
              target="_blank"
              size="sm"
              style={{ textDecoration: "none" }}
              lineClamp={1}
            >
              {user.website}
            </Anchor>
          </Group>

          <Group gap="xs" wrap="nowrap">
            <MapPin size={16} />
            <Text size="sm" lineClamp={1}>
              {user.address.city}, {user.address.zipcode}
            </Text>
          </Group>
        </Stack>

        <div>
          <Text size="sm" fw={500} mb="xs">
            Company
          </Text>
          <Text size="sm" lineClamp={1}>
            {user.company.name}
          </Text>
          <Text size="xs" c="dimmed" lineClamp={2}>
            {user.company.catchPhrase}
          </Text>
        </div>
      </Stack>
    </Card>
  )
}
