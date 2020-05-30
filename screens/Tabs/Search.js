import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components";
import { gql } from "apollo-boost";
import SearchBar from "../../components/SearchBar";
import useInput from "../../hooks/useInput";
import { useQuery } from "react-apollo-hooks";

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        url
      }
      likeCount
      commentCount
    }
  }
`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  navigation.setOptions({
    headerTitle: () => (
      <SearchBar value={search.value} onChange={onChange} onSubmit={onSubmit} />
    ),
  });
  let searchVal = "";
  const search = useInput("");
  const [isFetch, setIsFetch] = useState(false);
  const { loading, data, refetch } = useQuery(SEARCH, {
    variables: {
      // term: search.value,
      term: searchVal,
    },
    skip: !isFetch,
  });
  const [refreshing, setRefreshing] = useState(false);

  const onChange = (text) => {
    search.onChange(text);
    setIsFetch(false);
  };
  const onSubmit = () => {
    searchVal = search.value;
    setIsFetch(true);
  };
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      searchVal = search.value;
      await refetch({ variables: { term: searchVal } });
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    ></ScrollView>
  );
};
