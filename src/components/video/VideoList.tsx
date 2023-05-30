import type { QueryDocumentSnapshot } from "firebase/firestore";
import React, { useCallback } from "react";
import { FlatList, ListRenderItem, StyleProp, ViewStyle } from "react-native";

import type { FirestoreVideo } from "../../lib/firestore";
import { Spacer } from "../core";
import { MailboxTile } from "./MailboxTile";
import { MailboxTileLoading } from "./MailboxTileLoading";

export interface VideoListProps {
  columns: number;
  error?: string;
  loadingTiles?: number;
  onEndReached?: () => void | Promise<void>;
  onErrorDismiss?: () => void | Promise<void>;
  style?: StyleProp<ViewStyle>;
  videos: QueryDocumentSnapshot<FirestoreVideo>[];
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
      <Spacer flex={1 / columns} spacing={2}>
        {item === "loading" ? (
          <MailboxTileLoading />
        ) : (
          <MailboxTile videoId={item.id} videoData={item.data()} />
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
        style={style}
      />
    </Spacer>
  );
}
