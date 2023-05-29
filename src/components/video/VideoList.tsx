import type { QueryDocumentSnapshot } from "firebase/firestore";
import React, { useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import type { FirestoreVideo } from "../../lib/firestore";
import { Spacer } from "../core";
import { LoadingTile } from "./LoadingTile";
import { VideoTile } from "./VideoTile";

export interface VideoListProps {
  columns: number;
  error?: string;
  loadingTiles?: number;
  onEndReached?: () => void | Promise<void>;
  onErrorDismiss?: () => void | Promise<void>;
  style?: StyleProp<ViewStyle>;
  videos: QueryDocumentSnapshot<FirestoreVideo>[];
}

const styles = StyleSheet.create({
  itemSeparator: { height: 4 },
});

function ItemSeparator() {
  return <View style={styles.itemSeparator} />;
}

export function VideoList({
  columns,
  error,
  loadingTiles = 0,
  onEndReached,
  onErrorDismiss,
  style,
  videos,
}: VideoListProps) {
  // Add the number of specified loading tiles
  const data: ("loading" | QueryDocumentSnapshot<FirestoreVideo>)[] = [
    ...videos,
    ...Array(loadingTiles).fill("loading"),
  ];

  // Render either a video tile or a loading tile
  const renderItem: ListRenderItem<
    QueryDocumentSnapshot<FirestoreVideo> | "loading"
  > = useCallback(
    ({ item }) => (
      <Spacer flex={1 / columns} horizontalSpacing={2}>
        {item === "loading" ? (
          <LoadingTile />
        ) : (
          <VideoTile imageUri={item.data().thumbnailUrl} />
        )}
      </Spacer>
    ),
    [columns],
  );

  return (
    <Spacer flex={1}>
      <FlatList
        data={data}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        numColumns={columns}
        ItemSeparatorComponent={ItemSeparator}
        style={style}
      />
    </Spacer>
  );
}
