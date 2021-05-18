import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, StyleSheet, FlatList, TextInput } from 'react-native';
import {createEvent} from '../store/actions/ClubActions';
import Input from '../components/common/Input';
import { NavigationContainer, useNavigation } from '@react-navigation/native';



const CreateEventScreen = props => {
    const navigatiion = useNavigation()
    const dispatch = useDispatch();
    const { id } = props.route.params
  
    const [title, setTitle] = useState('')
    const [titleValid, setTitleValid] = useState(false)

    const [description, setDescription] = useState('')
    const [descriptionValid, setDescriptionValid] = useState(false)
    
    const [date, setDate] = useState('')
    const [dateValid, setDateValid] = useState(false)
    const [fromTime, setFromTime] = useState('')
    const [fromTimeValid, setFromTimeValid] = useState(false)
    const [untilTime, setUntilTime] = useState('')
    const [untilTimeValid, setUntilTimeValid] = useState(false)

    const [location, setLocation] = useState('')
    const [locationValid, setLocationValid] = useState(false)

    const handleSave = () => {
        dispatch(createEvent(title, description, date, fromTime, untilTime, location, id))
        navigatiion.navigate('Home')
    }
    
    return (
        <View style={styles.container}>
          <View>
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
                    label="Event date"
                    error="Please fill out the event date"
                    text={date}
                    setContent={content => setDate(content)}
                    textValid={dateValid}
                    onValid={textValid => setDateValid(textValid)}
                        />
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
             <Button title="Save" onPress={handleSave} />
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
container: {
    padding: 20,
},

dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
}
});

export default CreateEventScreen;