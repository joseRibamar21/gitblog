import React ,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Container, Owner, Loading } from "./style";
import api from "../../services/api";

export default function Repositorio (){
    const params = useParams('/repositorio/:repositorio')
    const  repositorioNome  = params.repositorio

    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        async function load(){
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`repos/${repositorioNome}`),
                api.get(`repos/${repositorioNome}/issues`)
            ]);

            setRepositorio(repositorioData.data);
            setIssues(issuesData.data)
            setLoading(false);
        }

        load();
    },[]);

    if(loading){
        return (
            <Loading>
                <h1>
                    Carregando...
                </h1>
            </Loading>
        )
    }

    return(

       
        <Container>
            <Owner>
                <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login}/>
                <h1>
                    {repositorio.nome}
                </h1>
                <p>
                    {repositorio.description}
                </p>
            </Owner>
        </Container>
    )
}