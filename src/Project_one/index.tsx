import { SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import {
  ActionCard,
  ContactList,
  ElevatedCards,
  FancyCard,
  FlatCards,
} from './components';

const Src = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <FlatCards />
        <ElevatedCards />
        <FancyCard />
        <ContactList />
        <ActionCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Src;
