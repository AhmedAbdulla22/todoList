import {compareDesc, format } from 'date-fns';
import {v4 as uuid} from 'uuid';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; 

    const fetchWithAuth = async (url,options = {}) => {
            if(!options.headers) {
                options.headers = {};
            }
    
            options.credentials = 'include';
    
            let res = await fetch(url,options);
    
            if(res.status === 401) {
                //logout logic
                alert('Your session Ended!');
                // navigate('/auth',{replace: true})
                //TODO: see Add a Navigation heree
            }
            
            return res;
            

    }

    export const sortTodos = (todos) => {
        const sorted = [...todos];
        sorted.sort((a,b) => {
            const comparisonDiff = a.priority - b.priority;
            return (comparisonDiff !== 0) ? comparisonDiff : compareDesc(a.date,b.date);
        });

        return sorted;
    }
    //handle reading Tasks
    export const handleTodosRead = async (setAllTodos) => {
        try {
            const url = BACKEND_URL+'todos';
            const options = {
                        method:"GET",
                        credentials:'include',
                        headers:{
                            'Content-Type':'application/json',
                        }
                    }
            const res = await fetchWithAuth(url,options);

            if(res.ok) {
                const data = await res.json();
                setAllTodos(sortTodos(data));
            }
        } catch (error) {
            console.error(error)
        }    
    } 

    //handle updates
    export const handleTodoUpdate = async (id , updatedTodo,setAllTodos) => {
        
        try {
            const url = BACKEND_URL+'todos';
            const options = {
                        method:"PUT",
                        credentials:'include',
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body: JSON.stringify({
                            todoid:id,
                            description:updatedTodo.description ,
                            date: updatedTodo.date,
                            done:updatedTodo.done ,
                            priority: updatedTodo.priority
                        })
                    }
            const res = await fetchWithAuth(url,options);

            if(res.ok) {                

                setAllTodos(prevTodos => {
                    const updated = sortTodos(prevTodos.map(todo =>
                    todo.todoid === id ? updatedTodo:todo));
                        return updated;
                    });                    

                return true;
            }
        } catch (error) {
            console.error(error)
        }  
    }

    //handle removing
    export const handleTodoRemove = async (id,setAllTodos) => {
        try {
            const url = BACKEND_URL+'todos'+'/'+id;
            const options = {
                        method:"DELETE",
                        credentials:'include',
                        headers:{
                            'Content-Type':'application/json',
                        },
                    }
            const res = await fetchWithAuth(url,options);

            if(res.ok) {
                setAllTodos(prev => prev.filter(todo => todo.todoid !== id));

                return true;
            }
        } catch (error) {
            console.error(error)
        } 
    }
    //handle Adding New Todo
    export const addNewTodo = async (newTask,setNewTask,allTodos,setAllTodos) => {
        if(newTask.description.trim())
        {
            const now = format(new Date(),"yyyy-MM-dd"); 
            const todo = {
                "todoid": uuid(),
                "description":newTask.description,
                "date":(newTask.date === '') ? now : newTask.date,//here i return default one for today
                "done":false,
                "priority":newTask.priority
            }

            try {
                const url = BACKEND_URL+'todos';
                const options = {
                            method:"POST",
                            credentials:'include',
                            headers:{
                                'Content-Type':'application/json',
                            },
                            body: JSON.stringify({
                                todoid:todo.todoid,
                                description:todo.description ,
                                date: todo.date,
                                done:todo.done ,
                                priority: todo.priority
                            })
                        }
                const res = await fetchWithAuth(url,options);

                if(res.ok) {
                    setAllTodos(prev => {
                    const updated = sortTodos([...prev, todo]);
                        return updated;
                    });

                    return true;
                }

            } catch (error) {
                console.error(error)
            } finally {
                setNewTask({
                    description:'',
                    date:'',
                    priority:3,//3 by default is low
                });//refresh input
            }
        }
    }