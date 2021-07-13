import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { memo, useState, VFC, ChangeEvent } from "react";
import { useAuth } from "../../hooks/useAuth";

import { PrimaryButton } from "../atoms/Button/PrimaryButton";

export const Login: VFC = memo(() => {
  const [userId, setUserId] = useState<string>("");

  const { login, loading } = useAuth();

  // ChangeEvent<HTMLInputElement>・・・textボックスの型指定。丸覚え。
  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const onClickLogin = () => {
    login(userId);
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="#fff" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー管理アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="ユーザーID"
            value={userId}
            onChange={onChangeUserId}
          />
          <PrimaryButton
            disabled={userId === ""}
            loading={loading}
            onClick={onClickLogin}
          >
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
