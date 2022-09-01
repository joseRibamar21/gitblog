import React , {useState, useCallback} from "react"

import {FaGithub, FaPlus} from 'react-icons/fa'
import {Container, Form, SubmitButton} from './styles'

import api from '../../services/api'

export default function Main(){

    const [newRepo, setNewRepo] = useState('');
    const [respositorios, setRespositorios] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit= useCallback((e)=>{
        e.preventDefault();

        async function submit(){
            const response = await api.get(`repos/${newRepo}`);
            console.log(response)

            const data = {
                name: response.data.full_name,
            }

            setRespositorios([...respositorios,data]);
            setNewRepo('');
        }
        submit();
    },[newRepo, respositorios]);

    function handleInputChange(value){
        setNewRepo(value.target.value);
    }
    
    return(
        <Container>
            <h1>
                <FaGithub size={25}/>
                Meus repositorios
            </h1>

            <Form onSubmit={handleSubmit}>
                <input type="text" placeholder="Adicionar Repositorios" value={newRepo} onChange={handleInputChange}/>
                <SubmitButton>
                    <FaPlus color="#FFF" size={14}/>
                </SubmitButton>
            </Form>

            repositorios.map()
        </Container>
    )
}