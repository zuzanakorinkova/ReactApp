import React,{useState} from 'react';
import { View, Text, Button, StyleSheet, ScrollView  } from 'react-native';
import Input from '../components/common/Input';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {createPost} from '../store/actions/ClubActions';

const CreatePostScreen = props => {
   const navigatiion = useNavigation()
   const dispatch = useDispatch()

   const { id } = props.route.params

   const [title, setTitle] = useState('')
   const [titleValid, setTitleValid] = useState(false)

   const [content, setContent] = useState('')
   const [contentValid, setContentValid] = useState(false)


const handleSave = () => {
   dispatch(createPost(title,content,id))
}

 return (
    <View style={styles.container}>
        <ScrollView>
        <Input
         label="Post title"
         error="Please fill out the post title"
         text={title}
         textValid={titleValid}
         onValid={textValid => setTitleValid(textValid)}
         setContent={content => setTitle(content)}
            />
         <Input
            style={styles.textField} //set height
            label="Post content"
            error="Please fill out the post content"
            text={content}
            textValid={contentValid}
            onValid={textValid => setContentValid(textValid)}
            setContent={content => setContent(content)}
            />
            <Button title="Create a post" onPress={handleSave}></Button>
        </ScrollView>
    </View>
 );
}

const styles = StyleSheet.create({
 container: {
    padding: 20,
 },
 textField: {
    height: 40,
    margin: 10,
 }
});

export default CreatePostScreen;