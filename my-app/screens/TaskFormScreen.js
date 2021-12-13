import React, {useState, useEffect} from 'react'
import { Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

import Layout from '../components/Layout'
import { saveTask, getTask, updateTask } from '../api';

const TaskFormScreen = ({navigation, route}) => {

    const [task, setTask] = useState({
        title: '',
        description: ''
    });

    const [editing, setEditing] = useState(false)

    const handleChange = (name, value) => setTask({...task, [name]: value})

    const handleSubmit = async () => {
        if(!editing){
            await saveTask(task);
        }else{
            await updateTask(route.params.id, task)
        }
        
        navigation.navigate('HomeScreen')
    }

    useEffect(()=>{
        if(route.params && route.params.id){
            navigation.setOptions({headerTitle: 'Updating a Task'});

            setEditing(true);

            (async ()=> {
                const {task} = await getTask(route.params.id);
                setTask({title: task.title, description: task.description})
            })();    
        }        
    }, [])

    return (
        <Layout>
            <TextInput
                style={styles.input}
                placeholder='Write a Title'
                placeholderTextColor='#546574'
                value={task.title}
                onChangeText={(text)=> handleChange('title', text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Write a Description'
                placeholderTextColor='#546574'
                value={task.description}
                onChangeText={(text)=> handleChange('description', text)}
            />
            {
                !editing ? (
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.buttonSave}
                    >
                        <Text style={styles.buttonText}>Save Task</Text>
                    </TouchableOpacity>
                ): (
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.buttonUpdate}
                    >
                        <Text style={styles.buttonText}>Update Task</Text>
                    </TouchableOpacity>
                )
            }
            
        </Layout>
    )
};

const styles = StyleSheet.create({
    input: {
        width: '90%',
        fontSize: 19,
        marginBottom: 7,
        borderWidth: 1,
        borderColor: '#10ac84',
        height: 50,
        color: '#FFFFFF',
        padding: 10,
        textAlign: 'center',
        borderRadius: 5
    },
    buttonSave: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#10ac84',
        width: '90%',
    },
    buttonUpdate: {
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#e58e26',
        width: '90%',
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 19,
    }
})

export default TaskFormScreen
