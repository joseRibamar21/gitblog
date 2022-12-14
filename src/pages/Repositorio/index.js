import React ,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Container, Owner, Loading, BackButton, IssuesList, PageActions} from "./style";
import api from "../../services/api";
import {FaArrowLeft} from 'react-icons/fa'

export default function Repositorio (){
    const params = useParams('/repositorio/:repositorio')
    const  repositorioNome  = params.repositorio

    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    
    useEffect(()=>{
        async function load(){
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`repos/${repositorioNome}`),
                api.get(`repos/${repositorioNome}/issues`,{
                    params: {
                        page,
                        per_page: 5,
                    }
                })
            ]);

            setRepositorio(repositorioData.data);
            setIssues(issuesData.data)
            setLoading(false);
        }

        load();
    },[]);


    useEffect(()=>{
        async function loadIssue(){
            const response = await api.get(`/repos/${repositorioNome}/issues`,{
                params: {
                    page,
                    per_page: 5,
                }
            });

            setIssues(response.data);
        }
        loadIssue();
    },[page])


    function handlePage(action){
        setPage(action === 'back' ? page - 1 : page + 1)
    }

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
            <BackButton href="/">
                <FaArrowLeft color="#000" size={30}/>
            </BackButton>
            <Owner>
                <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login}/>
                <h1>
                    {repositorio.name}
                </h1>
                <p>
                    {repositorio.description}
                </p>
            </Owner>

            <IssuesList>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login}/>
                        <div>
                            <strong>
                                <a href={issue.html_url}>
                                    {issue.title}
                                </a>
                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>
                                        {label.name} 
                                    </span>
                                ))}
                            </strong>
                            <p>
                                {issue.user.login}
                            </p>
                        </div>
                    </li>
                ))}
            </IssuesList>
            
            <PageActions>
                <button type="button" onClick={()=>handlePage('back')} disabled={page<2}>
                    Voltar
                </button>
                <button type="button" onClick={()=>handlePage('next')}>
                    Proxima
                </button>
            </PageActions>
        </Container>
    )
}