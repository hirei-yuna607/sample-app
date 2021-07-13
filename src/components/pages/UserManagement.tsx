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
import { UserDetailModal } from "../organisms/user/UserDetailModal";

import { useAllUser } from "../../hooks/useAllUser";
import { useSelectUser } from "../../hooks/useSelectUser";
import { useLoginUser } from "../../hooks/useLoginUser";

export const UserManagement: VFC = memo(() => {
  const { getUsers, loading, users } = useAllUser();
  const { onSelectUser, selectUser } = useSelectUser();
  const { loginUser } = useLoginUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // console.log(selectUser);
  // console.log(loginUser);

  // useCallbackの第二引数(依存配列)に何も指定していないので、初期状態のonSelectUserが実行され、表示される
  // usersの情報が初期状態のまま
  // 第二引数(依存配列)にusersを指定することで、usersが変更されるたびにonSelectUserの引数を設定しなおす必要がある
  const onClickUser = useCallback(
    (id: number) => {
      console.log(id);
      onSelectUser({ id, users, onOpen });
    },
    [users, onSelectUser, onOpen]
  );

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
                id={user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal
        isOpen={isOpen}
        onClose={onClose}
        user={selectUser}
        isAdmin={loginUser?.isAdmin}
      />
    </>
  );
});
