import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Platform, Alert, Image, ScrollView } from 'react-native';
import {createEvent} from '../store/actions/ClubActions';
import Input from '../components/common/Input';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Constant from 'expo-constants';
import { registerRootComponent } from 'expo';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';



const CreateEventScreen = props => {
    const navigatiion = useNavigation()
    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    const [showStart, setShowStart] = useState(false);
    const [modeStart, setModeStart] = useState('date');
    const [showEnd, setShowEnd] = useState(false);
    const [modeEnd, setModeEnd] = useState('date');

    const onChangeStart = (selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStart(Platform.OS === 'ios');
        setStartDate(currentDate);
    };
    const onChangeEnd = (selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEnd(Platform.OS === 'ios');
        setEndDate(currentDate);
    };

    let displayStartDate = moment(startDate).format('MMM D YYYY');
    let displayStartTime = moment(startDate).format('LT')

    let displayEndDate = moment(endDate).format('MMM D YYYY');
    let displayEndTime = moment(endDate).format('LT')

    const showStartMode = (currentMode) => {
        setShowStart(true);
        setModeStart(currentMode);
    };
    const showEndMode = (currentMode) => {
        setShowEnd(true);
        setModeEnd(currentMode);
    };


    const showStartDatepicker = () => {
        showStartMode('date');
    };

    const showStartTimepicker = () => {
        showStartMode('time');
    };
    const showEndDatepicker = () => {
        showEndMode('date');
    };

    const showEndTimepicker = () => {
        showEndMode('time');
    };


    const { id } = props.route.params
  
    const [title, setTitle] = useState('')
    const [titleValid, setTitleValid] = useState(false)

    const [description, setDescription] = useState('')
    const [descriptionValid, setDescriptionValid] = useState(false)
    
    const [location, setLocation] = useState('')
    const [locationValid, setLocationValid] = useState(false)

    const [image, setImage] = useState(null)

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              console.log('Sorry, we need camera roll permissions to make this work!');
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

    if (!result.cancelled) {
      setImage(result.uri)
    }
  };

    const handleSave = () => {
        dispatch(createEvent(title, description, startDate, endDate, location, image, id))
        navigatiion.navigate('Home')
    }

    
    return (
        <View style={styles.container}>
            <ScrollView>
          
              <Button title="Choose Image" onPress={pickImage} />
              {image && <Image source={{uri:image}} style={styles.pickImage} />}
            <View style={styles.fields}>
            <Input
                label="Event title"
                error="Please fill out the event title"
                text={title}
                textValid={titleValid}
                onValid={textValid => setTitleValid(textValid)}
                setContent={content => setTitle(content)}
                    />
             <Input
                label="Event description"
                error="Please fill out the event description"
                text={description}
                setContent={content => setDescription(content)}
                textValid={descriptionValid}
                onValid={textValid => setDescriptionValid(textValid)}
                    />

              <View>
                <View style={styles.pickDate}>
                    <View>
                        <Button onPress={showStartDatepicker} title="Start date" />
                    </View>
                    <View>
                        <Button onPress={showStartTimepicker} title="Start time" />
                    </View>
                        {showStart && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={startDate}
                            mode={modeStart}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeStart}
                        />
                        )}
                </View>
            </View>
                <View style={styles.pickDate}>
                    <Text>{displayStartDate}</Text> 
                    <Text>{displayStartTime}</Text> 
                </View>
                <View>
                <View style={styles.pickDate}>
                    <View>
                        <Button onPress={showEndDatepicker} title="End date" />
                    </View>
                    <View>
                        <Button onPress={showEndTimepicker} title="End time" />
                    </View>
                        {showEnd && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={endDate}
                            mode={modeEnd}
                            is24Hour={true}
                            display="default"
                            onChange={onChangeEnd}
                        />
                        )}
                </View>
            </View>
                <View style={styles.pickDate}>
                    <Text>{displayEndDate}</Text> 
                    <Text>{displayEndTime}</Text> 
                </View>        

            <Input
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
},
pickDate: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 5,
}
    
});

export default CreateEventScreen;