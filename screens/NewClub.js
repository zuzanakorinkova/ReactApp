import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createClub} from '../store/actions/ClubActions';
import Input from '../components/common/Input';
import { View, Text, Button, StyleSheet, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Constant from 'expo-constants';


const NewClub = props => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [clubName, setClubName] = useState('')
    const [clubNameValid, setClubNameValid] = useState(false)

    const [image, setImage] = useState(null)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
    

    const handleSave = () => {
        dispatch(createClub(clubName, image))
        navigation.navigate("Chat")
    }

    return (
        <View>
            <Text>Create New club</Text>
            <View>
            <Button title="Choose Image" onPress={pickImage} />
              {image && <Image source={{uri:image}} style={styles.pickImage} />}
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