import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Tab, TabView } from "@rneui/themed";
import React, { ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Screen, Spacer, Text } from "../components";
import { SentVideos } from "../components/video/SentVideos";
import type { RootStackParamList } from "../layouts";

export type MailboxScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Mailbox"
>;

export enum MailboxTabs {
  Received,
  Sent,
  Favorites,
}

interface TabData {
  id: number;
  title: string;
  icon: string;
  content: ReactNode;
}

const TABS_DATA: TabData[] = [
  {
    id: MailboxTabs.Received,
    title: "Received",
    icon: "email-open-outline",
    content: <Text>Received</Text>,
  },
  {
    id: MailboxTabs.Sent,
    title: "Sent",
    icon: "email-send-outline",
    content: <SentVideos />,
  },
  {
    id: MailboxTabs.Favorites,
    title: "Favorites",
    icon: "heart-outline",
    content: <Text>Favorites</Text>,
  },
];

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    overflow: "hidden",
  },
  tabTitle: {
    fontSize: 12,
  },
});

export function MailboxScreen({
  route: {
    params: { tab = MailboxTabs.Received },
  },
}: MailboxScreenProps): JSX.Element {
  const [index, setIndex] = useState(tab.valueOf());

  return (
    <Screen>
      <View style={styles.tabContainer}>
        <Tab value={index} onChange={setIndex}>
          {TABS_DATA.map(({ id, title, icon }) => (
            <Tab.Item
              key={id}
              title={title}
              titleStyle={styles.tabTitle}
              icon={{ name: icon, type: "material-community" }}
            />
          ))}
        </Tab>

        <Spacer topSpacing={8} flex={1}>
          <TabView
            value={index}
            onChange={setIndex}
            animationType="timing"
            animationConfig={{ duration: 300, useNativeDriver: true }}
          >
            {TABS_DATA.map(({ id, content }) => (
              <TabView.Item key={id} style={styles.tabContainer}>
                {content}
              </TabView.Item>
            ))}
          </TabView>
        </Spacer>
      </View>
    </Screen>
  );
}
