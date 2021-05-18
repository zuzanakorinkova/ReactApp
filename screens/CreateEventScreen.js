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
    
    const [startDate, setStartDate] = useState('')
    const [startDateValid, setStartDateValid] = useState(false)
    const [endDate, setEndDate] = useState('')
    const [endDateValid, setEndDateValid] = useState(false)

    const [location, setLocation] = useState('')
    const [locationValid, setLocationValid] = useState(false)

    const handleSave = () => {
        dispatch(createEvent(title, description, startDate, endDate, location, id))
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
                    label="Event start date"
                    error="Please fill out the event start date"
                    text={startDate}
                    setContent={content => setStartDate(content)}
                    textValid={startDateValid}
                    onValid={textValid => setStartDateValid(textValid)}
                        />
                 <Input
                    style={styles.inputField}
                    label="Event end date"
                    error="Please fill out the event end date"
                    text={endDate}
                    setContent={content => setEndDate(content)}
                    textValid={endDateValid}
                    onValid={textValid => setEndDateValid(textValid)}
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
inputField: {
    marginTop: 10,
},
dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
}
});

export default CreateEventScreen;