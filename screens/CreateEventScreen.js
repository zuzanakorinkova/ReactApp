import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Platform, Alert, Image, ScrollView } from 'react-native';
import {createEvent} from '../store/actions/ClubActions';
import Input from '../components/common/Input';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Constant from 'expo-constants';
import { registerRootComponent } from 'expo';




const CreateEventScreen = props => {
    const navigatiion = useNavigation()
    const dispatch = useDispatch();
    const { id } = props.route.params
  
    const [title, setTitle] = useState('')
    const [titleValid, setTitleValid] = useState(false)

    const [description, setDescription] = useState('')
    const [descriptionValid, setDescriptionValid] = useState(false)
    
    const [startDate, setStartDate] = useState('')
    const [startDateValid, setStartDateValid] = useState(false)
    const [endDate, setEndDate] = useState('')
    const [endDateValid, setEndDateValid] = useState(false)
    const [fromTime, setFromTime] = useState('')
    const [fromTimeValid, setFromTimeValid] = useState(false)
    const [untilTime, setUntilTime] = useState('')
    const [untilTimeValid, setUntilTimeValid] = useState(false)

    const [location, setLocation] = useState('')
    const [locationValid, setLocationValid] = useState(false)

    const [image, setImage] = useState(null)

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

    const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri)
    }
  };


    const handleSave = () => {
        dispatch(createEvent(title, description, startDate, endDate, fromTime, untilTime, location, image, id))
        navigatiion.navigate('Home')
    }

    
    return (
        <View style={styles.container}>
            <ScrollView>
          
              <Button title="Choose Image" onPress={pickImage} />
              {image && <Image source={{uri:image}} style={styles.pickImage} />}
            <View style={styles.fields}>
            <Input
                style={styles.inputField}
                label="Event title"
                error="Please fill out the event title"
                text={title}
                textValid={titleValid}
                onValid={textValid => setTitleValid(textValid)}
                setContent={content => setTitle(content)}
                    />
             <Input
                style={styles.inputField}
                label="Event description"
                error="Please fill out the event description"
                text={description}
                setContent={content => setDescription(content)}
                textValid={descriptionValid}
                onValid={textValid => setDescriptionValid(textValid)}
                    />
            <View style={styles.dates}>
                <Input
                    style={styles.inputField}
                    label="Start date"
                    error="Please fill out the event date"
                    text={startDate}
                    setContent={content => setStartDate(content)}
                    textValid={startDateValid}
                    onValid={textValid => setStartDateValid(textValid)}
                        />
                 <Input
                    style={styles.inputField}
                    label="End date"
                    error="Please fill out the event date"
                    text={endDate}
                    setContent={content => setEndDate(content)}
                    textValid={endDateValid}
                    onValid={textValid => setEndDateValid(textValid)}
                        />
                </View>
                <View style={styles.dates}>
                    <Input
                        style={styles.inputField}
                        label="From"
                        error="Please fill out the event time"
                        text={fromTime}
                        setContent={content => setFromTime(content)}
                        textValid={fromTimeValid}
                        onValid={textValid => setFromTimeValid(textValid)}
                            />
                    <Input
                        style={styles.inputField}
                        label="To"
                        error="Please fill out the event time"
                        text={untilTime}
                        setContent={content => setUntilTime(content)}
                        textValid={untilTimeValid}
                        onValid={textValid => setUntilTimeValid(textValid)}
                            />
                </View>
            <Input
                    style={styles.inputField}
                    label="Event location"
                    error="Please fill out the event location"
                    text={location}
                    setContent={content => setLocation(content)}
                    textValid={locationValid}
                    onValid={textValid => setLocationValid(textValid)}
                        />
            </View>
             <Button title="Save" onPress={handleSave} />
          
          </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
container: {
    padding: 20,
},

dates: {
    flexDirection: 'row',
    justifyContent: 'space-around',
},
pickImage: {
    width: 200,
    height: 200,
},
fields: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
}
    
});

export default CreateEventScreen;