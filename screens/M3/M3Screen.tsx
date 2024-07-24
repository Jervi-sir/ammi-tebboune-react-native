import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBarTop } from '@/components/StatusBarTop';
import axios from 'axios';
import { Api } from '@/utils/Api';
import { HtmlWrapper } from '@/components/HtmlWrapper';
import Accordion from '@/components/Accordion';

export const M3Screen = () => {
  const [socialMediaList, setSocialMediaList] = useState([]);
  const [wiki, setWiki] = useState([]);
  const [presidentName, setPresidentName] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const getData = async () => {
    try {
      const response = await axios.get(Api.base + Api.getProfile);
      setSocialMediaList(response.data.socials);
      setWiki(response.data.wiki);
      setProfilePic(response.data.profile_pic);
      setPresidentName(response.data.president_name);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <StatusBarTop />
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          {/* Profile */}
          <View style={{ alignItems: 'center', marginRight: 20 }}>
            <View style={{ backgroundColor: 'gray', width: 100, height: 100, borderRadius: 100, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
              <Image source={{ uri: profilePic }} style={{ height: 100, width: 100 }} />
            </View>
            <Text>{presidentName}</Text>
          </View>
          {/* Social Media */}
          <View>
            {socialMediaList.map((social, index) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }} key={index}>
                <Image source={{ uri: social.icon_url }} style={{ height: 30, width: 30, marginRight: 10 }} />
                <Text>{social.username}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={{ height: 2, backgroundColor: 'gray', width: '100%', marginVertical: 30 }}></View>
        
        <View style={{ paddingHorizontal: 20 }}>
          {wiki.map((tab, index) => (
            <View key={index}>
              {tab.title === null ? (
                <HtmlWrapper content={tab.content} />
              ) : (
                <Accordion title={tab.title}>
                  <HtmlWrapper content={tab.content} />
                </Accordion>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};
