import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const contacts = [
  {
    uid: 1,
    name: 'Hester Gregory',
    status: 'Just an extra ordinary teacher',
    imageUrl: 'https://randomuser.me/api/portraits/men/31.jpg',
  },
  {
    uid: 2,
    name: 'Manuel Moreno',
    status: 'I ❤️ To Code and Teach!',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    uid: 3,
    name: 'Blanche Williams',
    status: 'Making your GPay smooth',
    imageUrl: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
  {
    uid: 4,
    name: 'Randy Stewart',
    status: 'Building secure Digital banks',
    imageUrl: 'https://randomuser.me/api/portraits/men/40.jpg',
  },
];

const ContactList = () => (
    <View>
      <Text style={styles.headingText}>ContactList</Text>
      <ScrollView style={styles.container} scrollEnabled={false}>
        {contacts.map(({ uid, name, status, imageUrl }) => (
          <View key={uid} style={styles.userCard}>
            <Image source={{ uri: imageUrl }} style={styles.userImage} />
            <View>
              <Text style={styles.userName}>{name}</Text>
              <Text style={styles.userStatus}>{status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

export default ContactList;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  container: {
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  userCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    backgroundColor: '#8D3DAF',
    padding: 8,
    borderRadius: 10,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  userStatus: {
    fontSize: 12,
  },
});
