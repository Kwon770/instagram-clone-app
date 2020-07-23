import React from "react";
import { ScrollView } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import UserProfile from "../components/UserProfile";

const USER_DETAIL = gql`
  query seeUser($userName: String!) {
    seeUser(userName: $userName) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ route }) => {
  const { loading, data } = useQuery(USER_DETAIL, {
    variables: { userName: route.params.userName },
  });
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeUser && <UserProfile {...data.seeUser} />
      )}
    </ScrollView>
  );
};
