import React, {useEffect, useState} from 'react'
import { FlatList, RefreshControl } from 'react-native'

import { useIsFocused } from '@react-navigation/native'

import {getTasks, deleteTask} from '../api'
import TaskItem from './TaskItem'

const TaskList = () => {

    const [tasks, setTasks] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const loadTasks = async ()=>{
        const {tasks} = await getTasks();
        setTasks(tasks);
    }

    useEffect(()=>{
        loadTasks()
    }, [useIsFocused()]);

    const handleDelete = async (id)=>{
        await deleteTask(id);
        await loadTasks();
    }

    const renderItem = ({item})=>{
        return (
            <TaskItem handleDelete={handleDelete} task={item}></TaskItem>
        )
    }

    const onRefresh = React.useCallback(async ()=>{
        setRefreshing(true);
        await loadTasks()
        setRefreshing(false);
    })

    return (
        <FlatList
        style={{width: '100%'}}
                data={tasks}
                keyExtractor={(item)=>item._id}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        colors = {['#10ac84']}
                        onRefresh={onRefresh}
                        progressBackgroundColor="#ffffff"
                    />
                }
            />
    )
}

export default TaskList
