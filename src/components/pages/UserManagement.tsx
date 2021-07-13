/* eslint-disable react-hooks/exhaustive-deps */
import { memo, VFC, useEffect, useCallback } from "react";
import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem
} from "@chakra-ui/react";

import { UserCard } from "../organisms/user/UserCard";
import { useAllUser } from "../../hooks/useAllUser";
import { UserDetailModal } from "../organisms/user/UserDetailModal";

export const UserManagement: VFC = memo(() => {
  const { getUsers, loading, users } = useAllUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickUser = useCallback(() => {
    onOpen();
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {loading ? (
        <Center height="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal isOpen={isOpen} onClose={onClose} />
    </>
  );
});
