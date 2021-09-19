import React from 'react';
import { Box, Button, Flex, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/client';

const HomePage: React.FC = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Flex flexDir="column" justify="center" align="center" h="100vh">
      <Text as="h1" fontSize="3xl">
        Welcome to your Next.js template!
      </Text>
      <Text>
        Bootstrapped with:
      </Text>
      <UnorderedList>
        <ListItem>Next.js</ListItem>
        <ListItem>Typescript</ListItem>
        <ListItem>Next-Auth</ListItem>
        <ListItem>Prisma</ListItem>
        <ListItem>Giraphql</ListItem>
        <ListItem>Chakra-ui</ListItem>
      </UnorderedList>
      <Box background="gray.100" p="2rem" borderRadius="0.5rem" mt="1rem" minW="250px">
        {!session && (
          <Flex flexDir="column" justify="center" align="center">
            <Text mb="0.5rem">Not signed in</Text>
            <Button isFullWidth colorScheme="blue" onClick={() => signIn()}>Sign in</Button>
          </Flex>
        )}
        {session && (
          <Flex flexDir="column" justify="center" align="center">
            <Text mb="0.5rem">Signed in as {session.user.name}</Text>
            <Button isFullWidth colorScheme="red" onClick={() => signOut()}>Sign out</Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default HomePage;
