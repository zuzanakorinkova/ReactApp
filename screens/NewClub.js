import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createClub} from '../store/actions/ClubActions';
import Input from '../components/common/Input';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NewClub = props => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [clubName, setClubName] = useState('')
    const [clubNameValid, setClubNameValid] = useState(false)

    const handleSave = () => {
        dispatch(createClub(clubName))
        navigation.navigate("Chat")
    }

    return (
        <View>
            <Text>Create New club</Text>
            <View>
                <Input
                    label="Club name"
                    error="Please fill out the Clubname"
                    text={clubName}
                    textValid={clubNameValid}
                    onValid={textValid => setClubNameValid(textValid)}
                    setContent={content => setClubName(content)}
                />
                <Button title="Save" onPress={handleSave} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default NewClub;