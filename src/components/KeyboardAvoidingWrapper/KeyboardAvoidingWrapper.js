import React from 'react';
import { KeyboardAvoidingView, ScrollView, Platform, StyleSheet } from 'react-native';

export function KeyboardAvoidingWrapper  ({ children })  {
    console.log("KeyboardAvoidingWrapper rendered");
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
    >
      {children}
    </KeyboardAvoidingView>
  );
};
