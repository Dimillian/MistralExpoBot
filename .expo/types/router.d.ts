/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/history` | `/(tabs)/history/` | `/(tabs)/history/settings` | `/_sitemap` | `/about` | `/history` | `/history/` | `/history/settings`;
      DynamicRoutes: `/(tabs)/history/chat/${Router.SingleRoutePart<T>}` | `/history/chat/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(tabs)/history/chat/[id]` | `/history/chat/[id]`;
    }
  }
}
